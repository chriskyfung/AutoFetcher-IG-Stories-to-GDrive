/**
 * Copyright (c) 2018-2021
 *
 * This file contains the Google Apps Script for deploying a web app that
 * automatically fetches the latest available IG Stories of a target Instagram
 * user to your Google Drive.
 *
 * @author Chris K.Y. Fung <github.com/chriskyfung>
 *
 * Created at     : 2018-01-29
 * Last modified  : 2021-11-02
 */

/**
 * Global variables
 */

const AUTH_USERNAME = PropertiesService
    .getUserProperties()
    .getProperty('AUTH_USERNAME');
const AUTH_PASSWORD = PropertiesService
    .getUserProperties()
    .getProperty('AUTH_PASSWORD');

/**
 * Handle all HTTP GET requests made to the web app URL.
 * @param {Object} e - An event object containing request parameters, including
 *  the username and password for simple security check and the id and name of
 *  an Instagram account.
 * @return {string} The log messages.
 */
function doGet(e) {
  let usr = '';
  let pwd = '';
  let target = '';

  // parse the username, password, and targeted Instagrm account information
  try {
    usr = e.parameter.usr.trim();
    pwd = e.parameter.pwd.trim();
    target =
      typeof e.parameter.target === 'string' ?
        JSON.parse(e.parameter.target) :
        e.parameter.target;
  } catch (err) {
    console.error(err);
  }
  // Run the fetch() functoin if the request made with valid username,
  // password, target parameters.
  // Send the textual log or error message as the HTML response.
  let msg = '';
  if (usr == AUTH_USERNAME && pwd == AUTH_PASSWORD && target != '') {
    msg = fetch(target);
    msg = ContentService.createTextOutput(msg);
  } else {
    msg = ContentService.createTextOutput(
        'Invalid username and password or targetID!'
    );
    console.log(msg);
  }
  return msg;
}

/**
 * Test doGet() with targeting NASA instagram stories
 */
function try_get() {
  const e = {
    parameter: {
      usr: AUTH_USERNAME,
      pwd: AUTH_PASSWORD,
      target: {name: 'nasa', id: '528817151'},
      // "target" : { "name": "medium", "id":"1112881921"}
    },
  };
  doGet(e);
}
