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

function getQuery(ig_user_id){  
  return "https://i.instagram.com/api/v1/feed/reels_media/?reel_ids=" + ig_user_id;
}

function fetch_ig_stories(query){
  var opt3 = {
    "headers": {
      "accept": "*/*",
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
  var data = UrlFetchApp.fetch(query, opt3).getContentText();
  if (isDebug) { Logger.log(data); }
  return data;
  //var doc = XmlService.parse(html);
  //var html = doc.getRootElement();
}

function parseDownloadUrl(html,isTest){
  if (html == '{"data":{"reels_media":[]},"status":"ok"}') {
    return [];
  };
  if (isTest) {
    var data = JSON.parse(html);
  } else {
    var fetchContentlog = DocumentApp.openById(fetchContentLog_id);
    fetchContentlog.clear();
    fetchContentlog.appendParagraph(html);
    var body = fetchContentlog.getBody().getText();
    var data = JSON.parse(body).data;
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

function __main__(targetIgUser) {
  
  // Access the body of the log google doc file
  var d = new Date();
  var lastlogfile = DocumentApp.openById(lastlog_id);
  var oldfile = lastlogfile.getBody().copy(); //backup the previous log 
  lastlogfile.clear(); // clear the log file for logging current process
  lastlogfile.getBody().appendParagraph(targetIgUser.name + "\t" + d); // append date and time to the log file
  
  // Fetch URL
  var query_url = getQuery(targetIgUser.id);
  var html = fetch_ig_stories(query_url);
  var urls = parseDownloadUrl(html,false);
  
  var msg = '';
  
  // For each article element found in the HTML
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
      Logger.log('msg');            
    }    
  }  
  var logtxt = lastlogfile.getBody().getText();
  var historyfile = DocumentApp.openById(historylog_id);
  historyfile.getBody().appendParagraph(logtxt);
  
  return logtxt;  
}

function test_fucntion (targetIgUser) {
  var query_url = getQuery(targetIgUser.id);
  var html = fetch_ig_stories(query_url);
  
  var urls = parseDownloadUrl(html,true);
  Logger.log("Number of URL(s) from @" + targetIgUser.id + ": " + urls.length);
  return urls.length;
}

function test_nasa_ig(){
  return test_fucntion({ "name": "nasa", "id":"528817151"});
}

function test_medium_ig(){
  return test_fucntion({ "name": "medium", "id":"1112881921"});
}

function test_bbcnews_ig(){
  return test_fucntion({ "name": "bbcnews", "id":"16278726"});
}

function test_pipeline(){
  updateLastTestedBadge();
  if (test_bbcnews_ig() == 0) {
    if (test_nasa_ig() == 0) {
      if (test_medium_ig() == 0) {
        MailApp.sendEmail(crashReportEmail,
                          "Google Apps Script [AutoFetcher-IG-Stories-to-GDrive] Crash reporter",
                          "Get none urls from the test accounts.\nPlease verify the service websites and check update on https://bit.ly/2zQLd6p.");
        Logger.log('Failed to fetch data from the test accounts!!!')
        updateBadgeToFailStatus();
        return false;
      };
    };
  };
  Logger.log('Successfully fetch data from the test accounts!')
  updateBadgeToSucessStatus();
  return true;
}

function updateBadgeToFailStatus() {
  if (statusBadge_id != '') {
    var fileDescr = Drive.Files.get(statusBadge_id).getDescription();
    if (fileDescr != 'test-failed') {
      var newBadge = UrlFetchApp.fetch("https://img.shields.io/badge/ig%20fetch%20test-failed-red");
      var badgeBlob = newBadge.getBlob();
      var file_meta = {
        mimeType: 'image/svg+xml',
        description: 'test-failed'
      };
      var updatedFile = Drive.Files.update(file_meta, statusBadge_id,badgeBlob);
    };
  };
}

function updateBadgeToSucessStatus() {
  if (statusBadge_id != '') {    
    var fileDescr = Drive.Files.get(statusBadge_id).getDescription();
    if (fileDescr != 'test-passed') {
      var newBadge = UrlFetchApp.fetch("https://img.shields.io/badge/ig%20fetch%20test-passed-brightgreen");
      var badgeBlob = newBadge.getBlob();
      var file_meta = {
        mimeType: 'image/svg+xml',
        description: 'test-passed'
      };
      var updatedFile = Drive.Files.update(file_meta, statusBadge_id,badgeBlob);
    };
  };
}

function updateLastTestedBadge() {
  if (lastTestedBadge_id != '') {
    var formattedDate = Utilities.formatDate(new Date(), "GMT", "MMM dd, YYYY");
    var webSafeFormattedDate = formattedDate.replace(/\s/g, '%20').replace(/,/g, '%2C');
    Logger.log(formattedDate) ;
    var newBadge = UrlFetchApp.fetch("https://img.shields.io/badge/last%20tested-" + webSafeFormattedDate + "-orange");
    var badgeBlob = newBadge.getBlob();
    var file_meta = {
      mimeType: 'image/svg+xml',
      description: 'last test badge'
    };
    var updatedFile = Drive.Files.update(file_meta, lastTestedBadge_id,badgeBlob);
  };
}

function doGet(e) {
  
  var usr = '';
  var pwd = '';
  var target = '';
  
  // parse query
  try {
    usr = e.parameter.usr.trim();
    pwd = e.parameter.pwd.trim();
    target = (typeof(e.parameter.target) === 'string') ? JSON.parse(e.parameter.target) : e.parameter.target;
  }
  catch(err) {
    Logger.log(err);
  }
  
  var msg = '';
  
  // execute if correct username and password in the query
  if (usr == g_username && pwd == g_password && target != '') {
    msg = __main__(target);
    msg = ContentService.createTextOutput(msg);
  }
  else { msg = ContentService.createTextOutput('Invalid username and password or targetID!');
        Logger.log(msg);
  };  
  return msg;
}

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
