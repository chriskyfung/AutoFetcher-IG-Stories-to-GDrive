/**
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
 * @OnlyCurrentDoc
 *
 * The above comment directs Apps Script to limit the scope of file
 * access for this add-on. It specifies that this add-on will only
 * attempt to read or modify the files in which the add-on is used,
 * and not all of the user's files. The authorization request message
 * presented to users will reflect this limited scope.
 */

/**
 * Create badges, namely "last-tested-date.svg" and a "last-tested-status.svg",
 * in the destination folder of your Google Drive using DriveApp service.
 * Obtain the file IDs and store them in the "Settings" page of the bounded
 * Google Sheet file.
 */
function createBadages() {
  loadSettings();
  getDestFolder();
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
  setTestStatusBadge();
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
        'MMM dd, YYYY'
    );
    const file = DriveApp.getFileById(badgeFileIds.lastTestedDate);
    return DriveApp.getFileByIdAndResourceKey(
        badgeFileIds.lastTestedDate,
        file.getResourceKey()
    ).setContent(
        `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="152" height="20" role="img" aria-label="last tested: ${formattedDate}"><title>last tested: ${formattedDate}</title><linearGradient id="s" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><clipPath id="r"><rect width="152" height="20" rx="3" fill="#fff"/></clipPath><g clip-path="url(#r)"><rect width="67" height="20" fill="#555"/><rect x="67" width="85" height="20" fill="#fe7d37"/><rect width="152" height="20" fill="url(#s)"/></g><g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="110"><text aria-hidden="true" x="345" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="570">last tested</text><text x="345" y="140" transform="scale(.1)" fill="#fff" textLength="570">last tested</text><text aria-hidden="true" x="1085" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="750">${formattedDate}</text><text x="1085" y="140" transform="scale(.1)" fill="#fff" textLength="750">${formattedDate}</text></g></svg>`
    ).getDownloadUrl();
  }
  return null;
}

/**
 * Update the "last-tested-status.svg" file using DriveApp service.
 * @param {string} status The arguement to determine the badge color and the
 *                 text to display in the badge. Default value is 'failed'.
 * @return {string|null} The URL that can be used to download the file.
 *                       Otherwise, returns null.
 */
function setTestStatusBadge(status = 'failed') {
  if (badgeFileIds.lastTestedStatus != '') {
    const color = status == 'passed' ? '#4c1' : '#f00';
    const file = DriveApp.getFileById(badgeFileIds.lastTestedStatus);
    return DriveApp.getFileByIdAndResourceKey(
        badgeFileIds.lastTestedStatus,
        file.getResourceKey()
    ).setContent(
        `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="124" height="20" role="img" aria-label="ig fetch test: ${status}}"><title>ig fetch test: ${status}</title><linearGradient id="s" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><clipPath id="r"><rect width="124" height="20" rx="3" fill="#fff"/></clipPath><g clip-path="url(#r)"><rect width="75" height="20" fill="#555"/><rect x="75" width="49" height="20" fill="${color}"/><rect width="124" height="20" fill="url(#s)"/></g><g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="110"><text aria-hidden="true" x="385" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="650">ig fetch test</text><text x="385" y="140" transform="scale(.1)" fill="#fff" textLength="650">ig fetch test</text><text aria-hidden="true" x="985" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="390">${status}</text><text x="985" y="140" transform="scale(.1)" fill="#fff" textLength="390">${status}</text></g></svg>`
    ).setDescription(
        `test-${status}`
    ).getDownloadUrl();
  }
  return null;
}
