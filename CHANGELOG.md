# Release Notes - IG Stories to GDrive Fetcher

## Latest Release (2022-09-04)

### Build230216a (Library V8)

- Add destination folder feature by @hidehiro98 in [#74](https://github.com/chriskyfung/AutoFetcher-IG-Stories-to-GDrive/pull/74)

## Previous Releases

### Build20230214a (Library V7)

- Bug Fixes for [#68](https://github.com/chriskyfung/AutoFetcher-IG-Stories-to-GDrive/issues/68) and [#70](https://github.com/chriskyfung/AutoFetcher-IG-Stories-to-GDrive/issues/70)
- Update devDependenices
- Bump http-cache-semantics from 4.1.0 to 4.1.1 by @dependabot

### Build221013a (Library V6)

- Fix [#45](https://github.com/chriskyfung/AutoFetcher-IG-Stories-to-GDrive/issues/45) by adding `x-instagram-ajax`` to request header

### Build220904a (Library V5)

- Fix [#53](https://github.com/chriskyfung/AutoFetcher-IG-Stories-to-GDrive/issues/53) duplicate log entries

### Build220823a (Library V4)

⚠ The previous builds no longer work from Aug 16,2022 due to Instagram code changes. **ASBD identifier** and **CSRF token** are now required for authentication to access the Instagram endpoint. Please update to Build220823a  and make a copy of the new Google Sheet.

- Add `x-asbd-id` and `x-csrftoken` to request header
- Bump terser from 5.14.1 to 5.14.2 by @dependabot

### Build2206b (Library V3)

- Bump url-parse from 1.5.3 to 1.5.7 by @dependabot

### Build2112a (Library V2)

#### ✨ New Features

- Save the filename of downloaded files in Column E on log sheet page.
- Show the thumbnail preview and open the file on Drive by hovering and clicking on a hyperlinked filename.

  ![Thumbnail preview shown while hovering a saved filename in Column E on log sheet page](/docs/images/hyperlink-to-drive-file_optimized.png)

- Delete multiple items and their corresponding files from Drive by selecting the checkboxes in Column F and then clicking on "Delete Selected" of log sheet page.

  ![Delete selected items from spreadsheet](/docs/images/delete_selected_optimized.png)

### Build2111a (Library V1)

**MAJOR UPGRADE ✨ Integrate with Google Sheet**

Integration of Google Sheet was made to provide a user-friendly GUI for configurations and logging.
The new version allows you to set up your subscriptions and user settings easily and systematically, rather than hard coding them in the Apps Script.
Logs will also store in the same Google Sheet file instead of saving separately in multiple Google Doc files.

- Use Clasp (Command Line Apps Script Projects)
- Google sheet integration

## Pre-Releases

### Build2109a - Fix for Google Drive Security Update

⚠ Fix [#17](https://github.com/chriskyfung/AutoFetcher-IG-Stories-to-GDrive/issues/17) Google Drive Drive will apply a security update on September 13, 2021.

**MAJOR CHANGES**:

- Rebuild badge update functions with Class DriveApp
- Remove the functions that were dependent on Drive API v3
- Remove unused script files
- Split testing codes to a separated script file

Please update your Apps Script code to avoid failing access to Google Drive files.

### Build2012a - Fix Instagram code changes

⚠ Fix [#11](https://github.com/chriskyfung/AutoFetcher-IG-Stories-to-GDrive/issues/11) Instagram changed code around noon, 7 Dec, UTC.

**MAJOR CHANGES**:

- Replaced the query path with the new IG endpoint
- Updated the header for the HTTP request
- Updated to look up the download URLs from the new data structure

### Build2010 - Introduce status badges

- Introduce Status Badges to display the last tested date and the ig fetch test result

### Build2006b - Introduce `test_pipeline()`

- Add new function `test_pipeline()` to check if there are any stories shown from the Instagram accounts of BBCNews, NASA and Medium.

### Build2006a - Remove third-party fetch source

**Breaking Change**

The version Build2005a has failed since 2020-06-02 due to the suspension of the download source, storydownloader.net.

🚩 Starting from Build2006a, all story data and files will be fetched directly from Instagram.com.

### Build2005a - Replace third-party fetch source (2020-05-14)

**Breaking Change**

⚠ Due to the suspension of **storyig.com**, the former versions has failed to work since 2020-05-08.
The new version changed to fetch IG stories from **storydownloader.net**.
