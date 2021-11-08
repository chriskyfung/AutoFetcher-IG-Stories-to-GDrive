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
export const dest = {
  folderId: null, // Google Drive Folder ID
  folderObj: null, // A DriveApp Folder class object.
};
// The file IDs associated to the project badge files
export const badgeFileIds = {
  lastTestedDate: '',
  lastTestedStatus: '',
};
// Header params to access Instagram
export const igParams = {
  X_IG_APP_ID: null,
  X_IG_WWW_CLAIM: null,
  COOKIE: null,
};
// User Perferences
export let errorReportEmail;
export const isDebug = false;

// A flag to store whether loadSettings() has executed.
export let isSettingsLoaded = false;

export const sheetNames = {
  logs: 'Logs',
  subscriptions: 'Subscriptions',
  settings: 'Settings',
};

/**
 * Load the settings of Instagram Stories Fetcher from the Google Sheet file
 * that the Apps Script is bounded to, and assign them to the global variables:
 * - badgeFileIds.
 */
export function loadSettings() {
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
  igParams.X_IG_APP_ID =
    settingsSheet.getRange('X_IG_APP_ID').getDisplayValue();
  igParams.X_IG_WWW_CLAIM =
      settingsSheet.getRange('X_IG_WWW_CLAIM').getDisplayValue();
  igParams.COOKIE = settingsSheet.getRange('COOKIE').getDisplayValue();
  // Set the global variable for user preferences
  errorReportEmail =
      settingsSheet.getRange('errorReportEmail').getDisplayValue();
  // Set the `isSettingsLoaded` flag to be true.
  isSettingsLoaded = true;
}
