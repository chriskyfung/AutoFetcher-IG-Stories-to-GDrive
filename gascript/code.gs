// User-defined Variables
var g_username = 'your username for this app';
var g_password = 'your password for this app';
var gdrive_id = 'your google drive folder id for storing the downloaded files';
var lastlog_id = '<your google doc ID for storing last tracking log>';
var historylog_id = '<your google doc ID for storing history log>';
var fetchContentLog_id = '<your google doc ID for storing fetched Instgram JSON Data';
var crashReportEmail = '<your email for receiving crash report>';
var query_hash = '<your IG query_hash for story look up>';
var COOKIE = 'IG Cookie in your web browser';

ffunction getQuery(ig_user_id){  
  return "https://www.instagram.com/graphql/query/?query_hash=" + query_hash + "&variables=%7B%22reel_ids%22%3A%5B%22" + ig_user_id +
"%22%5D%2C%22tag_names%22%3A%5B%5D%2C%22location_ids%22%3A%5B%5D%2C%22highlight_reel_ids%22%3A%5B%5D%2C%22precomposed_overlay%22%3Afalse%2C%22show_story_viewer_list%22%3Atrue%2C%22story_viewer_fetch_count%22%3A50%2C%22story_viewer_cursor%22%3A%22%22%2C%22stories_video_dash_manifest%22%3Afalse%7D"
}

function fetch_ig_stories(query){
  var header = {'Cookie': COOKIE};
  var opt2 = {"headers":header}; 
  return UrlFetchApp.fetch(query, opt2).getContentText();
  //var doc = XmlService.parse(html);
  //var html = doc.getRootElement();
}

function parseDownloadUrl(html,isTest){
  if (isTest) {
    var data = JSON.parse(body).html;
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
    if (item.is_video) {
      var video = item.video_resources;
      urls[i] = video[video.length-1].src;
    } else {
      urls[i] = item.display_url;
    }
  }
  //Logger.log(urls);
  return urls;
}

function myFunction(targetIgUser) {
  
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
  if (urls.length > 0) {
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

function test_nasa_ig () {
  var target = { "name": "nasa", "id": 528817151 }
  var query_url = getQuery(target.id);
  var html = fetch_ig_stories(query_url);
  
  var urls = parseDownloadUrl(html,true);
  if (urls.length == 0) {
    MailApp.sendEmail(crashReportEmail,
                  "Google Apps Script [AutoFetcher-IG-Stories-to-GDrive] Crash reporter",
                  "Get none urls from the test account https://www.instagram.com/stories/nasa/.\nPlease verify the service websites and check update on https://bit.ly/2zQLd6p.");
  }
  Logger.log("Number of URL(s): " + urls.length);
  return urls.length;
}

function doGet(e) {
  
  var usr = '';
  var pwd = '';
  var target = '';
  
  // parse query
  try {
    usr = e.parameter.usr.trim();
    pwd = e.parameter.pwd.trim();
    target = e.parameter.target;
  }
  catch(err) {
    Logger.log(err);
  }
  
  var msg = '';
  
  // execute if correct username and password in the query
  if (usr == g_username && pwd == g_password && target != '') {
    msg = myFunction(target);
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
      }
    };
  doGet(e);
}