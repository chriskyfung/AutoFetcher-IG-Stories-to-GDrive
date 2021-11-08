/**
 * Copyright (c) 2021
 *
 * This file contains the code to test fetching Instagram stories using the Apps Script.
 *
 * @summary short description for the file
 * @author Chris K.Y. Fung <github.com/chriskyfung>
 *
 * Created at     : 2021-09-12
 * Last modified  : 2021-11-02
 */

import {errorReportEmail} from '../init';
import {setTestDateBadge, setTestStatusBadge} from '../badge';
import {tryGetStories, fetch} from '../fetcher';

const igUserSampleSet = [
  {name: 'bbcnews', id: '16278726'},
  {name: 'cnn', id: '217723373'},
  {name: 'medium', id: '1112881921'},
  {name: 'nasa', id: '528817151'}
];

/**
 * A test function of the fetch() function in ../src/fetcher.js.
 * @param {number} sampleIndex An index within the `igUserSampleSet` array.
 */
export function fetchTest(sampleIndex = 0) {
  const msg = fetch(igUserSampleSet[sampleIndex]);
  console.log(msg);
}

/**
 * Update "test date" and "test status" Badges.
 * Send a report email to if no downloadable URLs are obtained from the tested
 * Instagram accounts
 * @return {boolean} True if any URLs were obtained, false otherwise.
 */
export function test_pipeline() {
  setTestDateBadge();
  if (
    igUserSampleSet.every((sample) => {
      return tryGetStories(sample) === 0;
    })
  ) {
    if (errorReportEmail != '') {
      MailApp.sendEmail(
          errorReportEmail,
          'Google Apps Script [AutoFetcher-IG-Stories-to-GDrive] Crash reporter',
          'Get none urls from the test accounts.\n' +
          'Please verify the service websites and check update on https://bit.ly/2zQLd6p.',
      );
    }
    Logger.log('Failed to fetch data from the test accounts!!!');
    setTestStatusBadge((status = 'failed'));
    return false;
  }
  Logger.log('Successfully fetch data from the test accounts!');
  setTestStatusBadge((status = 'passed'));
  return true;
}
