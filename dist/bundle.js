/* Bundle as defined from all files in src/modules/*.js */
const IGSF = Object.create(null);

'use strict';

(function (exports, window) {

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * init.js 
 * Copyright (c) 2021
 *
 * This file contains the Google Apps Script to initialize the Instagram
 * stories fetcher, including the functions to load settings from the bounded
 * Google Sheet file and get the destination folder in your Google Drive.
 *
 * @author Chris K.Y. Fung <github.com/chriskyfung>
 *
 * Created at     : 2021-11-01
 */

/**
 * @OnlyCurrentDoc
 *
 * The above comment directs Apps Script to limit the scope of file
 * access for this add-on. It specifies that this add-on will only
 * attempt to read or modify the files in which the add-on is used,
 * and not all of the user's files. The authorization request message
 * presented to users will reflect this limited scope.
 */

/**
 * Global variables
 */

// The destination where the downloaded files will be stored.
const dest = {
  folderId: null, // Google Drive Folder ID
  folderObj: null, // A DriveApp Folder class object.
};
// The file IDs associated to the project badge files
const badgeFileIds = {
  lastTestedDate: '',
  lastTestedStatus: '',
};
// Header params to access Instagram
const igParams = {
  X_IG_APP_ID: null,
  X_IG_WWW_CLAIM: null,
  COOKIE: null,
};
// User Perferences
exports.errorReportEmail = void 0;
const isDebug = false;

// A flag to store whether loadSettings() has executed.
exports.isSettingsLoaded = false;

const sheetNames = {
  logs: 'Logs',
  subscriptions: 'Subscriptions',
  settings: 'Settings',
};

/**
 * Load the settings of Instagram Stories Fetcher from the Google Sheet file
 * that the Apps Script is bounded to, and assign them to the global variables:
 * - badgeFileIds.
 */
function loadSettings() {
  const spreadsheet = SpreadsheetApp.getActive();
  const settingsSheet = spreadsheet.getSheetByName(sheetNames['settings']);
  // Set values to the `dest` object.
  dest.folderId = settingsSheet.getRange('gdriveId').getDisplayValue();
  try {
    dest.folderObj = DriveApp.getFolderById(dest.folderId);
  } catch (err) {
    dest.folderObj = DriveApp.getRootFolder();
  }
  // Set values to the `badgeFileIds` object.
  badgeFileIds.lastTestedDate = settingsSheet
      .getRange('dateBadgeId')
      .getDisplayValue();
  badgeFileIds.lastTestedStatus = settingsSheet
      .getRange('statusBadgeId')
      .getDisplayValue();
  // Set values to the `igParams` object.
  try {
    igParams.X_IG_APP_ID =
      settingsSheet.getRange('X_IG_APP_ID').getDisplayValue();
    if (igParams.X_IG_APP_ID == '') {
      throw new Error('Missing x-ig-app-id')
    };
    igParams.X_IG_WWW_CLAIM =
        settingsSheet.getRange('X_IG_WWW_CLAIM').getDisplayValue();
    if (igParams.X_IG_WWW_CLAIM == '') {
      throw new Error('Missing x-ig-www-claim')
    };
    igParams.COOKIE = settingsSheet.getRange('COOKIE').getDisplayValue();
    if (igParams.COOKIE == '') {
      throw new Error('Missing cookie')
    };
  } catch (err) {
    console.error(err);
  }
  // Set the global variable for user preferences
  exports.errorReportEmail =
      settingsSheet.getRange('errorReportEmail').getDisplayValue();
  // Set the `isSettingsLoaded` flag to be true.
  exports.isSettingsLoaded = true;
}

/**
 * logger.js
 * Copyright (c) 2021
 *
 * This file contains the Google Apps Script to read/write logs in the Google
 * Sheet that the Apps Script is bounded to.
 *
 * @author Chris K.Y. Fung <github.com/chriskyfung>
 *
 * Created at     : 2021-11-01
 * Last modified  : 2021-11-02
 */

let previousLogs;

/**
 * Insert and record the date time, username, media URL and file type to be
 * downloaded to a new row at the start of the Google Sheet file that the
 * Apps Script is bounded to.
 * @param {String} datetime A date time in string format.
 * @param {String} username An Instagram username
 * @param {String} url A media URL
 * @param {String} filetype The extension of the media file
 */
function insertNewLog(datetime, username, url, filetype) {
  // Get the sheet to store the log data.
  const spreadsheet = SpreadsheetApp.getActive();
  const logsSheet = spreadsheet.getSheetByName(sheetNames['logs']);
  // Insert a blank row in a sheet below the header.
  logsSheet.insertRows(2);
  // Write the log data to the new row.
  const secondRow = logsSheet.getRange(2, 1, 1, 4);
  secondRow.setValues([[datetime, username, url, filetype]]);
}

/**
 * Load the logs within the last 2 days from the Google Sheet file that the
 * Apps Script is bounded to, and temporarily store them to the global variable
 * called `previousLogs` in form of an Object[][].
 */
function loadRecentLogs() {
  // Get the sheet that stores the log data.
  const spreadsheet = SpreadsheetApp.getActive();
  const logsSheet = spreadsheet.getSheetByName(sheetNames['logs']);
  const lastRow = logsSheet.getLastRow();
  const twoDaysAgo = new Date(new Date().getTime() - (48 * 60 * 60 * 1000));
  const firstOccurance = logsSheet
      .createTextFinder(twoDaysAgo.toLocaleDateString())
      .findNext();
  const toRow = firstOccurance?.getRow() || (lastRow <= 300 ? lastRow : 301);
  // Get the data the log sheet and assign them to `previousLogs`.
  previousLogs =
      logsSheet.getRange(2, 1, toRow - 1, 4).getValues();
}

/**
 * Check whether a file is downloaded by looking up its identifier in log data.
 * @param {String} searchTerm The pattern to search for, e.g. a media URL.
 * @return {boolean} Whether the search pattern is found in the log data.
 */
function isDownloaded(searchTerm) {
  return previousLogs.flat().some((x) => x.includes(searchTerm));
}

// url_to_drive.gs
// Google Apps Script
// Allows uploading a URL directly to Google Drive.
//
// Live link:
// https://script.google.com/macros/s/AKfycbzvhbHS4hnWPVBDHjQzZHA0qWq0GR-6hY7TbYsNto6hZ0MeAFZt/exec
//
// Source-code:
// https://gist.github.com/denilsonsa/8134679
// https://script.google.com/d/1Ye-OEn1bDPcmeKSe4gb0YSK83RPMc4sZJt79SRt-GRY653gm2qVUptoE/edit
//
// Other solutions written by other people:
// https://ifttt.com/channels/google_drive/actions/78
// https://sites.google.com/site/fileurltodrive/
// Note: I wrote this script without looking at the source-code of other solutions.

function getFilenameFromURL(url) {
  //                  (host-ish)/(path-ish/)(filename)
  const re = /^https?:\/\/([^\/]+)\/([^?]*\/)?([^\/?]+)/;
  const match = re.exec(url);
  if (match) {
    return unescape(match[3]);
  }
  return null;
}

function uploadToDrive(url, folderid, filename) {
  let msg = '';
  let response;

  try {
    response = UrlFetchApp.fetch(url, {
      // muteHttpExceptions: true,
      // validateHttpsCertificates: false,
      followRedirects: true, // Default is true anyway.
    });
  } catch (e) {
    return e.toString();
  }

  if (response.getResponseCode() === 200) {
    if (!filename) {
      // TODO: try content-disposition.
      filename = getFilenameFromURL(url);
    }

    if (!filename) {
      msg += 'Aborting: Filename not detected. Please supply a filename.\n';
    } else {
      let folder = DriveApp.getRootFolder();
      if (folderid) {
        folder = DriveApp.getFolderById(folderid);
      }

      const haBDs = DriveApp.getFilesByName(filename);

      // Does not exist
      if (haBDs.hasNext()) {
        return (msg += 'WARNING: Filename has already existed.');
      }

      const blob = response.getBlob();
      const file = folder.createFile(blob);
      file.setName(filename);
      file.setDescription('Downloaded from ' + url);

      const headers = response.getHeaders();
      let content_length = NaN;
      for (const key in headers) {
        if (key.toLowerCase() == 'Content-Length'.toLowerCase()) {
          content_length = parseInt(headers[key], 10);
          break;
        }
      }

      const blob_length = blob.getBytes().length;
      msg += 'Saved "' + filename + '" (' + blob_length + ' bytes)';
      if (!isNaN(content_length)) {
        if (blob_length < content_length) {
          msg += ' WARNING: truncated from ' + content_length + ' bytes.';
        } else if (blob_length > content_length) {
          msg +=
            ' WARNING: size is greater than expected ' +
            content_length +
            ' bytes from Content-Length header.';
        }
      }
      msg += '\nto folder "' + folder.getName() + '".\n';
    }
  } else {
    msg += 'Response code: ' + response.getResponseCode() + '\n';
  }

  // Debug: printing response headers.
  // msg += JSON.stringify(response.getHeaders(), undefined, 2) + '\n';

  return msg;
}

/**
 * fetcher.js 
 * Copyright (c) 2018-2021
 *
 * This file contains the Google Apps Script to fetch and upload the media
 * files from the latest available Stories of a Instagram user to your Google
 * Drive.
 *
 * @author Chris K.Y. Fung <github.com/chriskyfung>
 *
 * Created at     : 2018-01-29
 * Last modified  : 2021-09-12
 */

/**
 * Compose the URL and the query string to the Instagram's API endpoint.
 * @param {String} igUserID The ID of the target Instagram user to fetch.
 * @return {string} The request URL.
 */
function getQuery(igUserID) {
  return `https://i.instagram.com/api/v1/feed/reels_media/?reel_ids=${igUserID}`;
}

/**
 * Fetch data from the Instagram's API with a custom header.
 * @param {String} query The URL and the query string to the API endpoint.
 * @return {Object} The content of an HTTP response encoded as a string.
 */
function getInstagramData(query) {
  const params = {
    headers: {
      'accept': '*/*',
      'accept-language':
        `zh-HK,zh;q=0.9,en-HK;q=0.8,en;q=0.7,ja-JP;q=0.6,ja;q=0.5,en-US;q=0.4,zh-TW;q=0.3`,
      'cache-control': 'no-cache',
      'pragma': 'no-cache',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
      'x-ig-app-id': igParams.X_IG_APP_ID,
      'x-ig-www-claim': igParams.X_IG_WWW_CLAIM,
      'cookie': igParams.COOKIE,
    },
    referrer: 'https://www.instagram.com/',
    referrerPolicy: 'strict-origin-when-cross-origin',
    body: null,
    method: 'GET',
    mode: 'cors',
  };
  const response = UrlFetchApp.fetch(query, params).getContentText();
  return JSON.parse(response);
}

/**
 * Resolve the URLs of downloadable media files from a textual HTTP response.
 * @param {Object} data The JSON data retrieved from Instagram API.
 * @return {string[]} The URLs of downloadable media files.
 */
function parseDownloadUrl(data) {
  return data.reels_media[0]?.items.map((item) =>
    (item.video_versions || item.image_versions2.candidates)[0].url) || [];
}

/**
 * Test getting the URLs of media files in the data retrieved from Instagram's
 * API using getInstagramData() and parseDownloadUrl().
 * @param {Object} targetIgUser - A JSON object contains the name and id of an
 *  Instagram account, e.g. { "name": "john", "id": "1234567890" }.
 * @return {number} The number of URLs obtained.
 */
function tryGetStories(targetIgUser) {
  if (!exports.isSettingsLoaded) {
    loadSettings();
  }
  const queryUrl = getQuery(targetIgUser.id);
  const html = getInstagramData(queryUrl);

  const urls = parseDownloadUrl(html);
  console.log('Number of downloadable media files from @' + targetIgUser.name + ': ' + urls.length);
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
function fetch(target) {
  // Execute loadSettings() if the settings has not been loaded yet.
  if (!exports.isSettingsLoaded) {
    loadSettings();
  }
  // Get data from Instagram and resolve the media URLs.
  const queryUrl = getQuery(target.id);
  const data = getInstagramData(queryUrl);
  const urls = parseDownloadUrl(data);
  // Get recent log data stored in the Google Sheet file.
  let msg = '';
  loadRecentLogs();
  // For each media URL
  if (urls != null && urls.length > 0) {
    urls.forEach((url) => {
      // Remove query strings from the URL.
      const pathname = url.split('.com')[1].split('?')[0];
      // Check if the URL appears in the recent logs.
      if (isDownloaded(pathname)) {
        // Skip processing any downloaded file.
        msg += 'Already been uploaded.\n';
      } else {
        // Upload fresh media file to the destination Google Drive folder
        msg += uploadToDrive(url, dest.folderId, '');
        const currentDatatime = new Date();
        insertNewLog(
            currentDatatime.toLocaleString(), // Datatime string
            target.name, // IG username
            url, // Full URL
            pathname.split('.').pop(), // File extension
        );
      }
    });
  } else {
    msg += 'No media file available.\n';
  }
  return msg;
}

/**
 * webapp.js
 * Copyright (c) 2018-2021
 *
 * This file contains the Google Apps Script for deploying a web app that
 * automatically fetches the latest available IG Stories of a target Instagram
 * user to your Google Drive.
 *
 * @author Chris K.Y. Fung <github.com/chriskyfung>
 *
 * Created at     : 2018-01-29
 * Last modified  : 2021-11-02
 */

/**
 * Global variables
 */

const AUTH_USERNAME = PropertiesService
    .getUserProperties()
    .getProperty('AUTH_USERNAME');
const AUTH_PASSWORD = PropertiesService
    .getUserProperties()
    .getProperty('AUTH_PASSWORD');

/**
 * Handle all HTTP GET requests made to the web app URL.
 * @param {Object} e - An event object containing request parameters, including
 *  the username and password for simple security check and the id and name of
 *  an Instagram account.
 * @return {string} The log messages.
 */
function doGet(e) {
  if (!(AUTH_USERNAME && AUTH_PASSWORD)) {
    console.error(
      'Failed to get AUTH_USERNAME and AUTH_PASSWORD from User Properties');
  }
  let usr = '';
  let pwd = '';
  let target = '';
  // parse the username, password, and targeted Instagrm account information
  try {
    usr = e.parameter.usr.trim();
    pwd = e.parameter.pwd.trim();
    target =
      typeof e.parameter.target === 'string' ?
        JSON.parse(e.parameter.target) :
        e.parameter.target;
  } catch (err) {
    console.error(err);
  }
  // Run the fetch() functoin if the request made with valid username,
  // password, target parameters.
  // Send the textual log or error message as the HTML response.
  let msg = '';
  if (usr === AUTH_USERNAME && pwd === AUTH_PASSWORD && target != '') {
    msg = fetch(target);
  } else {
    msg = 'Invalid username and password or targetID!';
    console.warn(msg);
  }
  ContentService.createTextOutput(msg);
  return msg;
}

/**
 * Test doGet() with targeting NASA instagram stories
 */
function try_get() {
  if (!(AUTH_USERNAME && AUTH_PASSWORD)) {
    console.error(
      'Failed to get AUTH_USERNAME and AUTH_PASSWORD from User Properties');
  }
  const igUserSampleSet = [
    {"name": "bbcnews", "id": "16278726"},
    {"name": "cnn", "id": "217723373"},
    {"name": "medium", "id": "1112881921"},
    {"name": "nasa", "id": "52881715"}
  ];
  const e = {
    parameter: {
      usr: AUTH_USERNAME,
      pwd: AUTH_PASSWORD,
      target: igUserSampleSet[0],
    },
  };
  console.log(doGet(e));
}

/**
 * subscriber.js
 * Copyright (c) 2021
 *
 * This file contains the Google Apps Script to read/write logs in the Google
 * Sheet that the Apps Script is bounded to.
 *
 * @author Chris K.Y. Fung <github.com/chriskyfung>
 *
 * Created at     : 2021-11-02
 * Last modified  : 2021-11-02
 */

/**
 * Get the listing from the Google Sheet that the Apps Script is bounded to,
 * and then fetch Instagram Stories for each item.
 */
function batchFetch() {
  const spreadsheet = SpreadsheetApp.getActive();
  const subscriptionsSheet = spreadsheet.getSheetByName(sheetNames['subscriptions']);
  const data = subscriptionsSheet
      .getRange(2, 1, subscriptionsSheet.getLastRow() - 1, 3 )
      .getValues();
  data.forEach((row) => {
    console.log(`fetching ${row[0]}...`);
    const msg = fetch({id: row[1], name: row[0]});
    console.log(msg);
  });
}

/**
 * badge.js
 * Copyright (c) 2020-2021
 *
 * This file contains the code to create and update SVG badges,
 * such as "last-tested-date.svg" and a "last-tested-status.svg".
 *
 * @author Chris K.Y. Fung <github.com/chriskyfung>
 *
 * Created at     : 2020-10-08
 * Last modified  : 2021-11-02
 */

/**
 * Create badges, namely "last-tested-date.svg" and a "last-tested-status.svg",
 * in the destination folder of your Google Drive using DriveApp service.
 * Obtain the file IDs and store them in the "Settings" page of the bounded
 * Google Sheet file.
 */
function createBadages() {
  loadSettings();
  // Get the sheet stored the settings of Instagram Stories Fetcher
  const spreadsheet = SpreadsheetApp.getActive();
  const settingsSheet = spreadsheet.getSheetByName(sheetNames['settings']);
  // Create blank SVG files in the destination folder, and store their file IDs
  // in the global variable `badgeFileIds`.
  badgeFileIds.lastTestedDate = dest.folderObj
      .createFile('last-tested-date.svg', '', 'image/svg+xml')
      .getId();
  badgeFileIds.lastTestedStatus = dest.folderObj
      .createFile('last-tested-status.svg', '', 'image/svg+xml')
      .getId();
  // Fill in the file IDs to the Google Sheet.
  settingsSheet
      .getRange('dateBadgeId')
      .setValue(badgeFileIds.lastTestedDate);
  settingsSheet
      .getRange('statusBadgeId')
      .setValue(badgeFileIds.lastTestedStatus);
  // Fill the blank SVG files with default contents.
  setTestDateBadge();
  setHealthStatusBadge();
}

/**
 * Update the "last-tested-date.svg" file using DriveApp service.
 * @return {string|null} The URL that can be used to download the file.
 *                       Otherwise, returns null.
 */
function setTestDateBadge() {
  if (badgeFileIds.lastTestedDate != '') {
    const formattedDate = Utilities.formatDate(
        new Date(),
        'GMT',
        'MMM dd, YYYY',
    );
    const file = DriveApp.getFileById(badgeFileIds.lastTestedDate);
    return DriveApp.getFileByIdAndResourceKey(
        badgeFileIds.lastTestedDate,
        file.getResourceKey(),
    ).setContent(
        `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="152" height="20" role="img" aria-label="last health check on ${formattedDate}"><title>tested on: ${formattedDate}</title><linearGradient id="s" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><clipPath id="r"><rect width="152" height="20" rx="3" fill="#fff"/></clipPath><g clip-path="url(#r)"><rect width="67" height="20" fill="#555"/><rect x="67" width="85" height="20" fill="#fe7d37"/><rect width="152" height="20" fill="url(#s)"/></g><g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="110"><text aria-hidden="true" x="345" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="570">tested on</text><text x="345" y="140" transform="scale(.1)" fill="#fff" textLength="570">tested on</text><text aria-hidden="true" x="1085" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="750">${formattedDate}</text><text x="1085" y="140" transform="scale(.1)" fill="#fff" textLength="750">${formattedDate}</text></g></svg>`,
    ).getDownloadUrl();
  }
  return null;
}

/**
 * Update the "last-tested-status.svg" file using DriveApp service.
 * @param {boolean} healthy The arguement to determine the badge color and the
 *                 text to display in the badge. Default value is 'failed'.
 * @return {string|null} The URL that can be used to download the file.
 *                       Otherwise, returns null.
 */
function setHealthStatusBadge(healthy) {
  if (badgeFileIds.lastTestedStatus != '') {
    const [color, status] =
        healthy === true ? ['#4c1', 'passed'] : ['#f00', 'failed'];
    const file = DriveApp.getFileById(badgeFileIds.lastTestedStatus);
    return DriveApp.getFileByIdAndResourceKey(
        badgeFileIds.lastTestedStatus,
        file.getResourceKey(),
    ).setContent(
        `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="124" height="20" role="img" aria-label="health check: ${status}}"><title>health check: ${status}</title><linearGradient id="s" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><clipPath id="r"><rect width="124" height="20" rx="3" fill="#fff"/></clipPath><g clip-path="url(#r)"><rect width="75" height="20" fill="#555"/><rect x="75" width="49" height="20" fill="${color}"/><rect width="124" height="20" fill="url(#s)"/></g><g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="110"><text aria-hidden="true" x="385" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="650">health check</text><text x="385" y="140" transform="scale(.1)" fill="#fff" textLength="650">health check</text><text aria-hidden="true" x="985" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="390">${status}</text><text x="985" y="140" transform="scale(.1)" fill="#fff" textLength="390">${status}</text></g></svg>`,
    ).setDescription(
        `test-${healthy}`,
    ).getDownloadUrl();
  }
  return null;
}

/**
 * Copyright (c) 2021
 *
 * This file contains the code to test fetching Instagram stories using the Apps Script.
 *
 * @summary short description for the file
 * @author Chris K.Y. Fung <github.com/chriskyfung>
 *
 * Created at     : 2021-09-12
 * Last modified  : 2021-11-02
 */

const igUserSampleSet = [
  {name: 'bbcnews', id: '16278726'},
  {name: 'cnn', id: '217723373'},
  {name: 'medium', id: '1112881921'},
  {name: 'nasa', id: '528817151'}
];

/**
 * A test function of the fetch() function in ../src/fetcher.js.
 * @param {number} sampleIndex An index within the `igUserSampleSet` array.
 */
function fetchTest(sampleIndex = 0) {
  const msg = fetch(igUserSampleSet[sampleIndex]);
  console.log(msg);
}

/**
 * Update "test date" and "test status" Badges.
 * Send a report email to if no downloadable URLs are obtained from the tested
 * Instagram accounts
 * @return {boolean} True if any URLs were obtained, false otherwise.
 */
function test_pipeline() {
  const healthy = igUserSampleSet.some((sample) => {
    return tryGetStories(sample) >= 1;
  });
  if (!healthy && exports.errorReportEmail != '') {
    MailApp.sendEmail(
        exports.errorReportEmail,
        'Google Apps Script [AutoFetcher-IG-Stories-to-GDrive] Crash reporter',
        'Get none urls from the test accounts.\n' +
        'Please verify the service websites and check update on https://bit.ly/2zQLd6p.',
    );
  }
  setTestDateBadge();
  setHealthStatusBadge(healthy);
  return healthy;
}

exports.badgeFileIds = badgeFileIds;
exports.batchFetch = batchFetch;
exports.createBadages = createBadages;
exports.dest = dest;
exports.doGet = doGet;
exports.fetch = fetch;
exports.fetchTest = fetchTest;
exports.getInstagramData = getInstagramData;
exports.getQuery = getQuery;
exports.igParams = igParams;
exports.insertNewLog = insertNewLog;
exports.isDebug = isDebug;
exports.isDownloaded = isDownloaded;
exports.loadRecentLogs = loadRecentLogs;
exports.loadSettings = loadSettings;
exports.setHealthStatusBadge = setHealthStatusBadge;
exports.setTestDateBadge = setTestDateBadge;
exports.sheetNames = sheetNames;
exports.test_pipeline = test_pipeline;
exports.tryGetStories = tryGetStories;
exports.try_get = try_get;
exports.uploadToDrive = uploadToDrive;

})(IGSF, this);
function getInstance(){return IGSF};
