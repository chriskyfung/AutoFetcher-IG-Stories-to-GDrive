/**
 * logger.test.js
 * Copyright (c) 2021-2022
 *
 * This file contains the tests of the functions in the ../src/logger.js file.
 *
 * @author Chris K.Y. Fung <github.com/chriskyfung>
 *
 * Created at     : 2021-11-01
 * Last modified  : 2022-11-22
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

import { insertNewLog, loadRecentLogs, isDownloaded } from '../logger';

/**
 * A test function for the insertNewLog() function.
 */
function testInsertNewLog_() {
  /* eslint no-unused-vars: "off" */
  const currentDatatime = new Date();
  insertNewLog(
    currentDatatime.toLocaleString(),
    'bbcnews',
    'https://example.com/1234567890.mp4',
    'mp4'
  );
}

/**
 * A test function for the isDownloaded() function.
 */
function testIsDownloaded_() {
  /* eslint no-unused-vars: "off" */
  loadRecentLogs();
  console.log(isDownloaded('https://'));
}
