/**
 * Copyright (c) 2021
 *
 * This file contains the code to test fetching Instagram stories using the Apps Script.
 *
 * @summary short description for the file
 * @author Chris K.Y. Fung <github.com/chriskyfung>
 *
 * Created at     : 2021-09-12
 * Last modified  : 2021-09-12
 */

 /**
 * Test getting the URLs of media files in the data retrieved from Instagram's API using fetch_ig_stories() and parseDownloadUrl().
 * @param {Object} targetIgUser - A JSON object contains the name and id of an Instagram account, e.g. { "name": "john", "id": "1234567890" }.
 * @returns {number} The number of URLs obtained.
 */
function tryGetStories(targetIgUser) {
  var query_url = getQuery(targetIgUser.id);
  var html = fetch_ig_stories(query_url);
  
  var urls = parseDownloadUrl(html,true);
  Logger.log("Number of URL(s) from @" + targetIgUser.id + ": " + urls.length);
  return urls.length;
}

/** Run test_function() with BBC News's instagram account */
function test_bbcnews_ig(){
  return tryGetStories({ "name": "bbcnews", "id":"16278726"});
}
/** Run test_function() with CNN's instagram account */
function test_cnn_ig(){
  return tryGetStories({ "name": "cnn", "id":"217723373"});
}
/** Run test_function() with Medium's instagram account */
function test_medium_ig(){
  return tryGetStories({ "name": "medium", "id":"1112881921"});
}
/** Run test_function() with NASA's instagram account */
function test_nasa_ig(){
  return tryGetStories({ "name": "nasa", "id":"528817151"});
}

/**
 * Update "test date" and "test status" Badges.
 * Send a report email to if no downloadable URLs are obtained from the tested Instagram accounts
 * @returns {boolean}
 */
function test_pipeline(){
  setTestDateBadge();
  if (test_bbcnews_ig() == 0 && test_cnn_ig() == 0 && test_medium_ig() == 0 && test_nasa_ig() == 0) {
    MailApp.sendEmail(crashReportEmail,
                      "Google Apps Script [AutoFetcher-IG-Stories-to-GDrive] Crash reporter",
                      "Get none urls from the test accounts.\nPlease verify the service websites and check update on https://bit.ly/2zQLd6p.");
    Logger.log('Failed to fetch data from the test accounts!!!')
    setTestStatusBadge(status='failed')
    return false;
  };
  Logger.log('Successfully fetch data from the test accounts!')
  setTestStatusBadge(status='passed')
  return true;
}
