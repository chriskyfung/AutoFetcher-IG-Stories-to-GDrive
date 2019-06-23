// User-defined Variables
var g_username = 'your username for this app';
var g_password = 'your password for this app';
var gdrive_id = 'your google drive folder id for storing the downloaded files';
var lastlog_id = '<your google doc ID for storing last tracking log>';
var historylog_id = '<your google doc ID for storing history log>';

// Extract HTML elements by tag name
function getElementsByTagName(element, tagName) {  
  var data = [];
  var descendants = element.getDescendants();  
  for(i in descendants) {
    var elt = descendants[i].asElement();     
    if( elt !=null && elt.getName()== tagName) data.push(elt);      
  }
  return data;
}

function myFunction(targetIgUsername) {
  var IgStoriesFeed  = "https://storiesig.com/stories/" + targetIgUsername;
  
  
  //var id = Utilities.base64Encode(IgStoriesFeed);
  
  //var cache = CacheService.getPublicCache();
  //var html   = cache.get(id);
  
  //if (html != null) {
//    return html;
  // }
  
  
  // var currentTime = d.toLocaleTimeString(); // "12:35 PM", for instance
  
  
  // Create a new Google Doc named 'Hello, world!'
  //var docfile = DocumentApp.create('Hello, world!');
  
  // Access the body of the document
  var d = new Date();
  var file = DocumentApp.openByUrl(
     'https://docs.google.com/document/d/' + lastlog_id + '/edit');
  var oldfile = file.getBody().copy(); //backup the previous log 
  file.clear(); // clear the log file for logging current process
  file.getBody().appendParagraph(targetIgUsername + "\t" + d); // append date and time to the log file
  
  // Fetch URL
  var html = UrlFetchApp.fetch(IgStoriesFeed).getContentText();
  var doc = XmlService.parse(html);
  var html = doc.getRootElement();
  
  // Extract article elements
  var articles = getElementsByTagName(html, 'article');
  
  var msg = '';
  
  // For each article element found in the HTML
  if (articles.length > 0) {
    for (i in articles) {
      var iarticle = articles[i];
      // find video element in i-th article element
      var video = getElementsByTagName(iarticle, 'video');
      if (video.length > 0) { // extract url from the src value if a video exists
        var url = video[0].getAttribute('src').getValue();
      } else { // find img element and extract the src value 
        var image = getElementsByTagName(iarticle, 'img');
        var url = image[0].getAttribute('src').getValue();
      }         
   
      // check DL history
      url = url.split('?')[0];
      var hasDL = oldfile.findText(url);
      
      // log the url found to the Doc file
      file.getBody().appendParagraph('');
      file.getBody().appendParagraph(url);
      if (!hasDL) { // download the file to Google Drive
        msg = uploadToDrive(url, gdrive_id, '');      
      } 
      else {
        msg = 'File has already been fetched once.'
      }
      file.getBody().appendParagraph('\n\t' + msg); // log the upload msg to the Doc file
      Logger.log('msg');            
    }    
//    var videoInhtml = getElementsByTagName(html, 'video');
//    var numOfVideo = videoInhtml.length;
//    //var videosrc = videoInhtml[0].getAttribute('src').getValue();
//    
//    // For each video found in the HTML
//    for(i in videoInhtml) {
//      var url = videoInhtml[i].getAttribute('src').getValue();     
//      file.getBody().appendParagraph('');
//      file.getBody().appendParagraph(url);
//      
//      var hasDL = oldfile.findText(url);
//      if (!hasDL) {
//        msg = uploadToDrive(url, gdrive_id, '');      
//      } 
//      else {
//        msg = 'File has already been fetched once.'
//      }
//      file.getBody().appendParagraph('\n\t' + msg);
//      Logger.log('msg');
//    }
  }  
  var logtxt = file.getBody().getText();
  var historyfile = DocumentApp.openByUrl(
    'https://docs.google.com/document/d/' + historylog_id + '/edit');
  historyfile.getBody().appendParagraph(logtxt);
  
  return logtxt;  
}

function doGet(e) {
  
  var usr = '';
  var pwd = '';
  var target = '';
  
  try {
    usr = e.parameter.usr.trim();
    pwd = e.parameter.pwd.trim();
    target = e.parameter.target.trim();
  }
  catch(err) {
    Logger.log(err);
  }
  
  var msg = '';
  
  if (usr == g_username && pwd == g_password && target != '') {
    msg = myFunction(target);
    msg = ContentService.createTextOutput(msg);
  }
  else { msg = ContentService.createTextOutput('Invalid username and password or targetID!');
        Logger.log(msg);
  };  
  return msg;
}

function fakeget() {
    var e = 
    {
      "parameter": {
        "usr": g_username,
        "pwd": g_password,
        "target": "amber_hawken"
      }
    }
  doGet(e)
}