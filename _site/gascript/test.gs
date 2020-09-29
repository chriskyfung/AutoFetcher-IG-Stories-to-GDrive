function PicasaGetAlbums() {
  var albums = PicasaApp.getAlbums(); 
  var output = '';
  for(i in albums) {
    var title = albums[i].getTitle();
    output += title + '<br>';
  }
}

function createAndSendDocument() {
  // Create a new Google Doc named 'Hello, world!'
  var doc = DocumentApp.create('Hello, world!');

  // Access the body of the document, then add a paragraph.
  doc.getBody().appendParagraph('This document was created by Google Apps Script.');
}