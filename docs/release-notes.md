---
layout: page-right-sidebar
date: 2024-02-05 03:20:32 +08:00
title: Release Notes
permalink: /release-notes/
download: true
css:
  syntax: true
  custom: |-
    .note { font-style: normal; color: #2f81f7; border-left-color: #1f6feb; }
    .note::first-line { font-family: sans-serif }
    .tip { color: #238636; border-left-color: #238636; }
    .important { color: #a371f7; border-left-color: #8957e5; }
    .warning { color: #d29922; border-left-color: #9e6a03; }
    .caution { color: #f85149; border-left-color: #da3633; }
image:
  path: /images/instagram-to-drive_730x365_o55.jpg
  height: 365
  hide: true
---

{:.note.tip}
> ## Library V10 (2024-03-15)

**Improved Reliability and Accuracy**

* Standardized log date and time format for enhanced clarity and consistency.
* Resolved an error related to file retrieval, ensuring seamless operation.

**Updated Dependencies for Enhanced Security and Functionality**

* Boosted security and functionality with the latest versions of jekyll, nokogiri, and other dependencies.

**Enhanced Documentation**

* Corrected website links for better navigation.
* Updated API endpoint URLs for accurate information.
* Refined formatting for clearer and easier-to-read documentation.

**Automated Versioning and Security Scans**

* Automated version updates through Dependabot, ensuring timely updates for enhanced security.
* Upgraded GitHub actions for improved code quality and vulnerability detection.

{:.note.tip}
> ## Library V9 (2024-02-05)

To use the latest features and bug fixes, please update the Library Version of
your Google Script to the latest one or create a new copy of the Google Sheet
template with the name V9 or higher.

🔧 Manual upgrade from V8 to V9

If you prefer to keep your existing Google Sheet file, you can manually update
the Apps Script by following these steps:

1. Open the Apps Script editor from your Google Sheet file.
2. In the left panel, click on the **IGStoriesToGDrive** library under the **Libraries** section.
3. From the **Version** dropdown, select **9** and click **Save**.
4. Delete the `ui.gs` file from the project files.
5. Open the `code.gs` file and add the following code to enable the new features.

   ```js
   function moveSelected() {
     const IGSF = IGStoriesToGDriveDEV.getInstance();
     IGSF.moveSelected();
   }
 
   function onOpen() {
     const IGSF = IGStoriesToGDriveDEV.getInstance();
     IGSF.initUi();
   }
   ```

✨ New Features

- Add custom menu and menu items to Google Sheets

  {% include picture.html alt="Screenshot of the custom menu" img="images/custom-menu_612x214.png" width="551" height="193" source="raw" %}

- Allow moving downloaded files to other Google Drive folder via Google Sheet
- Allow logging HTTP status code and headers from the Instagram API response
- Add new error codes to identify if the API request returns response in HTML instead of JSON:

  - `0xf3`: Include not-logged-in in the HTML content
  - `0xf4`: Other HTML responses

🐛 Bug Fixes

- Fix `TypeError: Cannot read properties of undefined (reading 'split')` [#82]. Validate the object type before using the String.Split method
- Fix issue in deleting row without file name [#90]. Skip the row with missing data when deleting selected log entries
- Fix blank spots in "Saved Filename" column [#84]. Skip log entry when download fails
- Fix `Error: Address unavailable (code: 0xf1)` [#86]. Continue to process the next Instagram user instead of terminating the script execuration immediately

[#82]: https://github.com/chriskyfung/AutoFetcher-IG-Stories-to-GDrive/issues/82
[#84]: https://github.com/chriskyfung/AutoFetcher-IG-Stories-to-GDrive/issues/84
[#86]: https://github.com/chriskyfung/AutoFetcher-IG-Stories-to-GDrive/issues/86
[#90]: https://github.com/chriskyfung/AutoFetcher-IG-Stories-to-GDrive/issues/90

{:.note.tip}
> ## Library V8 (2023-02-16)

✨ New Feature

- Save downloaded files to seperate folders based on their IG username. 📁

👨‍💻 New Contributor

- [@hidehiro98]

[@hidehiro98]: https://github.com/hidehiro98

{:.note.warning}
> ## Library V7 (2023-02-14)

🗑 Deprecated

- Removed `x-instagram-ajax` from the "Settings" sheet.

**Note**: Please update the Library Version to the latest in your Google Script or make a new copy of the Google Sheet template named with V7 or later.

{:.note}
> ## Library V5 (2022-09-04)

🐛 Bug Fix

- Fixed duplicated log entries ([#53]).

[#53]: https://github.com/chriskyfung/AutoFetcher-IG-Stories-to-GDrive/issues/53

{:.note.caution}
> ## Library V4 (2022-08-23)

💥 Breaking Change

- The previous builds no longer work from Aug 16,2022 due to Instagram code changes. An **ASBD identifier** and a **CSRF token** are now required for authentication to access the Instagram endpoint.

  **Note**: Please update to `build220823a` and make a copy of the new Google Sheet.

{:.note.tip}
> ## Library V2 (2021-12-06)

✨ New Features

- Save the filename of downloaded files in Column E in the "Logs" sheet.
- Show the thumbnail preview and open the file on Drive by hovering and clicking on a hyperlinked filename.

   {% include picture.html source="raw" img="/images/hyperlink-to-drive-file_optimized.png" width="430" height="319" alt="Thumbnail preview shown while hovering a saved filename in Column E on log sheet page" %}

- Delete multiple items and their corresponding files from Drive by selecting the checkboxes in Column F and then clicking on "Delete Selected" of log sheet page.

  {% include picture.html source="raw" img="/images/delete_selected_optimized.png" width="260" height="188" alt="Delete selected items from spreadsheet" %}

{:.note.tip}
> ## Library V1 (2021-11-11)

- **Integrate with Google Sheet**

  You can configure your subscriptions and script settings more easily and systematically, rather than hard coding them in the Google Apps Script. Additionally, the download activities will be stored in the spreadsheet file, allowing you to view and manage the settings and activity logs using Google Sheets as a GUI.

## 📋 Changelog

To see the full list of changes made in each release, please refer to the
[CHANGELOG.md] file in the project repository.

[CHANGELOG.md]: {{ site.github.repository_url }}/blob/master/CHANGELOG.md "Open on GitHub"
