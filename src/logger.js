/**
 * logger.js
 * Copyright (c) 2021-2023
 *
 * This file contains the Google Apps Script to read/write logs in the Google
 * Sheet that the Apps Script is bounded to.
 *
 * @author Chris K.Y. Fung <github.com/chriskyfung>
 *
 * Created at     : 2021-11-01
 * Last updated at : 2023-02-21
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

import { sheetNames } from './init';

const numOfColumns = 5;
const column = {
  filename: 5,
  selected: 6,
  empty: 7,
};
let previousLogs;

/**
 * This function inserts a new log entry into the "Logs" sheet in a Google 
 * Sheets document. The log entry includes the datetime, username, URL, 
 * filetype, and filename. It formats the datetime, inserts a new row below the
 * header, writes the log data to the new row, and inserts checkboxes into the
 * respective column.
 * @param {Date} datetime - The date and time of the log entry
 * @param {string} username -  TheInstagram username
 * @param {string} url - The media URL
 * @param {string} filetype - The extension of the downloaded file
 * @param {string} filename - The filename of the downloaded file
 */
export function insertNewLog(datetime, username, url, filetype, filename) {
  const spreadsheet = SpreadsheetApp.getActive();
  const logsSheet = spreadsheet.getSheetByName(sheetNames['logs']);

  // Use spreadsheet methods to get the desired date format and time zone
  const formattedDateTime = Utilities.formatDate(
    datetime,
    spreadsheet.getSpreadsheetTimeZone(),
    'yyyy-MM-dd HH:mm:ss'
  );

  // Insert a new row below the header
  logsSheet.insertRows(2);

  // Write the log data to the new row
  logsSheet
    .getRange(2, 1, 1, numOfColumns)
    .setValues([[formattedDateTime, username, url, filetype, filename]]);

  // Insert checkboxes into the respective column (column.selected)
  logsSheet.getRange(2, column.selected).insertCheckboxes();
}

/**
 * Load the logs within the last 2 days from the Google Sheet file that the
 * Apps Script is bounded to, and temporarily store them to the global variable
 * called `previousLogs` in form of a Range object.
 */
export function loadRecentLogs() {
  // Get the sheet that stores the log data.
  const logsSheet = SpreadsheetApp.getActive().getSheetByName(
    sheetNames['logs']
  );
  const lastRow = logsSheet.getLastRow();
  const twoDaysAgo = new Date(new Date().getTime() - 48 * 60 * 60 * 1000);
  const firstOccurance = logsSheet
    .createTextFinder(twoDaysAgo.toLocaleDateString())
    .findNext();
  const toRow = firstOccurance?.getRow() || (lastRow <= 300 ? lastRow : 301);
  const numOfRows = toRow - 1 || 1;
  // Get the data the log sheet and assign them to `previousLogs`.
  previousLogs = logsSheet.getRange(2, 1, numOfRows, numOfColumns);
}

/**
 * Check whether a file is downloaded by looking up its identifier in log data.
 * @param {String} searchTerm The pattern to search for, e.g. a media URL.
 * @return {boolean} Whether the search pattern is found in the log data.
 */
export function isDownloaded(searchTerm) {
  return (
    previousLogs.createTextFinder(searchTerm).matchCase(true).findNext() !==
    null
  );
}

/**
 * Get and format the data of selected log entries
 * @return {Object} The log sheet and the data of the selected entries
 */
function getSelected() {
  const logsSheet = SpreadsheetApp.getActive().getSheetByName(
    sheetNames['logs']
  );
  const lastRow = logsSheet.getLastRow();
  const items = [];
  for (let row = 2; row <= lastRow; row++) {
    if (!logsSheet.getRange(row, column.selected).isChecked()) {
      continue;
    }
    const rowData = logsSheet.getRange(row, 1, 1, numOfColumns).getValues()[0];
    const formula = logsSheet.getRange(row, column.filename).getFormula();
    items.push({
      row: row,
      fileId: formula
        .split('https://drive.google.com/file/d/')
        .pop()
        .split('/view?')
        .shift(),
      data: rowData,
    });
  }
  return {
    sheet: logsSheet,
    items: items,
  };
}

/**
 * Delete selected log entries from the log sheet and
 * their files from Google Drive
 */
export function deleteSelected() {
  const logsSheet = SpreadsheetApp.getActive().getSheetByName(
    sheetNames['logs']
  );
  const items = getSelected().items;
  const msg = Browser.msgBox(
    'Delete Seleted Items',
    `Are you sure you want to delete these ${items.length} items and their files from your Drive?`,
    Browser.Buttons.YES_NO
  );
  if (msg === 'yes') {
    items.forEach((item, index) => {
      if (item.fileId) {
        const file = DriveApp.getFileById(item.fileId);
        if (file) {
          file.setTrashed(true);
        } else {
          console.error(`File not found for ${JSON.stringify(item)}`);
        }
      } else {
        console.warn(`Missing File Id for ${JSON.stringify(item)}`);
      }
      logsSheet.deleteRow(item.row - index);
    });
  }
}

/**
 * Ask user to enter a Google Folder ID, and
 * move the selected entries' files to this folder
 */
export function moveSelected() {
  const logsSheet = SpreadsheetApp.getActive().getSheetByName(
    sheetNames['logs']
  );
  const items = getSelected().items;
  const ui = SpreadsheetApp.getUi();
  const result = ui.prompt(
    'Please enter the destination folder ID:',
    ui.ButtonSet.OK_CANCEL
  );
  // Process the user's response.
  const button = result.getSelectedButton();
  const text = result.getResponseText();
  if (button == ui.Button.OK) {
    // User clicked "OK".
    let destFolder;
    try {
      destFolder = DriveApp.getFolderById(text);
    } catch (err) {
      throw new Error(
        `The folder does not exist or the user does not have permission to access it.`
      );
    }
    const msg = Browser.msgBox(
      'Move Seleted Items',
      `Are you sure you want to move these ${
        items.length
      } items' files to 📁${destFolder.getName()}?`,
      Browser.Buttons.YES_NO
    );
    if (msg === 'yes') {
      items.forEach((item, index) => {
        if (item.fileId != '') {
          try {
            DriveApp.getFileById(item.fileId).moveTo(destFolder);
            logsSheet.getRange(item.row, column.selected).uncheck();
            logsSheet
              .getRange(item.row, column.empty)
              .setValue('Moved')
              .setFontColor('blue');
          } catch (err) {
            logsSheet
              .getRange(item.row, column.empty)
              .setValue(
                `The file does not exist or the user does not have permission to access it.`
              )
              .setFontColor('red');
          }
        }
      });
    }
  }
}
