---
layout: page-right-sidebar
date: 2020-09-29
last_modified_at: 2023-12-27 21:56 +0800
title: IG Stories to GDrive Fetcher 📸➡💾
download: true
amp:
   youtube: true
css:
   syntax: true
   custom: |-
      .status-badge-container amp-img img { object-fit: contain; }
      p.hook { font-size: 1.15rem; margin:2rem 0 .5rem; }
      p.hook::first-letter { font-size: 1.5rem; }
      p.headline { font-size: 1.17rem; margin-left: 1.67rem; text-indent: .07rem }
      .fa-google-drive { color: #4688F4; }
      .fa-instagram { color: #d62976; }
      .fa-heartbeat { color: #fa9573; }
      .img-button *, .img-button *:hover { transition:all .75s ease-in-out; }
      .img-button a { box-shadow: 0 0 3px 2px #ffe51f; margin: 1.5rem; }
      .img-button a:hover { box-shadow: 0 -5px 16px 4px #ffdf1f; }
      .img-button a:hover > * { box-shadow: 0 -1px 24px 5px #ffed49; }
      .note { font-style: normal; color: #2f81f7; border-left-color: #1f6feb; }
      .note::first-line { font-family: sans-serif }
      .tip { color: #238636; border-left-color: #238636; }
      .caution { color: #f85149; border-left-color: #da3633; }
      .ml-2 { margin-left: 2rem; }
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

{:.hook}
_Do you want to save the Instagram Stories of your favorite celebrities, influencers, or friends to your Google Drive <i class="fab fa-google-drive"></i> ?_

<i class="fab fa-instagram"></i> **IG Stories to GDrive Fetcher** lets you easily save Instagram Stories of anyone to
your Google Drive simply using Google Sheets, You don’t need to install anything on your computer or phone.
{:.headline}

{% include toc.md %}

## 👀 Introduction

Do you love watching 📸 Instagram Stories? 😍 They are a great way to see what your favorite people are up to, whether
they are celebrities, influencers, or friends. But what if you want to keep some of the Stories for later, or back them
up in case they disappear?

**IG Stories to GDrive Fetcher** is the perfect solution for you. It is a free and open-source tool that lets you download
any Instagram Stories you want and save them to your Google Drive. 🚀 All you need is a Google Sheet and a few minutes to
set it up.

With this tool, you can:

- **Save Stories** of any Instagram user to your Google Drive 📂
- **Schedule downloads** to run automatically at any time you want 🕖
- **Customize the code** to fit your needs and use it to connect with other Google services, such as Gmail, Calendar, Drive, and Sheets 👨‍💻

You can get the Google Sheet template, and the step-by-step guide on how to use the tool on this website. You can also
visit the [project repository] for more details, the source code and feedback.

[project repository]: {{ site.github.repository_url }} "Open on GitHub"

**Get started now** and never miss an Instagram Story again! 💯

## 🚀 Get Started

To use this tool, you need to make a copy of our Google Sheet template to your Google Drive. The Google Sheet comes with
the pre-built script, which contains the functions to import and use our library. 🚀

### Make a Copy

Make a copy of our template to your Google Drive by clicking the button below.

<div class="img-button">
  <a href="https://docs.google.com/spreadsheets/d/1td-CfE5NWHtKSeAMo32rPYQOZC5ydX9BXnXtumzYnL8/copy">
    <amp-img src="https://img.shields.io/badge/Google%20Sheet-34a853?logo=googlesheets&logoColor=white" width="185" height="36" layout="fixed" alt="Make Copy"></amp-img>
  </a>
</div>

### Explore the Sheets

The spreadsheet consists of the following three sheets:

1. **Subscriptions**: A table where you can list the Instagram users and their IDs that you want to subscribe to. 👀

2. **Logs**: A log sheet that records the file download. 📝

3. **Settings**: A tabular form where you can fill in the values of options and parameters for running the script. ⚙️

Please follow the instructions below to set up your Google Sheet.

### Set Up Subscriptions

To subscribe to the Stories of your favorite Instagram users, you need to:

- Add their names and IDs to the table on the "Subscriptions" sheet. 📝

  {:.note.tip}
  > **💡 Tip**  
  > For example, to subscribe to the Stories from [BBC News]’s Instagram account,
  > you can enter **bbcnews** as the name in the first column and **16278726** as
  > the ID in the second column.

  {% include picture.html alt="Screenshot of the Subscription sheet" img="images/subscription-sheet.png" width="418" height="193" source="raw" %}

- Use [this online tool][User ID finder] powered by _The Code of a Ninja_ to find the ID of any user. 🔎

  {% include picture.html alt="Screenshot of the Instagram User ID Finder" img="images/instagram-user-id-finder_565x341.png" width="418" height="252" source="raw" %}

- Click on the <kbd>▶Run</kbd> button to fetch the photos and videos from Instagram and upload them to your Google Drive folder. 🚀  

  {% include youtube.html id="ioeAkGVeqmA" title="Demo | IG Stories to GDrive Fetcher" indent="  " %}

[User ID finder]: https://www.codeofaninja.com/tools/find-instagram-user-id/
[BBC News]: https://www.instagram.com/bbcnews/

### Configuration Settings

To use this tool, you need to fill in the values of the options and parameters in the "Settings" sheet.

**<i class="fab fa-google-drive"></i> Google Drive**

- **Folder ID**: (Optional) The ID of a Google Drive folder that serves as the default save location. Media files will
  be downloaded to the Google Drive root folder if this value is unspecified.

**<i class="fab fa-instagram"></i> Instagram**

These settings are related to your Instagram account and the request headers that are required to fetch the Stories.

{% include picture.html alt="Screenshot of the Settings sheet" class="ml-2" img="images/settings-sheet_627x610.png" width="501" height="488" source="raw" %}

- **x-asbd-id**: A unique identifier for the user’s session. It is generated by Instagram’s servers and is used to track
  the user’s activity on the site.
- **x-csrftoken**: A security token that is used to prevent cross-site request forgery (CSRF) attacks. It is generated
  by Instagram’s servers and is sent with every request to verify that the request is valid.
- **x-ig-app-id**: A unique identifier for the Instagram application that the user is using. It is generated by Instagram’s
  servers and is used to track the user’s activity on the site.
- **x-ig-www-claim**: A security token that is used to prevent cross-site scripting (XSS) attacks. It is generated by
  Instagram’s servers and is sent with every request to verify that the request is valid.
- **x-instagram-ajax** ⛔: This field has been deprecated from `build230214a` (Library v7).
- **cookie**: A small piece of data that is sent from Instagram’s servers to the user’s browser. It is used to track the
  user’s activity on the site and to personalize the user’s experience.


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
