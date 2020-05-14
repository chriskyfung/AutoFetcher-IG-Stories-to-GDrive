// User-defined Variables
var g_username = 'your username for this app';
var g_password = 'your password for this app';
var gdrive_id = 'your google drive folder id for storing the downloaded files';
var lastlog_id = '<your google doc ID for storing last tracking log>';
var historylog_id = '<your google doc ID for storing history log>';

function parseDownloadUrl(html){
  var dlTags = html.match(/<a .* href="(.*)" .*>Download<\/a>/g);
  var urls = [];
  for (i in dlTags) {
    var url = dlTags[i];
    urls[i] = url.match(/href="(.*)" /)[1];
  }
  return urls;
}

function myFunction(targetIgUsername) {
  // This function will track the target IG stories via storiesig.com
  var IgStoriesFeed  = "https://storydownloader.net/user/" + targetIgUsername + "/";

  // Access the body of the log google doc file
  var d = new Date();
  var file = DocumentApp.openById(lastlog_id);
  var oldfile = file.getBody().copy(); //backup the previous log 
  file.clear(); // clear the log file for logging current process
  file.getBody().appendParagraph(targetIgUsername + "\t" + d); // append date and time to the log file
  
  // Fetch from igstorie.com
  var html = UrlFetchApp.fetch(IgStoriesFeed).getContentText();
  //var doc = XmlService.parse(html);
  //var html = doc.getRootElement();
  
  // get the container #banner
  var urls = parseDownloadUrl(html);
  
  var msg = '';
  
  // For each article element found in the HTML
  if (urls.length > 0) {
    for (i in urls) {

      // check DL history
      url = urls[i];
      var hasDL = oldfile.findText(url);
      
      // log the url found to the Doc file
      file.getBody().appendParagraph('');
      file.getBody().appendParagraph(url);
      if (!hasDL) { // download the file to Google Drive
        msg = uploadToDrive(url, gdrive_id , '');      
      } 
      else {
        msg = 'File has already been fetched once.'
      }
      file.getBody().appendParagraph('\n\t' + msg); // log the upload msg to the Doc file
      Logger.log('msg');            
    }    
  }  
  var logtxt = file.getBody().getText();
  var historyfile = DocumentApp.openById(historylog_id);
  historyfile.getBody().appendParagraph(logtxt);
  
  return logtxt;  
}

function doGet(e) {
  
  var usr = '';
  var pwd = '';
  var target = '';
  
  // parse query
  try {
    usr = e.parameter.usr.trim();
    pwd = e.parameter.pwd.trim();
    target = e.parameter.target.trim();
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
        "target": "google"
      }
    };
  doGet(e);
}