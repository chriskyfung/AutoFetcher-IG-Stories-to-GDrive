# Changelog - IG Stories to GDrive Fetcher

## Build240205a (Library V9)

### New Features

- Add custom menu and menu items to Google Sheets
- Allow moving downloaded files to other Google Drive folder via Google Sheet
- Allow logging HTTP status code and headers from the Instagram API response
- Add new error codes to identify if the API request returns response in HTML instead of JSON:

  - `0xf3`: Include not-logged-in in the HTML content
  - `0xf4`: Other HTML responses

- Add the `dist/instance/code.js` file for developers to deploy a Google Sheet project with a standalone script

### Bug Fixes

- Fix `TypeError: Cannot read properties of undefined (reading 'split')` [#82]. Validate the object type before using the String.Split method
- Fix issue in deleting row without file name [#90]. Skip the row with missing data when deleting selected log entries
- Fix blank spots in "Saved Filename" column [#84]. Skip log entry when download fails
- Fix `Error: Address unavailable (code: 0xf1)` [#86]. Continue to process the next Instagram user instead of terminating the script execuration immediately

[#82]: https://github.com/chriskyfung/AutoFetcher-IG-Stories-to-GDrive/issues/82
[#84]: https://github.com/chriskyfung/AutoFetcher-IG-Stories-to-GDrive/issues/84
[#86]: https://github.com/chriskyfung/AutoFetcher-IG-Stories-to-GDrive/issues/86
[#90]: https://github.com/chriskyfung/AutoFetcher-IG-Stories-to-GDrive/issues/90

### Refactors

- Use `npx clasp` to simplify the npm scripts in the `package.json` file
- Unnested if-else statements inside the `fetch()` function in `src/fetcher.js`
- Modularize the `fetch()` function with a new utility function called `getFileDetails()` located in the`utils.js` file
- Renamed the `html` parameter to `data` inside the `tryGetStories()` function

### Packaging Updates

- Add `jest@29.7.0`, `@babel/preset-env@7.23.7`,
  `babel-polyfill@6.26.0`, `babel-jest@29.7.0` as development dependencies for developing unit tests
- Add Jest extension setting for VS Code
- Add `npm test` script in `package.json` to run jest with a custom configuration file in `jest.config.js`
- Exclude unit tests from being bundled by rollup
- Update to print the copyright statememt with the current year when being bundle by rollup
- Pin Jekyll version to 3.9.3 and add the webrick gem to the `docs/_config.yml` file
- Add Front Matter CMS for VS Code to improve Jekyll documentation editing

### Documentation

- Rename the `LICENSE.md` to `LICENSE.txt` file
- Replace SVG badges with dynamic JSON badges in the README and `docs/index.md` files [#95]
- Reword the README file to make more consise and readable
- Split the sections for Advanced Configurations and Release Notes to new web pages
- Style and reword the Jekyll site files in the `docs` directory to make GitHub project pages more appealing, informative and readable
- Add new screenshots and demo video to the GitHub project pages' landing page
- Apply the Google Documentation Guide recommendation to limit lines to 80 characters where possible in the README file
- Add the `.clasp.json.template` and the `gascript/appsscript.json` files for helping newcomers to configure the clasp
- Update the `CHANGELOG.md` file

[#95]: https://github.com/chriskyfung/AutoFetcher-IG-Stories-to-GDrive/issues/95

### Unit Test

- Add the `utils.test.js` file, which contains a test suite for the `getFileDetails()` function in `utils.js`, in the `test` folder

## Build230216a (Library V8) / 2023-02-16

- Add destination folder feature by @hidehiro98 in [#74](https://github.com/chriskyfung/AutoFetcher-IG-Stories-to-GDrive/pull/74)

## Build20230214a (Library V7) / 2023-02-14

- Bug Fixes for [#68](https://github.com/chriskyfung/AutoFetcher-IG-Stories-to-GDrive/issues/68) and [#70](https://github.com/chriskyfung/AutoFetcher-IG-Stories-to-GDrive/issues/70)
- Update devDependenices
- Bump http-cache-semantics from 4.1.0 to 4.1.1 by @dependabot

## Build221013a (Library V6) / 2022-10-13

- Fix [#45](https://github.com/chriskyfung/AutoFetcher-IG-Stories-to-GDrive/issues/45) by adding `x-instagram-ajax`` to request header

## Build220904a (Library V5) / 2022-09-04

- Fix [#53](https://github.com/chriskyfung/AutoFetcher-IG-Stories-to-GDrive/issues/53) duplicate log entries

## Build220823a (Library V4) / 2022-08-23

⚠ The previous builds no longer work from Aug 16,2022 due to Instagram code changes. **ASBD identifier** and **CSRF token** are now required for authentication to access the Instagram endpoint. Please update to Build220823a  and make a copy of the new Google Sheet.

- Add `x-asbd-id` and `x-csrftoken` to request header
- Bump terser from 5.14.1 to 5.14.2 by @dependabot

## Build2206b (Library V3) / 2022-06-05

- Bump url-parse from 1.5.3 to 1.5.7 by @dependabot

## Build2112a (Library V2) / 2021-12-06

New Features

- Save the filename of downloaded files in Column E on log sheet page.
- Show the thumbnail preview and open the file on Drive by hovering and clicking on a hyperlinked filename.

  ![Thumbnail preview shown while hovering a saved filename in Column E on log sheet page](/docs/images/hyperlink-to-drive-file_optimized.png)

- Delete multiple items and their corresponding files from Drive by selecting the checkboxes in Column F and then clicking on "Delete Selected" of log sheet page.

  ![Delete selected items from spreadsheet](/docs/images/delete_selected_optimized.png)

## Build2111a (Library V1) / 2021-11-11

BREAKING CHANGE ✨ Integrate with Google Sheet

- Use Clasp (Command Line Apps Script Projects)
- Google sheet integration

Integration of Google Sheet was made to provide a user-friendly GUI for configurations and logging.
The new version allows you to set up your subscriptions and user settings easily and systematically, rather than hard coding them in the Apps Script.
Logs will also store in the same Google Sheet file instead of saving separately in multiple Google Doc files.

## Build2109a (Pre-Release) / 2021-09-12 - Fix for Google Drive Security Update

⚠ Fix [#17](https://github.com/chriskyfung/AutoFetcher-IG-Stories-to-GDrive/issues/17) Google Drive Drive will apply a security update on September 13, 2021.

Major Changes

- Rebuild badge update functions with Class DriveApp
- Remove the functions that were dependent on Drive API v3
- Remove unused script files
- Split testing codes to a separated script file

Please update your Apps Script code to avoid failing access to Google Drive files.

## Build2012a (Pre-Release) / 2020-12-17 - Fix Instagram code changes

⚠ Fix [#11](https://github.com/chriskyfung/AutoFetcher-IG-Stories-to-GDrive/issues/11) Instagram changed code around noon, 7 Dec, UTC.

Major Changes

- Replaced the query path with the new IG endpoint
- Updated the header for the HTTP request
- Updated to look up the download URLs from the new data structure

## Build2010 (Pre-Release) / 2020-10-08 - Introduce status badges

- Introduce Status Badges to display the last tested date and the ig fetch test result

## Build2006b (Pre-Release) / 2020-06-05 - Introduce `test_pipeline()`

- Add new function `test_pipeline()` to check if there are any stories shown from the Instagram accounts of BBCNews, NASA and Medium.

## Build2006a (Pre-Release) / 2020-06-02 - Remove third-party fetch source

BREAKING CHANGE

The version Build2005a has failed since 2020-06-02 due to the suspension of the download source, storydownloader.net.

🚩 Starting from Build2006a, all story data and files will be fetched directly from Instagram.com.

## Build2005a (Pre-Release) / 2020-05-14 - Replace third-party fetch source (2020-05-14)

BREAKING CHANGE

⚠ Due to the suspension of **storyig.com**, the former versions has failed to work since 2020-05-08.
The new version changed to fetch IG stories from **storydownloader.net**.
