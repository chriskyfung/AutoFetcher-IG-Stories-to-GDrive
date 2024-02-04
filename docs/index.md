---
layout: page-right-sidebar
date: 2024-02-05 03:20:49 +08:00
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
      .word-break-wrap { word-break: break-all; }
image:
   path: /images/instagram-to-drive_730x365_o55.jpg
   height: 365
description: Download any user’s IG Stories to GDrive for free. Just need Google Sheets and Apps Script. No coding needed.
slug: " "
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

## 🛠️ Advanced Configurations

In addition to the basic settings outlined above, you can further configure the script for the features below:

- **Set Up Health Check**: (Optional) You can establish health checks to monitor Instagram’s API and user login
  status, update status badges, and send error report.

- **Enable Auto-Run**: (Optional) You can set up a time-driven trigger for our Apps Script, enabling automated function
  execution at specific time intervals.

For more information, please refer to the [Advanced Configurations] page.

[Advanced Configurations]: ./advanced-configurations.md

## 🛡️ Privacy and Security

We respect your privacy and data security. Here are some important points to
note:

{:.note}
> **📝 Note**  
  No sensitive data, such as your Instagram username, password, cookies, credentials, and tokens, will be shared with
  our developers or any third parties. They will only be stored in your Google Sheet file and used by the Apps Script
  to access the Instagram API.

{:.note}
> The Apps Script, which is bound to a Google Sheet file that is stored in your Google Drive, will only run and be able
  to access your data with your Google Account. Unless you share the file with other users or place it in a shared folder,
  no one else can access or modify your data.

{:.note.tip}
> **💡 Tip**  
  If you want better protection of your data, you can self-host the code as a standalone project. This way, you can have
  full control over the code and the data, and you can customize the script according to your needs.

{:.note.caution}
> **⚠ Caution**  
  If you have any worries about any potential security issues with our script or shared library, please do not use them.
  We are not responsible for any data loss or damage that may occur from using our tool.

## ❓ FAQ

{:.note.faq}
> **Q1**:  
> How to get the required Instagram headers and cookie for the tool?

To use the tool, you need to provide some information from your Instagram account, such as `x-asbd-id`, `x-csrftoken`,
`x-ig-app-id`, `x-ig-www-claim`, and `cookie`. These are used to authenticate your requests and access the IG stories.
Here are the steps to get them:

1. Go to <www.instagram.com>  on your desktop browser (Chrome recommended) and sign in with your username and password.
2. Right-click anywhere on the page and select **Inspect** (or press <kbd>F12</kbd>) to open the developer tools.
3. Click on the **Network** tab and type `?reel_ids=` in the filter box.
4. On the Instagram page, click on any IG story to play it.
5. You will see some requests with `?reel_ids=...` in their names appear in the network tab. Select any one of them and
   look at the **Headers** section.
6. Under the Request Headers subsection, you will find the values of `x-asbd-id`, `x-csrftoken`, `x-ig-app-id` and
   `x-ig-www-claim`. Copy them and paste them in the corresponding fields in the tool.
7. Also, copy the value of the `cookie` header and paste it in the tool. It should look something like this:

   {% include picture.html alt="Find Instagram Cookie using Chrome DevTools" img="/images/find-your-instagram-cookie-with-devtools.png" width="1007" height="730" source="raw" %}

{:.note.faq}
> **Q2**:  
> What to do if you receive an error message `Exception: Request failed for https://i.instagram.com returned code 400.` ?

This error means that Instagram has blocked your access token because you have not logged in to the website for a long
time. This is a security measure to protect your account from unauthorized access.

To resolve this error, you need to visit <www.instagram.com> on your web browser and sign in to your account again. You
may also need to verify your account with a code or a captcha.

{:.note.faq}
> **Q3**:  
> What to do if you receive an error message `Exception: Unexpected error while getting the method or property getFolderById on object DriveApp.` ?

This error means that you have entered an invalid **Folder ID** in the "Settings" sheet. The **Folder ID** is a unique
identifier for a folder in your Google Drive where the tool will save the downloaded IG stories.

To fix this error, you need to make sure that you have entered the correct **Folder ID** in the "Settings" sheet. You
can find the **Folder ID** by opening the folder in your Google Drive and looking at the URL. It should be a long
string of letters and numbers after the `folders/` part.

For example, in this URL:
`https://drive.google.com/drive/folders/1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7`{:.word-break-wrap}
The Folder ID is `1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7`{:.word-break-wrap}. Copy and paste it in the Settings and try again.

## 👨‍💻 Help and Support

If you need any help or have any feedback, you can:

- Report any bugs or issues that you encounter while using the tool. 🐛
- Join the discussions to share your feedback, ideas, or questions with other users and developers. 💬

Visit the GitHub [issues] or [discussions] page to get help and support.

[discussions]: {{ site.github.repository_url }}/discussions "Open on GitHub"
[issues]: {{ site.github.issues_url }} "Open on GitHub"

## 📋 Updates and Changes

To see the full list of changes made in each release, you can:

- Read the release notes to learn about the new features, improvements, and bug fixes. 📋
- Check out the source code to see how the tool works and how you can contribute. 💻
- Follow the project on GitHub to get notified of the latest updates and releases. 🚀

Read the [Release Notes] page or visit the [project repository] to see the updates and changes.

[Release Notes]: ./release-notes/
[project repository]: {{ site.github.repository_url }} "Open on GitHub"

## ⚖️ License and Terms

This tool is distributed under the **GNU Affero General Public License v3.0**, which means that:

- You can use, copy, modify, and distribute the tool for free. 🆓
- You must disclose the source code and any modifications that you make. 📄
- You must state the changes that you make to the tool. 📝
- You must license your modified versions under the same license as the original tool. 📜

Read the **[LICENSE]** file to learn more about the license and terms of use.

[license]: {{ site.github.repository_url }}/blob/master/LICENSE.txt "Open on GitHub"
