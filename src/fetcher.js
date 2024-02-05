/**
 * fetcher.js
 * Copyright (c) 2024
 *
 * This file contains the Google Apps Script to fetch and upload the media
 * files from the latest available Stories of a Instagram user to your Google
 * Drive.
 *
 * @author Chris K.Y. Fung <github.com/chriskyfung>
 */

import {
  loadSettings,
  dest,
  igParams,
  isDebug,
  isSettingsLoaded,
} from './init';
import { insertNewLog, loadRecentLogs, isDownloaded } from './logger';
import { uploadToDrive } from './url_to_drive';
import { getFileDetails } from './utils';

/**
 * Compose the URL and the query string to the Instagram's API endpoint.
 * @param {String} igUserID The ID of the target Instagram user to fetch.
 * @return {string} The request URL.
 */
export function getQuery(igUserID) {
  return `https://i.instagram.com/api/v1/feed/reels_media/?reel_ids=${igUserID}`;
}

/**
 * Fetch data from the Instagram's API with a custom header.
 * @param {String} query The URL and the query string to the API endpoint.
 * @return {Object} The content of an HTTP response encoded as a string.
 */
export function getInstagramData(query) {
  const params = {
    headers: {
      accept: '*/*',
      'accept-language': `zh-HK,zh-TW;q=0.9,zh;q=0.8,en;q=0.7,en-HK;q=0.6,ja-JP;q=0.5,ja;q=0.4,en-US;q=0.3`,
      'cache-control': 'no-cache',
      cookie: igParams.COOKIE,
      dnt: 1,
      pragma: 'no-cache',
      'sec-ch--prefers-color-scheme': 'light',
      'sec-ch-ua':
        '"Not_A Brand";v="99", "Google Chrome";v="109", "Chromium";v="109"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'user-agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36`,
      'viewport-width': '960',
      'x-asbd-id': igParams.X_ASBD_ID,
      'x-csrftoken': igParams.X_CSRFTOKEN,
      'x-ig-app-id': igParams.X_IG_APP_ID,
      'x-ig-www-claim': igParams.X_IG_WWW_CLAIM,
      'x-requested-with': 'XMLHttpRequest',
    },
    referrer: 'https://www.instagram.com/',
    referrerPolicy: 'strict-origin-when-cross-origin',
    body: null,
    method: 'GET',
    mode: 'cors',
  };
  
  let response;
  try {
    response = UrlFetchApp.fetch(query, params)
  } catch (err) {
    console.warn(`HTTP headers: ${JSON.stringify(response?.getHeaders())}`);
    const errorMessage = `${err.message}`;
    if (errorMessage.indexOf("Address unavailable:") !== -1) {
      console.error(errorMessage);
      return;
    }
    throw new Error(errorMessage +  '(code: 0xf1)');
  }
  console.log(`status code: ${response.getResponseCode()}`);

  const contentText = response.getContentText();
  if (isDebug) {
    console.log(`HTTP headers: ${JSON.stringify(response?.getHeaders())}`);
    console.log(`HTTP content: ${contentText}`);
  }
  if (contentText.startsWith('<!DOCTYPE html>')) {
    const errorMessage = contentText.includes('not-logged-in')
      ? 'Unable to log into Instagram (code: 0xf3)'
      : 'Instagram API retured response in HTML not JSON (code: 0xf4)';
    console.warn(`HTTP content: ${contentText}`);
    throw new Error(errorMessage);
  }
  try {
    return JSON.parse(contentText);
  } catch (err) {
    errorMessage = 'Failed to parse response (code: 0xf2)';
    console.warn(`HTTP content: ${contentText}`);
    throw new Error(errorMessage);
  }
}

/**
 * Resolve the URLs of downloadable media files from a textual HTTP response.
 * @param {Object} data The JSON data retrieved from Instagram API.
 * @return {string[]} The URLs of downloadable media files.
 */
function parseDownloadUrl(data) {
  return (
    // {"reels":{...},"reels_media":[...],"status":"ok"}
    data.reels_media[0]?.items.map(
      (item) => (item.video_versions || item.image_versions2.candidates)[0].url
    ) || []
  );
}

/**
 * Test getting the URLs of media files in the data retrieved from Instagram's
 * API using getInstagramData() and parseDownloadUrl().
 * @param {Object} targetIgUser - A JSON object contains the name and id of an
 *  Instagram account, e.g. { "name": "john",
 *                             "id": "1234567890",
 *                            "destination": "1vm...sIS" }.
 * @return {number} The number of URLs obtained.
 */
export function tryGetStories(targetIgUser) {
  if (!isSettingsLoaded) {
    loadSettings();
  }
  const queryUrl = getQuery(targetIgUser.id);
  const data = getInstagramData(queryUrl);
  const urls = parseDownloadUrl(data, true);
  console.log(
    'Number of downloadable media files from @' +
      targetIgUser.name +
      ': ' +
      urls.length
  );
  return urls.length;
}

/**
 * Main function of this Apps Script.
 * - Insert logs to the Google Sheet that the Apps Script is bounded to.
 * - Fetch data from Instagram's API using getInstagramData().
 * - Resolve the URLs of downloadable media files from the retrieved data
 *   using parseDownloadUrl().
 * - Upload the media files to Google Drive if the URLs are not downloaded.
 * @param {Object} target A JSON object contains the name and the id of an
 *                        Instagram account, for example:
 *                        { "name": "john", "id": "1234567890" }.
 * @return {string} The log messages.
 */
export function fetch(target) {
  // Execute loadSettings() if the settings has not been loaded yet.
  if (!isSettingsLoaded) {
    loadSettings();
  }
  // Get data from Instagram and resolve the media URLs.
  const queryUrl = getQuery(target.id);
  const data = getInstagramData(queryUrl);
  const urls = parseDownloadUrl(data, false);

  // Get recent log data stored in the Google Sheet file.
  let msg = '';
  loadRecentLogs();

  // Append message and return if no urls are obtained
  if (urls === null || urls.length <= 0) {
    msg += 'No media URLs.\n';
    return msg;
  }

  // For each media URL
  urls.forEach((url) => {
    // Remove query strings from the URL
    if (typeof url !== 'string') {
      console.warn(
        'Invalid type for url. Expected string but received ' + typeof url
      );
      return;
    }

    // DONE: fix #84 logging blank filename
    // const pathname = url.split('.com')[1].split('?')[0];
    const { path, fileName, fileExtension } = getFileDetails(url);

    // If the URL appears in recent logs, skip uploading file to Google Drive
    if (isDownloaded(path)) {
      msg += 'Already been uploaded.\n';
      return;
    }

    // Upload fresh media file to the destination Google Drive folder
    const destinationFolder = target.destination || dest.folderId;
    const currentDatatime = new Date();
    msg += uploadToDrive(url, destinationFolder, '');
    // DONE: fix #84 logging blank filename
    const fileLink = createViewFileFormula(fileName, destinationFolder);
    if (!fileLink) {
      console.warn(
        `An issue occurred while generating the formula with the =HYPERLINK() function for the file ${fileName}. The URL ${url} was not downloaded as expected.`
        );
      return;
    }
    insertNewLog(
      currentDatatime.toLocaleString(), // Datatime string
      target.name, // IG username
      url, // Full URL
      fileExtension, // File extension
      fileLink, // Linked file name 
    );
  });
  return msg;
}

/**
 * Compile a formula to allow clicking the filename to view the file from Drive
 * @param {string} filename
 * @param {string} folderId
 * @return {string}
 */
function createViewFileFormula(filename, folderId) {
  const folder = folderId
    ? DriveApp.getFolderById(folderId)
    : DriveApp.getRootFolder();
  const files = folder.getFilesByName(filename);
  while (files.hasNext()) {
    const file = files.next();
    return `=HYPERLINK("${file.getUrl()}", "${filename}")`;
  }
}
