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

function getElementsByClassName(element, classToFind) {  
  var data = [];
  var descendants = element.getDescendants();
  descendants.push(element);  
  for(i in descendants) {
    var elt = descendants[i].asElement();
    if(elt != null) {
      var classes = elt.getAttribute('class');
      if(classes != null) {
        classes = classes.getValue();
        if(classes == classToFind) data.push(elt);
        else {
          classes = classes.split(' ');
          for(j in classes) {
            if(classes[j] == classToFind) {
              data.push(elt);
              break;
            }
          }
        }
      }
    }
  }
  return data;
}

function parseMediaUrl(iarticle){
  // find video element in i-th article element
      var video = getElementsByTagName(iarticle, 'video');
      if (video.length > 0) { // extract url from the src value if a video exists
        var url = video[0].getAttribute('src').getValue();
      } else { // find img element and extract the src value 
        var image = getElementsByTagName(iarticle, 'img');
        var url = image[0].getAttribute('src').getValue();
      }   
    return url;
}

function parseDownloadUrl(iarticle){
    var dl_div = getElementsByClassName(iarticle, 'download')[0];
    var dl_url = getElementsByTagName(dl_div,'a')[0].getAttribute('href').getValue();
    return dl_url;
}

function myFunction(targetIgUsername) {
  // This function will track the target IG stories via storiesig.com
  var IgStoriesFeed  = "https://storiesig.com/stories/" + targetIgUsername;

  // Access the body of the log google doc file
  var d = new Date();
  var file = DocumentApp.openById(lastlog_id);
  var oldfile = file.getBody().copy(); //backup the previous log 
  file.clear(); // clear the log file for logging current process
  file.getBody().appendParagraph(targetIgUsername + "\t" + d); // append date and time to the log file
  
  // Fetch storiesig.com
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
      url = parseDownloadUrl(iarticle);
   
      // check DL history
      //url = url.split('?')[0];
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
        //"target": "___alicecream___"
        "target": "amber_hawken"
      }
    };
  doGet(e);
}