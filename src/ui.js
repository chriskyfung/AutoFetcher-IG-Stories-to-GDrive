/**
 * ui.js
 * Copyright (c) 2024
 *
 * This file contains the Google Apps Script to create a custom menu in the 
 * Google Sheets when the spreadsheet opens.
 *
 * @author Chris K.Y. Fung <github.com/chriskyfung>
 */

export function initUi(e) {
  try {
    let ui = SpreadsheetApp.getUi();
    ui.createMenu('igFetcher')
      .addItem('Fetch stories', 'run')
      .addSubMenu(ui.createMenu('Logs')
        .addItem('Move seleted files', 'moveSelected')
        .addItem('Delete seleted logs', 'deleteSelected')
      )
      .addToUi();
  } catch (err) {
    // TODO (Developer) - Handle exception
    Logger.log('Failed with error: %s', err.error);
  }
}
