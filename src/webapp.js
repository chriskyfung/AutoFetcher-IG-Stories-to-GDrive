/**
 * webapp.js
 * Copyright (c) 2018-2021
 *
 * This file contains the Google Apps Script for deploying a web app that
 * automatically fetches the latest available IG Stories of a target Instagram
 * user to your Google Drive.
 *
 * @author Chris K.Y. Fung <github.com/chriskyfung>
 *
 * Created at     : 2018-01-29
 * Last modified  : 2022-11-22
 */

import { fetch } from './fetcher';

/**
 * Global variables
 */

const AUTH_USERNAME =
  PropertiesService.getUserProperties().getProperty('AUTH_USERNAME');
const AUTH_PASSWORD =
  PropertiesService.getUserProperties().getProperty('AUTH_PASSWORD');

/**
 * Handle all HTTP GET requests made to the web app URL.
 * @param {Object} e - An event object containing request parameters, including
 *  the username and password for simple security check and the id and name of
 *  an Instagram account.
 * @return {string} The log messages.
 */
export function doGet(e) {
  if (!(AUTH_USERNAME && AUTH_PASSWORD)) {
    console.error(
      'Failed to get AUTH_USERNAME and AUTH_PASSWORD from User Properties'
    );
  }
  let usr = '';
  let pwd = '';
  let target = '';
  // parse the username, password, and targeted Instagrm account information
  try {
    usr = e.parameter.usr.trim();
    pwd = e.parameter.pwd.trim();
    target =
      typeof e.parameter.target === 'string'
        ? JSON.parse(e.parameter.target)
        : e.parameter.target;
  } catch (err) {
    console.error(err);
  }
  // Run the fetch() functoin if the request made with valid username,
  // password, target parameters.
  // Send the textual log or error message as the HTML response.
  let msg = '';
  if (usr === AUTH_USERNAME && pwd === AUTH_PASSWORD && target != '') {
    msg = fetch(target);
  } else {
    msg = 'Invalid username and password or targetID!';
    console.warn(msg);
  }
  ContentService.createTextOutput(msg);
  return msg;
}

/**
 * Test doGet() with targeting NASA instagram stories
 */
export function try_get() {
  /* eslint camelcase: "off" */
  if (!(AUTH_USERNAME && AUTH_PASSWORD)) {
    console.error(
      'Failed to get AUTH_USERNAME and AUTH_PASSWORD from User Properties'
    );
  }
  const igUserSampleSet = [
    { name: 'bbcnews', id: '16278726' },
    { name: 'cnn', id: '217723373' },
    { name: 'medium', id: '1112881921' },
    { name: 'nasa', id: '52881715' },
  ];
  const e = {
    parameter: {
      usr: AUTH_USERNAME,
      pwd: AUTH_PASSWORD,
      target: igUserSampleSet[0],
    },
  };
  console.log(doGet(e));
}
