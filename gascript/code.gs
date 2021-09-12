// User-defined Variables
var g_username = 'your username for this app';
var g_password = 'your password for this app';
var gdrive_id = 'your google drive folder id for storing the downloaded files';
var lastlog_id = '<your google doc ID for storing last tracking log>';
var historylog_id = '<your google doc ID for storing history log>';
var fetchContentLog_id = '<your google doc ID for storing fetched Instgram JSON Data';
var statusBadge_id = '<your google drive file ID of Test Status Badge>';
var lastTestedBadge_id = '<your google drive file ID of Last Tested Badge>';
var crashReportEmail = '<your email for receiving crash report>';

var COOKIE = 'IG Cookie in your web browser';

var X_IG_APP_ID = '<your x-ig-app-id in the request header>';
var X_IG_WWW_CLAIM = '<your x-ig-www-claim in the request header>';

var isDebug = false;

/**
 * Compose the URL and the query string to the Instagram's API endpoint
 */
function getQuery(ig_user_id){  
  return "https://i.instagram.com/api/v1/feed/reels_media/?reel_ids=" + ig_user_id;
}

/**
 * Fetch data from the Instagram's API with a custom header.
 * @param {string} query - The URL and the query string to the API endpoint.
 * @returns {Object} The content of an HTTP response encoded as a string.
 */
function fetch_ig_stories(query){
  var opt3 = {
    "headers": {
      "accept": "*/*",
      "accept-language": "zh-HK,zh;q=0.9,en-HK;q=0.8,en;q=0.7,ja-JP;q=0.6,ja;q=0.5,en-US;q=0.4,zh-TW;q=0.3",
      "cache-control": "no-cache",
      "pragma": "no-cache",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "x-ig-app-id": X_IG_APP_ID,
      "x-ig-www-claim": X_IG_WWW_CLAIM,
      "cookie": COOKIE
    },
    "referrer": "https://www.instagram.com/",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors"
  };
  var response = UrlFetchApp.fetch(query, opt3).getContentText();
  if (isDebug) { Logger.log(response); }
  return response;
}

/**
 * Resolve the URLs of downloadable media files from a textual HTTP response.
 * @param {string} rawdata - The JSON string contains the data retrieved from Instagram's API.
 * @param {boolen} isTest - Set true to run in Test mode without changing the log file.
 * @returns {string[]} The URLs of downloadable media files.
 */
function parseDownloadUrl(response,isTest){
  if (response == '{"reels":{},"reels_media":[],"status":"ok"}') {
    return [];
  };
  if (isTest) {
    var data = JSON.parse(response);
  } else {
    var fetchContentlog = DocumentApp.openById(fetchContentLog_id);
    fetchContentlog.clear();
    fetchContentlog.appendParagraph(response);
    var body = fetchContentlog.getBody().getText();
    var data = JSON.parse(body);
  }
  var items = data.reels_media[0].items;

  var urls = [];
  for (i in items) {
    var item = items[i];
    if (item.video_versions) {
      var videos = item.video_versions;
      urls[i] = videos[0].url;
    } else {
      urls[i] = item.image_versions2.candidates[0].url;
    }
  }
  //Logger.log(urls);
  return urls;
}

/**
 * Main function of this Apps Script.
 * Append logs to the specified Goolge Doc file.
 * Fetch data from Instagram's API using fetch_ig_stories().
 * Resolve the URLs of downloadable media files from the retrieved data using parseDownloadUrl().
 * Upload the media files to Google Drive if any URLs do not exist in the log file.
 * @param {Object} targetIgUser - A JSON object contains the name and id of an Instagram account, e.g. { "name": "john", "id": "1234567890" }.
 * @returns {string} The log messages.
 */
function __main__(targetIgUser) {
  
  // Access the body of the log google doc file
  var d = new Date();
  var lastlogfile = DocumentApp.openById(lastlog_id);
  var oldfile = lastlogfile.getBody().copy(); //backup the previous log 
  lastlogfile.clear(); // clear the log file for logging current process
  lastlogfile.getBody().appendParagraph(targetIgUser.name + "\t" + d); // append date and time to the log file
  
  // Fetch URL
  var query_url = getQuery(targetIgUser.id);
  var response = fetch_ig_stories(query_url);
  var urls = parseDownloadUrl(response,false);
  
  var msg = '';
  
  // For each article element found in the HTML response
  if (urls != null && urls.length > 0) {
    for (i in urls) {
      var url = urls[i];
      
      // log the url found to the Doc file
      lastlogfile.getBody().appendParagraph('');
      lastlogfile.getBody().appendParagraph(url);
      
      // check DL history
      var u0 = url.split("?")[0];
      var hasDL = oldfile.findText(u0);      
      if (!hasDL) { // download the file to Google Drive
        msg = uploadToDrive(url, gdrive_id , '');      
      } 
      else {
        msg = 'File has already been fetched once.'
      }
      lastlogfile.getBody().appendParagraph('\n\t' + msg); // log the upload msg to the Doc file
      Logger.log(msg);            
    }    
  }  
  var logtxt = lastlogfile.getBody().getText();
  var historyfile = DocumentApp.openById(historylog_id);
  historyfile.getBody().appendParagraph(logtxt);
  
  return logtxt;  
}

/**
 * Test getting the URLs of media files in the data retrieved from Instagram's API using fetch_ig_stories() and parseDownloadUrl().
 * @param {Object} targetIgUser - A JSON object contains the name and id of an Instagram account, e.g. { "name": "john", "id": "1234567890" }.
 * @returns {number} The number of URLs obtained.
 */
function test_fucntion(targetIgUser) {
  var query_url = getQuery(targetIgUser.id);
  var html = fetch_ig_stories(query_url);
  
  var urls = parseDownloadUrl(html,true);
  Logger.log("Number of URL(s) from @" + targetIgUser.id + ": " + urls.length);
  return urls.length;
}

/** Run test_function() with BBC News's instagram account */
function test_bbcnews_ig(){
  return test_fucntion({ "name": "bbcnews", "id":"16278726"});
}
/** Run test_function() with CNN's instagram account */
function test_cnn_ig(){
  return test_fucntion({ "name": "cnn", "id":"217723373"});
}
/** Run test_function() with Medium's instagram account */
function test_medium_ig(){
  return test_fucntion({ "name": "medium", "id":"1112881921"});
}
/** Run test_function() with NASA's instagram account */
function test_nasa_ig(){
  return test_fucntion({ "name": "nasa", "id":"528817151"});
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

/**
 * Update the SVG file of "Test Status" badge to "Failed" using Class DriveApp.
 * @param {string} status - The arguement to determine the badge color and the text to display in the badge.
 * @returns {string|null}  The URL that can be used to download the file. Otherwise, returns null.
 */
function setTestStatusBadge(status='failed') {
  if (statusBadge_id != '') {
    const color = status == 'passed' ? '#4c1' : '#f00';
    const file = DriveApp.getFileById(statusBadge_id);    
    return DriveApp.getFileByIdAndResourceKey(statusBadge_id, file.getResourceKey()).setContent(`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="124" height="20" role="img" aria-label="ig fetch test: ${status}}"><title>ig fetch test: ${status}</title><linearGradient id="s" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><clipPath id="r"><rect width="124" height="20" rx="3" fill="#fff"/></clipPath><g clip-path="url(#r)"><rect width="75" height="20" fill="#555"/><rect x="75" width="49" height="20" fill="${color}"/><rect width="124" height="20" fill="url(#s)"/></g><g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="110"><text aria-hidden="true" x="385" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="650">ig fetch test</text><text x="385" y="140" transform="scale(.1)" fill="#fff" textLength="650">ig fetch test</text><text aria-hidden="true" x="985" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="390">${status}</text><text x="985" y="140" transform="scale(.1)" fill="#fff" textLength="390">${status}</text></g></svg>`).setDescription(`test-${status}`).getDownloadUrl();
  }
  return null;
}

/**
 * Update the SVG file of "last tested" badge using Class DriveApp
 * @returns {string|null}  The URL that can be used to download the file. Otherwise, returns null.
 */
function setTestDateBadge() {
  if (lastTestedBadge_id != '') {
    const formattedDate = Utilities.formatDate(new Date(), "GMT", "MMM dd, YYYY");
    const file = DriveApp.getFileById(lastTestedBadge_id);    
    return DriveApp.getFileByIdAndResourceKey(lastTestedBadge_id, file.getResourceKey()).setContent(`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="152" height="20" role="img" aria-label="last tested: ${formattedDate}"><title>last tested: ${formattedDate}</title><linearGradient id="s" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><clipPath id="r"><rect width="152" height="20" rx="3" fill="#fff"/></clipPath><g clip-path="url(#r)"><rect width="67" height="20" fill="#555"/><rect x="67" width="85" height="20" fill="#fe7d37"/><rect width="152" height="20" fill="url(#s)"/></g><g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="110"><text aria-hidden="true" x="345" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="570">last tested</text><text x="345" y="140" transform="scale(.1)" fill="#fff" textLength="570">last tested</text><text aria-hidden="true" x="1085" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="750">${formattedDate}</text><text x="1085" y="140" transform="scale(.1)" fill="#fff" textLength="750">${formattedDate}</text></g></svg>`).getDownloadUrl();
  }
  return null;
}

/**
 * Handle all HTTP GET requests made to the web app URL.
 * @param {Object} e - An event object containing request parameters, including the username and password for simple security check and the id and name of an Instagram account.
 * @returns {string} The log messages.
 */
function doGet(e) {
  
  var usr = '';
  var pwd = '';
  var target = '';
  
  // parse the username, password, and targeted Instagrm account information
  try {
    usr = e.parameter.usr.trim();
    pwd = e.parameter.pwd.trim();
    target = (typeof(e.parameter.target) === 'string') ? JSON.parse(e.parameter.target) : e.parameter.target;
  }
  catch(err) {
    Logger.log(err);
  }
  
  var msg = '';
  
  /**
   * Run __main__() if the request made with valid username, password, target parameters.
   * Send the textual log or error message as the HTML response.
   */ 
  if (usr == g_username && pwd == g_password && target != '') {
    msg = __main__(target);
    msg = ContentService.createTextOutput(msg);
  }
  else { msg = ContentService.createTextOutput('Invalid username and password or targetID!');
        Logger.log(msg);
  };

  return msg;
}

/**
 * Test doGet() with targeting NASA instagram stories
 */
function try_get() {
    var e = {
      "parameter": {
        "usr": g_username,
        "pwd": g_password,
        "target" : { "name": "nasa", "id":"528817151"}
        //"target" : { "name": "medium", "id":"1112881921"}
      }
    };
  doGet(e);
}
