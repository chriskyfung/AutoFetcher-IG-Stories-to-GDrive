---
layout: page-right-sidebar
date: 2020-09-29
last_modified_at: 2023-12-27 21:56 +0800
title: IG Stories to GDrive Fetcher 📸➡💾
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
description: Download any user’s IG Stories to GDrive for free. Just need Google Sheets and Apps Script. No coding needed.
---

{% include picture.html img="/images/instagram-to-drive_730x365_o55.jpg" width="730" height="365" alt="Instagram to Google Drive Automation" source="raw" %}

<figure class="status-badge-container shadow-none" style="display:flex;margin-top:1.75em">
  <amp-img layout="fixed" width="100" height="20" src="https://img.shields.io/github/license/chriskyfung/AutoFetcher-IG-Stories-to-GDrive" alt="License AGPL-3.0"></amp-img>
  <amp-img layout="fixed" width="150" height="20" src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fscript.google.com%2Fmacros%2Fs%2FAKfycby9kCiEQTX6KgUoblgurVM2Fy31e3zk2nuKMMNuAdUCYYp3uPGdE_KCwWY_j68oMwpH%2Fexec&query=%24.health&label=health%20check&color=%24.color" alt="Health Status"></amp-img>
  <amp-img layout="fixed" width="150" height="20" src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fscript.google.com%2Fmacros%2Fs%2FAKfycby9kCiEQTX6KgUoblgurVM2Fy31e3zk2nuKMMNuAdUCYYp3uPGdE_KCwWY_j68oMwpH%2Fexec&query=%24.date&label=last%20tested&color=9146ff" alt="Last Tested Date"></amp-img>
</figure>

{:style="font-size:1.25rem;margin-top:2rem"}
_Do you want to save the Instagram Stories of your favorite celebrities, influencers, or friends to your Google Drive?_ This project shows you how to do that with a simple tool that runs on Google Sheets. You just need to enter the Instagram usernames of the people you want to follow, and the tool will automatically download their latest Stories to your Drive. No coding or technical skills required!

{% include toc.md %}

## Introduction

Instagram Stories are ephemeral posts that disappear after 24 hours. They are a popular way for users to share their daily moments, thoughts, and opinions with their followers. However, sometimes you may want to save the Stories of your favorite celebrities, influencers, or friends to your Google Drive for later viewing, analysis, or backup.

This project uses Google Apps Script and Google Sheets to create a cloud-based tool that downloads the most recent Instagram Stories of any user you specify and saves them to your Google Drive. With this tool, you can:

- Enter the Instagram usernames and IDs of the people you want to download Stories from in a Google Sheet.
- Set up a time-driven trigger to run the script automatically at regular intervals.
- Customize the code to suit your needs and use it to access and automate various Google services, such as Gmail, Calendar, Drive, and Sheets.

This project is open-source and free to use. You can find the source code, the Google Sheet template, and the detailed instructions on how to use the tool on this website. You can also check out the project GitHub repository for more information and reporting issues.

## 🛹 How to Use

{:style="background:lightyellow;padding:1rem"}
Starting from Build 2021.11.10, the Apps Script has been redesigned to work with a Google Sheet file as a user interface.

Make a copy of our Google Sheet template to your Google Drive by clicking the button below.

<div style="margin: 1.5rem">
  <a href="https://docs.google.com/spreadsheets/d/1td-CfE5NWHtKSeAMo32rPYQOZC5ydX9BXnXtumzYnL8/copy">
    <amp-img src="https://img.shields.io/badge/Google%20Sheet-34a853?logo=googlesheets&logoColor=white" width="185" height="36" layout="fixed" alt=""></amp-img>
  </a>
</div>

The spreadsheet contains the following three sheets:

1. **Subscriptions**
: A table for you to list the Instagram users and their IDs that you want to subscribe to.

2. **Logs**
: A log sheet of file download activities.

3. **Settings**
: A tabular form for you to fill in the values of options and parameters for running the script.

You can use the Google Sheet file and bound our script to it in the following ways:

| Method                                                                                                        | Descriptions                                                                                                                                                                                      | Remarks                                                                                                          |
| ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Use our shared library                                                                                        | Simply use the copy of our Google Sheet template. The functions to import and use our library are already present in the pre-built script bound to the Google Sheet template.                     | {::nomarkdown}<ul><li>No coding</li><li>Easy version upgrade</li><li>Unable to deploy as a web app</li></ul>{:/} |
| Inject our code into your project                                                                             | Modify the script bounded to your Google Sheet file by copying the source code in `/dist/bundle.js` to a `.gs` file and following the example below to call the functions from the `IGSF` object. | {::nomarkdown}<ul><li>Standalone</li></ul>{:/}                                                                   |
| [Deploy a new library](https://developers.google.com/apps-script/guides/libraries#create_and_share_a_library) | Create a new Apps Script project, copy copying the source code in `/dist/bundle.js` to it, and deploy the project as a library for other scripts.                                                 | {::nomarkdown}<ul><li>Self-hosted</li><li>Reusable code across projects</li></ul>{:/}                            |

### 📩 Set Up Subscriptions

Add the name and ID of your target Instagram user accounts to the table on the page "Subscriptions"

The **Instagram User ID** is necessary to query the data of the target Instagram user from the official web API. You can look up the ID with username by using [the ID finder powered by The Code of a Ninja](https://codeofaninja.com/tools/find-instagram-user-id).

For example, label **bbcnews** as the name in the first column and put its ID **16278726** in the second column to subscribe to the stories from [BBC News's Instagram account](https://www.instagram.com/bbcnews/).

It will fetch the photos and videos from Instagram and upload them to your Google Drive folder if it finds any new stories from the listed accounts when you click on the <kbd>▶Run</kbd> button.

### ⚙️ Configuration Settings

- Google Drive

   - Folder ID (Optional)
   : The ID of a Google Drive folder that serves as the default save location. Media files will be downloaded to the Google Drive root folder if this value is unspecified.

- Instagram

   - x-asbd-id 🆕
  : The value of `x-asbd-id` request-header field sends when you browse `www.instagram.com` with logging in to an account.

   - x-csrftoken 🆕
   : The value of `x-csrftoken` request-header field sends when you browse `www.instagram.com` with logging in to an account.

   - x-ig-app-id
   : The value of `x-ig-app-id` request-header field sends when you browse `www.instagram.com` with logging in to an account.

   - x-ig-www-claim
   : The value of `x-ig-www-claim` request-header field sends when you browse `www.instagram.com` with logging in to an account.

   - x-instagram-ajax ⛔
  : This field has been deprecated from Build 2023.02.14 (= Library v7).

   - cookie
   : The value of `cookie` request-header field sends when you browse `www.instagram.com` with logging in to an account.

- Health Monitoring

   - Badge File IDs (Optional)

      - Tested Date
         : The Google Drive file ID of `last-tested-date.svg` badge, which shows show the last execution date of `test_pipeline()`.

      - Health Status
         : The Google Drive file ID of `last-tested-status.svg` badge, which shows if the last execution of `test_pipeline()` was "passed" or "failed".

   - Error Report (Optional)

      - Email To
         : The email address to receive an error message when the execution of `test_pipeline()` returns a "failed" status.

### 🛠️ Advanced Configurations

In addition to the basic configurations outlined above, you can also enable the following advanced configurations:

1. **Enable Auto-Run (Optional)**: You can set up a time-driven trigger for your Apps Script, enabling automated function execution at specific time intervals.
2. **Set Up Health Monitoring (Optional)**: You can establish health checks to monitor Instagram's API and user login status, update status badges, and send error report.
3. **Deploy As a Web API (Optional)**: You can deploy your Apps Script as a web API to make it accessible to users via a web browser.

For more detailed information on these advanced configurations, please refer to our [Advanced Configurations](./advanced-configurations.md) documentation page.

## 🛡️ About Privacy

1. No sensitive data, like your Instagram username, password, cookies, credentials, and tokens, will be shared with our developers.
2. The Apps Script, which bounds to a Google Sheet file that stores in your Google Drive will only run and be able to access with your Google Account unless you share the file with other users or place it in a shared folder.
3. Self-hosting the code as a standalone project if you want better protection of your data.
4. Do not use our script or shared library if you have any worries about any potential security issues with them.

## ❓ FAQ

{:.faq}

1. How to find the values of `x-asbd-id`, `x-csrftoken`, `x-ig-app-id`, `x-ig-www-claim`, and `cookie`?

   1. Visit `www.instagram.com` and log in to your account using a desktop browser, such as Chrome or Firefox.
   2. Open the DevTool by pressing **F12** or choose **Inspect** from the right-click menu on the page.
   3. Open the **Network** tab, then enter `?reel_ids=` in the filter.
   4. Go back to the Instagram page and click on an IG story.
   5. While the stories are playing on the screen, new items named `?reel_ids=...` will be iteratively added to the list of request items.
   6. Click on one of the fetched items and explore its Headers.
   7. Scroll to the **Request Header** section, grab the value of your **cookie** as in the picture below.

      {% include picture.html alt="Find Instagram Cookie using Chrome DevTools" source="raw" img="/images/find-your-instagram-cookie-with-devtools.png" width="1007" height="730" %}

   8. Also, copy the values of `x-asbd-id`, `x-csrftoken`, `x-ig-app-id` and `x-ig-www-claim` at the bottom of the same section.

2. Receiving an error message <span>'Exception: Request failed for https://i.instagram.com returned code 400.'</span>{:style="color:red;"}

   {:style="font-style:italic;"}
   It happens when your account has not been logged in via the Instagram website for a long time. Instagram will suspend your access token to prevent your account from being hacked. You can fix this issue by opening _instagram.com_ to re-login and verify your account using a web browser.

3. Receiving an error message <span>'Exception: Unexpected error while getting the method or property getFolderById on object DriveApp.'</span>{:style="color:red;"}

   {:style="font-style:italic;"}
   It happens if you put a incorrect `Folder ID` in the Settings.

## 🛟 Get Help

- 💬 [Discussions]({{ site.github.repository_url }}/discussions)
- 🐛 [Bug Reporting]({{ site.github.issues_url }})

## 📋 Release Notes

Please see our [release notes](./release-notes/) for information about the latest updates and changes to our project.

## ⚖️ License

Distributed under the [GNU Affero General Public License v3.0](LICENSE.md)
