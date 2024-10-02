/**
 * utils.test.js
 * Copyright (c) 2024
 *
 * This file contains the tests of the functions in the ../src/utils.js file.
 *
 * @author Chris K.Y. Fung <github.com/chriskyfung>
 *
 * Created at     : 2024-01-02
 * Last modified  : 2024-01-02
 */

/**
 * @OnlyCurrentDoc
 *
 * The above comment directs Apps Script to limit the scope of file
 * access for this add-on. It specifies that this add-on will only
 * attempt to read or modify the files in which the add-on is used,
 * and not all of the user's files. The authorization request message
 * presented to users will reflect this limited scope.
 */

import { getFileDetails } from '../utils';

describe('getFileDetails', () => {
  test('returns the correct file details for a valid URL', () => {
    const url = 'https://example.com/path/to/file.jpg';
    const expected = {
      path: '/path/to/file.jpg',
      fileName: 'file.jpg',
      fileExtension: 'jpg',
    };
    const result = getFileDetails(url);
    expect(result).toEqual(expected);
  });

   
  test('returns the correct file details for a URL with query parameters', () => {
    const url = 'https://example.com/path/to/file.jpg?foo=bar';
    const expected = {
      path: '/path/to/file.jpg',
      fileName: 'file.jpg',
      fileExtension: 'jpg',
    };
    const result = getFileDetails(url);
    expect(result).toEqual(expected);
  });

   
  test('returns the correct file details for a URL with a fragment identifier', () => {
    const url = 'https://example.com/path/to/file.jpg#foo';
    const expected = {
      path: '/path/to/file.jpg',
      fileName: 'file.jpg',
      fileExtension: 'jpg',
    };
    const result = getFileDetails(url);
    expect(result).toEqual(expected);
  });
});
