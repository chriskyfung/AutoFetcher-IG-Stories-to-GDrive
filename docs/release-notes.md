---
layout: page-right-sidebar
date: 2023-12-27 09:59:13 +08:00
title: Release Notes
download: true
css:
    syntax: true
    custom: |-
        .status-badge-container amp-img img {
            object-fit: contain;
        } .ml-li {
            margin-left: 1.5rem;
        } table { font-size: .95rem; margin-bottom: 1.5rem; } table ul { margin-top: 0; } tr:nth-child(odd) { backgroud-color: #e3edf3; } th, td { padding: .5em; vertical-align: top; } .faq>li>:first-child { background-color:bisque; padding: 1rem 0 1rem 2rem; margin-left: -1.5rem; }
image:
   path: /images/instagram-to-drive_730x365_o55.jpg
   height: 365
   hide: true
---

{:style="background:skyblue;margin-bottom:0;padding:1rem"}
✨ **NEW FEATURE RELEASED ON 2023-02-16** ✨

📁 Save downloaded files to seperate folders based on their IG username

{:style="background:limegreen;margin-bottom:0;padding:1rem"}
🚧 **MINOR UPDATE ON 2023-02-14** 🚧

🧹 **Deprecated `x-instagram-ajax` from the _Settings_**.

Please update the Library Version to the latest in your Google Script or make a new copy of the Google Sheet template named with V7 or later.

{:style="background:limegreen;margin-bottom:0;padding:1rem"}
🚧 **RELEASE ON 2022-09-04** 🚧

Fixed the bug that caused ([duplicated log entries](https://github.com/chriskyfung/AutoFetcher-IG-Stories-to-GDrive/issues/53)).

{:style="background:gold;margin-bottom:0;padding:1rem"}
🚧 **AN IMPORTANT UPDATE ON 2021-09-12** 🚧

{:style="background:lightyellow;padding:1rem"}
The previous builds no longer work from Aug 16,2022 due to Instagram code changes. An **ASBD identifier** and a **CSRF token** are now required for authentication to access the Instagram endpoint. Please update to Build 2022.08.23, and make a copy of the new Google Sheet.

{:style="background:skyblue;margin-bottom:0;padding:1rem"}
✨ **NEW FEATURES RELEASED ON 2021-12-06** ✨

- Save the filename of downloaded files in Column E on log sheet page.
- Show the thumbnail preview and open the file on Drive by hovering and clicking on a hyperlinked filename.

   {% include picture.html source="raw" img="/images/hyperlink-to-drive-file_optimized.png" width="430" height="319" alt="Thumbnail preview shown while hovering a saved filename in Column E on log sheet page" %}

- Delete multiple items and their corresponding files from Drive by selecting the checkboxes in Column F and then clicking on "Delete Selected" of log sheet page.

  {% include picture.html source="raw" img="/images/delete_selected_optimized.png" width="260" height="188" alt="Delete selected items from spreadsheet" %}

{:style="background:gold;margin-bottom:0;padding:1rem"}
🚧 **AN IMPORTANT UPDATE ON 2021-09-12** 🚧

{:style="background:lightyellow;padding:1rem"}
([#17](https://github.com/chriskyfung/AutoFetcher-IG-Stories-to-GDrive/issues/17 "GitHub Issues")) Google Drive Drive will apply a security update on September 13, 2021. Please update your Apps Script code to avoid failing access to Google Drive files.

{:style="background:gold;margin-bottom:0;padding:1rem"}
🚧 **AN IMPORTANT UPDATE ON 2020-12-09** 🚧

{:style="background:lightyellow;padding:1rem"}
([#11](https://github.com/chriskyfung/AutoFetcher-IG-Stories-to-GDrive/issues/11 "GitHub Issues")) Instagram changed code around noon, 7 Dec, UTC. Please update to Build 2020.12.09.

{:style="background:skyblue;margin-bottom:0;padding:1rem"}
🆕 **REMOVE THIRD-PARTY DEPENDENCIES IN Build 2020.06.05** 🆕

{:style="background:lightblue;padding:1rem"}
Start from the version Build 2020.06.05, all story data and files will be fetched directly from Instagram.com.

{:style="background:limegreen;margin-bottom:0;padding:1rem"}
🔔 **LAST UPDATE ON 2020-06-05** 🔔

{:style="background:lightgreen;padding:1rem"}
The version Build 2020.05.14 works again as storydownloader.net resumed their service on 2020-06-05.

{:style="background:gold;margin-bottom:0;padding:1rem"}
🚧 **AN IMPORTANT UPDATE ON 2020-06-02** 🚧

{:style="background:lightyellow;padding:1rem"}
The version Build 2020.05.14 failed on 2020-06-02 due to the suspension of the download source, storydownloader.net. The data of IG stories has been changed to fetch from the official site in the new version Build 2020.06.02.
