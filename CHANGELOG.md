# Changelog - IG Stories to GDrive Fetcher

These changes reflect the continuous development and maintenance of the software
library, including bug fixes, feature additions, and updates to dependencies.

For more details on specific issues and pull requests, you can refer to the 
corresponding GitHub links provided. If you require further specific details
about a particular build or feature, feel free to reach out.

## Library V10 (build240315a) / 2024-03-15

### Bug Fixes

- Standardized log datetime format ([#80])

  - Enhanced the `insertNewLog` function in `logger.js` to receive a JavaScript 
    Date object for the `datetime` parameter instead of a string.
  - Retrieve the time zone from the spreadsheet's locate setting.
  - Transformed the `datetime` parameter to a datetime string in the format of 
    `"yyyy-MM-dd HH:mm:ss"` using the `Utilities.formatDate()` method.
  - Adjusted the `fetcher.js` file to pass the date and time as a `Date` object 
    when calling the `insertNewLog` function.

- Resolved the "No item with the given ID could be found" error ([#112])

  - Enclosed the `DriveApp.getFileById` method call in a `try-catch` block in 
    `logger.js`.
  - Included error logging in the `catch` block if an exception is thrown.

[#80]: https://github.com/chriskyfung/AutoFetcher-IG-Stories-to-GDrive/issues/80
[#112]: https://github.com/chriskyfung/AutoFetcher-IG-Stories-to-GDrive/issues/112

### Dependencies

- **Updated:**
  - jekyll (3.9.0 → 3.9.5)
  - nokogiri (1.16.0 → 1.16.2) in `/docs` ([#96])
  - apps-script-oauth2 (72d4dbc → 6ae908a) ([#101])
  - eslint-plugin-googleappsscript (1.0.4 → 1.0.5) ([#106])
  - @babel/preset-env (7.23.7 → 7.24.0) ([#107])
  - @rollup/plugin-multi-entry (6.0.0 → 6.0.1) ([#108])
  - eslint (8.34.0 → 8.57.0) ([#109])
  - rollup (3.15.0 → 4.12.0) ([#110])

[#96]: https://github.com/chriskyfung/AutoFetcher-IG-Stories-to-GDrive/pull/96
[#101]: https://github.com/chriskyfung/AutoFetcher-IG-Stories-to-GDrive/pull/101
[#106]: https://github.com/chriskyfung/AutoFetcher-IG-Stories-to-GDrive/pull/106
[#107]: https://github.com/chriskyfung/AutoFetcher-IG-Stories-to-GDrive/pull/107
[#108]: https://github.com/chriskyfung/AutoFetcher-IG-Stories-to-GDrive/pull/108
[#109]: https://github.com/chriskyfung/AutoFetcher-IG-Stories-to-GDrive/pull/109
[#110]: https://github.com/chriskyfung/AutoFetcher-IG-Stories-to-GDrive/pull/110

### Documentation

- Corrected the permalink URLs of "Release Notes" and "Advanced Configurations"
  pages.
- Updated API endpoint URLs for status badges.
- Enhanced formatting of H2 headers in release notes:

  - Eliminated build numbers from H2 headers.
  - Enclosed release dates with parentheses.

- Refined and styled the changelog.

### CI/CD Integration

- Implemented automated version updates via Dependabot.
- Upgraded github/codeql-action (1 → 3) and actions/checkout (2 → 4) in 
  `codeql-analysis.yml`

* * *

## Library V9 (build240205a) / 2024-02-05

### New Features

- Added custom menu and menu items to Google Sheets
- Enabled moving downloaded files to other Google Drive folder via Google Sheet
- Allowed logging of HTTP status code and headers from the Instagram API response
- Added new error codes to identify if the API request returns response in HTML 
  instead of JSON, along with corresponding fixes:

  - `0xf3`: Include not-logged-in in the HTML content
  - `0xf4`: Other HTML responses

- Included the `dist/instance/code.js` file for developers to deploy a Google 
  Sheet project with a standalone script

### Bug Fixes

- Resolved a `TypeError` by validating the object type before using the 
  `String.Split` method [#82]
- Fixed issues related to deleting row without a file name [#90], blank spots in
  the "Saved Filename" column [#84], and the error "Address unavailable:... (code: 0xf1)"
  [#86]

[#82]: https://github.com/chriskyfung/AutoFetcher-IG-Stories-to-GDrive/issues/82
[#84]: https://github.com/chriskyfung/AutoFetcher-IG-Stories-to-GDrive/issues/84
[#86]: https://github.com/chriskyfung/AutoFetcher-IG-Stories-to-GDrive/issues/86
[#90]: https://github.com/chriskyfung/AutoFetcher-IG-Stories-to-GDrive/issues/90

### Refactors

- Simplified npm scripts using `npx clasp`
- Restructured the `fetch()` function and modularized it with a new utility function
- Renamed a parameter inside the `tryGetStories()` function

### Packaging Updates

- Added development dependencies for unit testsing
- Included Jest extension setting for VS Code
- Updated the `docs/_config.yml` file and added Front Matter CMS for VS Code

### Documentation

- Renamed the `LICENSE.md` to `LICENSE.txt` file
- Replaced SVG badges with dynamic JSON badges [#95]
- Reworded the README file, split sections for Advanced Configurations and Release
  Notes, and updated the `CHANGELOG.md` file
- Styled and reworded the Jekyll site files in the `docs` directory
- Added new screenshots and demo video to the GitHub project pages' landing page
- Applied the Google Documentation Guide recommendation to limit lines to 80 
  characters where possible in the README file

[#95]: https://github.com/chriskyfung/AutoFetcher-IG-Stories-to-GDrive/issues/95

### Unit Test

- Added a test suite for the `getFileDetails()` function in `utils.js`

* * *

## Library V8 (build230216a) / 2023-02-16

- Added the destination folder feature by @hidehiro98 [#74]

[#74]: https://github.com/chriskyfung/AutoFetcher-IG-Stories-to-GDrive/pull/74

* * *

## Library V7 (build20230214a) / 2023-02-14

- Bug fixes for issues [#68] and [#70]
- Updated devDependenices
- Bumped `http-cache-semantics` from 4.1.0 to 4.1.1 by @dependabot

[#68]: https://github.com/chriskyfung/AutoFetcher-IG-Stories-to-GDrive/issues/68
[#70]: https://github.com/chriskyfung/AutoFetcher-IG-Stories-to-GDrive/issues/70

* * *

## Library V6 (build221013a) / 2022-10-13

- Fixed an issue [#45] by adding `x-instagram-ajax` to the request header

[#45]: https://github.com/chriskyfung/AutoFetcher-IG-Stories-to-GDrive/issues/45

* * *

## Library V5 (build220904a) / 2022-09-04

- Fixed an issue [#53] related duplicate log entries

[#53]: https://github.com/chriskyfung/AutoFetcher-IG-Stories-to-GDrive/issues/53

* * *

## Library V4 (build220823a) / 2022-08-23

- Addressed changes in the Instagram code that affected previous builds. The 
  `x-asbd-id` and `x-csrftoken` were added to the request header.

* * *

## Build2206b (Library V3) / 2022-06-05

- Bumped `url-parse` from 1.5.3 to 1.5.7 by @dependabot

* * *

## Library V2 (build2112a) / 2021-12-06

New Features

- Saved the filename of downloaded files in Column E on the "Logs" sheet
- Showed the thumbnail preview and open the file on Drive by hovering and
  clicking on a hyperlinked filename
- Enabled the deletion of multiple items and their corresponding files from
  Drive by selecting the checkboxes in Column F and then clicking on "Delete
  Selected" on the "Logs" sheet

* * *

## Library V1 (build2111a) / 2021-11-11

BREAKING CHANGE

- Integrated with Google Sheet and used Clasp (Command Line Apps Script Projects)
  for Apps Script developemnt. This was done to provide a user-friendly GUI for
  configurations and logging. The new version allows for easy setup of 
  subscriptions and user settings, and logs are stored in the same Google Sheet
  file instead of saving separately in multiple Google Doc files.

* * *

## Pre-Release (build2109a) / 2021-09-12 - Fix for Google Drive security update

- Addressed a security update for Google Drive on September 13, 2021 [#17]
- Rebuilt badge update functions with Class DriveApp
- Removed functions dependent on Drive API v3
- Removed unused script files
- Split testing codes to a separated script file

[#17]: https://github.com/chriskyfung/AutoFetcher-IG-Stories-to-GDrive/issues/17

* * *

## Pre-Release (build2012a) / 2020-12-17 - Fix Instagram code changes

- Fixed issues related to Instagram code changes around noon, 7 Dec, UTC by
  replacing the query path with the new Instragram endpoint, updating the header
  for the HTTP request, and updating the lookup of download URLs from the new
  data structure [#11]

[#11]: https://github.com/chriskyfung/AutoFetcher-IG-Stories-to-GDrive/issues/11

* * *

## Build2010 (Pre-Release) / 2020-10-08 - Introduce status badges

- Introduced status badges to display the last tested date and the health status
  resulting by the test pipeline function

* * *

## Build2006b (Pre-Release) / 2020-06-05 - Introduce `test_pipeline()`

- Added a new function `test_pipeline()` to check if there are any stories shown
  from the Instagram accounts of BBCNews, NASA and Medium

* * *

## Pre-Release (build2006a) / 2020-06-02 - Remove third-party fetch source

- Made a breaking change to fetch all story data and files directly from 
  Instagram.com, removing the dependency on the third-party fetch source 
  "storydownloader.net"

* * *

## Pre-Release (build2005a) / 2020-05-14 - Replace third-party fetch source

- Made a breaking change to replace the third-party fetch source "storyig.com" with "storydownloader.net" due to the suspension of the former