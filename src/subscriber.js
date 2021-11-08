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

import {sheetNames} from './init';
import {fetch} from './fetcher';

/**
 * Get the listing from the Google Sheet that the Apps Script is bounded to,
 * and then fetch Instagram Stories for each item.
 */
export function batchFetch() {
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
