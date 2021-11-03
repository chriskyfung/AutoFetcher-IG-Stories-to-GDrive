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
  const re = /^https?:\/\/([^\/]+)\/([^?]*\/)?([^\/?]+)/;
  const match = re.exec(url);
  if (match) {
    return unescape(match[3]);
  }
  return null;
}

function uploadToDrive(url, folderid, filename) {
  let msg = '';
  let response;

  try {
    response = UrlFetchApp.fetch(url, {
      // muteHttpExceptions: true,
      // validateHttpsCertificates: false,
      followRedirects: true, // Default is true anyway.
    });
  } catch (e) {
    return e.toString();
  }

  if (response.getResponseCode() === 200) {
    if (!filename) {
      // TODO: try content-disposition.
      filename = getFilenameFromURL(url);
    }

    if (!filename) {
      msg += 'Aborting: Filename not detected. Please supply a filename.\n';
    } else {
      let folder = DriveApp.getRootFolder();
      if (folderid) {
        folder = DriveApp.getFolderById(folderid);
      }

      const haBDs = DriveApp.getFilesByName(filename);

      // Does not exist
      if (haBDs.hasNext()) {
        return (msg += 'WARNING: Filename has already existed.');
      }

      const blob = response.getBlob();
      const file = folder.createFile(blob);
      file.setName(filename);
      file.setDescription('Downloaded from ' + url);

      const headers = response.getHeaders();
      let content_length = NaN;
      for (const key in headers) {
        if (key.toLowerCase() == 'Content-Length'.toLowerCase()) {
          content_length = parseInt(headers[key], 10);
          break;
        }
      }

      const blob_length = blob.getBytes().length;
      msg += 'Saved "' + filename + '" (' + blob_length + ' bytes)';
      if (!isNaN(content_length)) {
        if (blob_length < content_length) {
          msg += ' WARNING: truncated from ' + content_length + ' bytes.';
        } else if (blob_length > content_length) {
          msg +=
            ' WARNING: size is greater than expected ' +
            content_length +
            ' bytes from Content-Length header.';
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
