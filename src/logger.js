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
 * Last modified  : 2021-12-02
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

const numOfColumns = 5;
const columnFilename = 5;
const columnSelected = numOfColumns + 1;
let previousLogs;

/**
 * Insert and record the date time, username, media URL and file type to be
 * downloaded to a new row at the start of the Google Sheet file that the
 * Apps Script is bounded to.
 * @param {String} datetime A date time in string format.
 * @param {String} username An Instagram username
 * @param {String} url A media URL
 * @param {String} filetype The extension of the downloaded file
 * @param {String} filename The filename of the downloaded file
 */
export function insertNewLog(datetime, username, url, filetype, filename) {
  // Get the sheet to store the log data.
  const logsSheet = SpreadsheetApp
    .getActive()
    .getSheetByName(sheetNames['logs']);
  // Insert a blank row in a sheet below the header.
  logsSheet.insertRows(2);
  // Write the log data to the new row.
  logsSheet.getRange(2, 1, 1, numOfColumns)
    .setValues([[datetime, username, url, filetype, filename]]);
  logsSheet.getRange(2, columnSelected).insertCheckboxes();
}

/**
 * Load the logs within the last 2 days from the Google Sheet file that the
 * Apps Script is bounded to, and temporarily store them to the global variable
 * called `previousLogs` in form of an Object[][].
 */
export function loadRecentLogs() {
  // Get the sheet that stores the log data.
  const logsSheet = SpreadsheetApp
    .getActive()
    .getSheetByName(sheetNames['logs']);
  const lastRow = logsSheet.getLastRow();
  const twoDaysAgo = new Date(new Date().getTime() - (48 * 60 * 60 * 1000));
  const firstOccurance = logsSheet
      .createTextFinder(twoDaysAgo.toLocaleDateString())
      .findNext();
  const toRow = firstOccurance?.getRow() || (lastRow <= 300 ? lastRow : 301);
  // Get the data the log sheet and assign them to `previousLogs`.
  previousLogs =
      logsSheet.getRange(2, 1, toRow - 1, numOfColumns).getValues();
}

/**
 * Check whether a file is downloaded by looking up its identifier in log data.
 * @param {String} searchTerm The pattern to search for, e.g. a media URL.
 * @return {boolean} Whether the search pattern is found in the log data.
 */
export function isDownloaded(searchTerm) {
  return previousLogs.flat().some((x) => x.includes(searchTerm));
}

/**
 * onEdit event handler
 * @param {Object} e An event object
 */
export function deleteSelected() {
  const logsSheet = SpreadsheetApp
    .getActive()
    .getSheetByName(sheetNames['logs']);
  const lastRow = logsSheet.getLastRow();
  const itemsToDelete = [];
  for (let row = 2; row <= lastRow; row++) {
    if (logsSheet.getRange(row, columnSelected).isChecked()) {
      const formula = logsSheet.getRange(row, columnFilename).getFormula();
      itemsToDelete.push(
        {
          row: row,
          fileId: formula.split('https://drive.google.com/file/d/')
            .pop()
            .split('/view?')
            .shift()
        }
      );
    }
  }
  const msg = Browser.msgBox(
    'Delete Seleted Items',
    `Are you sure you want to delete these ${itemsToDelete.length} items and their files from your Drive?`,
    Browser.Buttons.YES_NO
  );
  if (msg === 'yes') {
    itemsToDelete.forEach((item, index) => {
      DriveApp.getFileById(item.fileId).setTrashed(true);
      logsSheet.deleteRow(item.row - index);
    });
  }
}
