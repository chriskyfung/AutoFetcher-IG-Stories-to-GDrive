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

/**
 * A row data obtained by using the Apps Script below:
 *   `logsSheet.getRange(row, 1, 1, 5).getValues()[0];`
 */
[
  '12/23/2023, 7:01:50 AM',
  'bbcnews',
  `https://scontent-iad3-1.cdninstagram.com/v/t51.2885-15/412514476_1718390002006897_6716625557268607946_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMTcweDIwODAuc2RyIn0&_nc_ht=scontent-iad3-1.cdninstagram.com&_nc_cat=1&_nc_ohc=Ng1OSbzyQ6QAX_-DNij&edm=ANmP7GQBAAAA&ccb=7-5&ig_cache_key=MzI2MzU1NDgwNzcwMzY4MTc3MQ%3D%3D.2-ccb7-5&oh=00_AfAtC1enDTdOoet5BqZN85bcp26KWGOF-TFCFEXJ184yPQ&oe=6587792D&_nc_sid=982cc7`,
  'jpg',
  '412514476_1718390002006897_6716625557268607946_n.jpg',
];
