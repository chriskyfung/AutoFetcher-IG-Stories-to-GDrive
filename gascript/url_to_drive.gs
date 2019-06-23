// url_to_drive.gs
// Google Apps Script
// Allows uploading a URL directly to Google Drive.
//
// Live link:
// https://script.google.com/macros/s/AKfycbzvhbHS4hnWPVBDHjQzZHA0qWq0GR-6hY7TbYsNto6hZ0MeAFZt/exec
//
// Source-code:
// https://gist.github.com/denilsonsa/8134679
// https://script.google.com/d/1Ye-OEn1bDPcmeKSe4gb0YSK83RPMc4sZJt79SRt-GRY653gm2qVUptoE/edit
//
// Other solutions written by other people:
// https://ifttt.com/channels/google_drive/actions/78
// https://sites.google.com/site/fileurltodrive/
// Note: I wrote this script without looking at the source-code of other solutions.

function getFilenameFromURL(url) {
  //                  (host-ish)/(path-ish/)(filename)
  var re = /^https?:\/\/([^\/]+)\/([^?]*\/)?([^\/?]+)/;
  var match = re.exec(url);
  if (match) {
    return unescape(match[3]);
  }
  return null;
}

function getFilenameFromContentDisposition(header) {
  // It does not support escaped double-quotes inside the filename.
  // It certainly does not conform to the specs.
  var re = /; *filename=("[^"]+"|[^ ;]+)/;
  var match = re.exec(header)
  if (match) {
    return match[1];
  }
  return null;
}

function uploadToDrive(url, folderid, filename) {
  var msg = '';
  var response;

  try {
    response = UrlFetchApp.fetch(url, {
      // muteHttpExceptions: true,
      // validateHttpsCertificates: false,
      followRedirects: true  // Default is true anyway.
    });
  } catch(e) {
    return e.toString();
  }

  if (response.getResponseCode() === 200) {
    if (!filename) {
      // TODO: try content-disposition.
      filename = getFilenameFromURL(url);
    }

    if (!filename) {
      msg += 'Aborting: Filename not detected. Please supply a filename.\n'
    } else {
      var folder = DriveApp.getRootFolder();
      if (folderid) {
        folder = DriveApp.getFolderById(folderid);
      }
      
      var haBDs  = DriveApp.getFilesByName(filename)
      
      //Does not exist
      if(haBDs.hasNext()){
        return msg += 'WARNING: Filename has already existed.';
      }
      
      var blob = response.getBlob();
      var file = folder.createFile(blob);
      file.setName(filename);
      file.setDescription("Downloaded from " + url);

      var headers = response.getHeaders();
      var content_length = NaN;
      for (var key in headers) {
        if (key.toLowerCase() == 'Content-Length'.toLowerCase()) {
          content_length = parseInt(headers[key], 10);
          break;
        }
      }

      var blob_length = blob.getBytes().length;
      msg += 'Saved "' + filename + '" (' + blob_length + ' bytes)';
      if (!isNaN(content_length)) {
        if (blob_length < content_length) {
          msg += ' WARNING: truncated from ' + content_length + ' bytes.';
        } else if (blob_length > content_length) {
          msg += ' WARNING: size is greater than expected ' + content_length + ' bytes from Content-Length header.';
        }
      }
      msg += '\nto folder "' + folder.getName() + '".\n';
    }
  } else {
    msg += 'Response code: ' + response.getResponseCode() + '\n';
  }

  // Debug: printing response headers.
  // msg += JSON.stringify(response.getHeaders(), undefined, 2) + '\n';

  return msg;
}

function newPanel(app, msg, url, folderid, filename) {
  var form = app.createFormPanel();
 
  var title = app.createLabel('Upload URL to Google Drive (10MB limit)');
  title.setStyleAttributes({
    fontSize: '2em',
    margin: '0 1ex'
  });

  var extra_links = app.createFlowPanel();
  extra_links.add(app.createInlineLabel('Written by '));
  extra_links.add(app.createAnchor('Denilson Sá', 'http://about.me/denilsonsa'));
  extra_links.add(app.createInlineLabel(', source-code available at '));
  extra_links.add(app.createAnchor('Google Apps Script', 'https://script.google.com/d/1Ye-OEn1bDPcmeKSe4gb0YSK83RPMc4sZJt79SRt-GRY653gm2qVUptoE/edit'));
  extra_links.add(app.createInlineLabel(' and at '));
  extra_links.add(app.createAnchor('GitHub Gist', 'https://gist.github.com/denilsonsa/8134679'));
  extra_links.add(app.createInlineLabel('. '));

  var text = app.createLabel(msg);
  text.setId('text');
  text.setStyleAttribute('white-space', 'pre-wrap');

  var url_label = app.createLabel('URL:');
  var url_textbox = app.createTextBox();
  url_textbox.setName('url');
  url_textbox.setId('url');
  url_textbox.setStyleAttribute('width', '99%');
  url_textbox.setValue(url);

  var filename_label = app.createLabel('Filename: (blank to auto-detect)');
  var filename_textbox = app.createTextBox();
  filename_textbox.setName('filename');
  filename_textbox.setId('filename');
  filename_textbox.setStyleAttribute('width', '99%');
  filename_textbox.setValue(filename);

  var folderid_label = app.createLabel('Folder ID: (the alphanumeric string at the Google Drive URL for a folder; blank for root folder)');
  var folderid_textbox = app.createTextBox();
  folderid_textbox.setName('folderid');
  folderid_textbox.setId('folderid');
  folderid_textbox.setStyleAttribute('width', '99%');
  folderid_textbox.setValue(folderid);

  var button = app.createSubmitButton('Upload to Drive');

  var panel = app.createVerticalPanel();
  panel.setWidth("99%")
  panel.setSpacing(5);
  panel.add(title);
  panel.add(extra_links);
  panel.add(url_label);
  panel.add(url_textbox);
  panel.add(filename_label);
  panel.add(filename_textbox);
  panel.add(folderid_label);
  panel.add(folderid_textbox);
  panel.add(button);
  panel.add(text);
  form.add(panel);

  if (app) {
    app.add(form);
  }

  return panel;
}

//function getOrPost(e, app, is_post) {
//  app.setTitle('Upload URL to Google Drive');
//
//  var msg = '';
//  var url = '';
//  var folderid = '';
//  var filename = '';
//
//  if (is_post) {
//    url = e.parameter.url.trim();
//    folderid = e.parameter.folderid.trim();
//    filename = e.parameter.filename.trim();
//    msg += uploadToDrive(url, folderid, filename);
//  }
//  // msg += Logger.getLog();
//  newPanel(app, msg, url, folderid, filename);
//}

//function doGet(e) {
//  var app = UiApp.createApplication();
//  getOrPost(e, app, false);
//  return app;
//}
//
//function doPost(e) {
//  var app = UiApp.getActiveApplication();
//  getOrPost(e, app, true);
//  return app;
//}