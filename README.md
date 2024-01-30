# IG Stories to GDrive Fetcher

A Google Apps Script to automatically fetch the latest available IG Stories of a target Instagram user to your Google Drive.

[![clasp](https://img.shields.io/badge/built%20with-clasp-4285f4.svg)](https://github.com/google/clasp) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) ![GitHub](https://img.shields.io/github/license/chriskyfung/AutoFetcher-IG-Stories-to-GDrive)
![Service Status](https://drive.google.com/u/0/uc?id=1BCyF1y8m1LKj8Um77st-3KC5-sTESoUZ&export=download) ![Last Tested Date](https://drive.google.com/u/0/uc?id=1VnSH5wtVOJXd_kmZsCSd3yQSpXTjMr0E&export=download)

## 🔔 Highlights

🆕 NEW RELEASE ON 2023-02-16 🆕

Thanks for the contributions from [hidehiro98](https://github.com/hidehiro98)❤ We can now save downloaded files from different IG users to separate Google Drive folders 📁.

Please update the Library Version to the latest in your Google Script or make a new copy of the Google Sheet template named V8 or later.

🪂 MINOR UPDATE ON 2023-02-14 🪂

🧹 **Deprecated `x-instagram-ajax` from the _Settings_**. (_* Update Library to V7 or later_)

### 🗄️ Table of Contents

- [Introduction](#-introduction)
- [How to Use](#-how-to-use)
  - [Set Up Subscriptions](#-set-up-subscriptions)
  - [Configuration Settings](#-configuration-settings)
  - [Advanced Configurations](#-advanced-configurations)
- [About Privacy](#-about-privacy)
- [FAQ](#-faq)
- [Release Notes](#-release-notes)
- [Contributing](#-like-my-stuff)
- [License](#-license)

## 📡 Introduction

**AutoFetcher-IG-Stories-to-GDrive** is a Google Apps Script that automatically fetches the latest available Instagram stories of a target user to your Google Drive. The script is designed to work with a **Google Sheet** file as a user interface. The spreadsheet contains three sheets: **Subscriptions**, **Logs**, and **Settings**.

- **Subscriptions**: A table for you to list the Instagram users and their IDs that you want to subscribe to.
- **Logs**: A log sheet of file download activities.
- **Settings**: A tabular form for you to fill in the values of options and parameters for running the script.

You can use the Google Sheet file and bind our script to it in the following ways:

- **Use our shared library**: Simply use a copy of our Google Sheet template. The functions to import and use our library are already present in the pre-built script bound to the Google Sheet template. No coding is required, and it’s an easy way to upgrade to a new version.
- **Inject our code into your project**: Modify the script bounded to your Google Sheet file by copying the source code in /dist/bundle.js to a .gs file and following the example below to call the functions from the IGSF object. This method is suitable for standalone deployment.
- **Deploy a new library**: Create a new Apps Script project, copy the source code in /dist/bundle.js to it, and deploy the project as a library for other scripts. This method is suitable for reusable code across projects.

## 🛹 How to Use

Starting from Build 2021.11.10, the Apps Script has been redesigned to work with a Google Sheet file as a user interface.

Make a copy of our Google Sheet template to your Google Drive by clicking the button below.

<div style="padding-left: 1.5em">
  <a href="https://docs.google.com/spreadsheets/d/1td-CfE5NWHtKSeAMo32rPYQOZC5ydX9BXnXtumzYnL8/copy">
    <img src="https://img.shields.io/badge/Google%20Sheet-34a853?logo=googlesheets&logoColor=white" height="28" alt="">
  </a>
</div>

The spreadsheet contains the following three sheets:

**Subscriptions**
: A table for you to list the Instagram users and their IDs that you want to subscribe to.

**Logs**
: A log sheet of file download activities.

**Settings**
: A tabular form for you to fill in the values of options and parameters for running the script.

You can use the Google Sheet file and bind our script to it in the following ways:

| Method                                                                                                        | Descriptions                                                                                                                                                                                      | Remarks                                                                                        |
| ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Use our shared library                                                                                        | Simply use the copy of our Google Sheet template. The functions to import and use our library are already present in the pre-built script bound to the Google Sheet template.                     | <ul><li>No coding</li><li>Easy version upgrade</li><li>Unable to deploy as a web app</li></ul> |
| Inject our code into your project                                                                             | Modify the script bounded to your Google Sheet file by copying the source code in `/dist/bundle.js` to a `.gs` file and following the example below to call the functions from the `IGSF` object. | <ul><li>Standalone</li></ul>                                                                   |
| [Deploy a new library](https://developers.google.com/apps-script/guides/libraries#create_and_share_a_library) | Create a new Apps Script project, copy copying the source code in `/dist/bundle.js` to it, and deploy the project as a library for other scripts.                                                 | <ul><li>Self-hosted</li><li>Reusable code across projects</li></ul>                            |

### 📩 Set Up Subscriptions

Add the name and ID of your target Instagram user accounts to the table on the page "Subscriptions"

The **Instagram User ID** is necessary to query the data of the target Instagram user from the official web API. You can look up the ID with username by using [the ID finder powered by The Code of a Ninja](https://codeofaninja.com/tools/find-instagram-user-id).

For example, label **bbcnews** as the name in the first column and put its ID **16278726** in the second column to subscribe to the stories from [BBC News's Instagram account](https://www.instagram.com/bbcnews/).

It will fetch the photos and videos from Instagram and upload them to your Google Drive folder if it finds any new stories from the listed accounts when you click on the <kbd>▶Run</kbd> button.

### ⚙ Configuration Settings

#### Google Drive

`Folder ID`
: (Optional) The ID of a Google Drive folder that serves as the default save location. Media files will be downloaded to the Google Drive root folder if this value is unspecified.

#### Instagram

The following request header fields are required to access the Instagram API as a user browses instagram.com with their logged-in account:

`x-asbd-id`
: This is a unique identifier for the user’s session. It is generated by Instagram’s servers and is used to keep track of the user’s activity on the site.

`x-csrftoken`
: This is a security token that is used to prevent cross-site request forgery (CSRF) attacks. It is generated by Instagram’s servers and is sent with every request to verify that the request is legitimate.

`x-ig-app-id`
: This is a unique identifier for the Instagram application that the user is using. It is generated by Instagram’s servers and is used to keep track of the user’s activity on the site.

`x-ig-www-claim`
: This is a security token that is used to prevent cross-site scripting (XSS) attacks. It is generated by Instagram’s servers and is sent with every request to verify that the request is legitimate.

`x-instagram-ajax`
: This is a header that is sent with every request to Instagram’s servers. It is used to indicate that the request was made using AJAX (Asynchronous JavaScript and XML) and to provide additional information about the request.
⛔ *This field has been deprecated from Build 2023.02.14 (= Library v7)*.

`cookie`
: This is a small piece of data that is sent from Instagram’s servers to the user’s browser. It is used to keep track of the user’s activity on the site and to personalize the user’s experience.

⚠️ Please note that this information is subject to change and may not be up-to-date.

#### Health Monitoring

**Badge File IDs**

- `Tested Date`
  : (Optional) The Google Drive file ID of `last-tested-date.svg` badge, which shows the last execution date of `test_pipeline()`.

- `Health Status`
  : (Optional) The Google Drive file ID of `last-tested-status.svg` badge, which shows if the last execution of `test_pipeline()` was "passed" or "failed".

**Error Report**

- `Email To`
  : (Optional) The email address to receive an error message when the execution of `test_pipeline()` returns a "failed" status.

### 🛠️ Advanced Configurations

In addition to the basic configurations outlined above, you can also enable the following advanced configurations:

1. Enable Auto-Run (Optional): You can set up a time-driven trigger for your Apps Script, enabling automated function execution at specific time intervals.
2. Set Up Health Monitoring (Optional): You can establish health checks to monitor Instagram’s API and user login status, update status badges, and send error report.
3. Deploy As a Web API (Optional): You can deploy your Apps Script as a web API to make it accessible to users via a web browser.

For more detailed information on these advanced configurations, please refer to our [Advanced Configurations](https://chriskyfung.github.io/AutoFetcher-IG-Stories-to-GDrive/advanced-configurations/) documentation page.

## 🛡️ About Privacy

1. No sensitive data, like your Instagram username, password, cookies, credentials, and tokens, will be shared with our developers.
2. The Apps Script, which bounds to a Google Sheet file that stores in your Google Drive will only run and be able to access with your Google Account unless you share the file with other users or place it in a shared folder.
3. Self-hosting the code as a standalone project if you want better protection of your data.
4. Do not use our script or shared library if you have any worries about any potential security issues with them.

## ❓ FAQ

For answers to common questions, refer to our [FAQ section](https://chriskyfung.github.io/AutoFetcher-IG-Stories-to-GDrive/#-faq) on the project webpage. Some of the questions covered include:

1. How to find the values of `x-asbd-id`, `x-csrftoken`, `x-ig-app-id`, `x-ig-www-claim`, and `cookie`?
2. Receiving an error message `Exception: Request failed for https://i.instagram.com returned code 400.`
3. Receiving an error message `Exception: Unexpected error while getting the method or property getFolderById on object DriveApp.`

## 📋 Release Notes

To see the full list of changes made in each release, please refer to the [CHANGELOG.md](/CHANGELOG.md) file.

## 💕 Like my stuff?

Would you like to buy me a coffee? I would really appreciate it if you could support me in the development.

<a href="https://www.buymeacoffee.com/chrisfungky"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" target="_blank"></a>

## ⚖️ License

Distributed under the [GNU Affero General Public License v3.0](LICENSE.md)
