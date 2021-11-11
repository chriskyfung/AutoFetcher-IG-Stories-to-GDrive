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

/**
 * @OnlyCurrentDoc
 *
 * The above comment directs Apps Script to limit the scope of file
 * access for this add-on. It specifies that this add-on will only
 * attempt to read or modify the files in which the add-on is used,
 * and not all of the user's files. The authorization request message
 * presented to users will reflect this limited scope.
 */

import {sheetNames} from './init';

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
export function insertNewLog(datetime, username, url, filetype) {
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
export function loadRecentLogs() {
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
export function isDownloaded(searchTerm) {
  return previousLogs.flat().some((x) => x.includes(searchTerm));
}
