# IG Stories to GDrive Fetcher

[![built with clasp]](https://github.com/google/clasp)
[![code style: prettier]](https://github.com/prettier/prettier)
![license: AGPL-3.0](https://img.shields.io/github/license/chriskyfung/AutoFetcher-IG-Stories-to-GDrive)
![Health Status](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fscript.google.com%2Fmacros%2Fs%2FAKfycbyLpLviO5VJY-AQGKWv5Mqy7jbJqGY3UfQqI56tWLbGIV9k0eI2mos0FgdOU9u2o164%2Fexec&query=%24.health&label=health%20check&color=%24.color) 
![Last Tested Date](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fscript.google.com%2Fmacros%2Fs%2FAKfycbyLpLviO5VJY-AQGKWv5Mqy7jbJqGY3UfQqI56tWLbGIV9k0eI2mos0FgdOU9u2o164%2Fexec&query=%24.date&label=last%20tested&color=9146ff)

[built with clasp]: https://img.shields.io/badge/built%20with-clasp-4285f4.svg
[code style: prettier]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square

A no-code tool that lets you easily save the Instagram Stories of any user to 
your Google Drive. You don’t need to install anything on your computer or 
phone, just use Google Sheets as a cloud tool to fetch the Stories you want.

> [!NOTE]
> **Release On 2023-02-16**  
> Thanks for the contributions from [hidehiro98](https://github.com/hidehiro98)❤
> We can now save downloaded files from different IG users to separate Google 
> Drive folders 📁.

> [!IMPORTANT]
> Please update the Library Version to the latest in your Google Script or make 
> a new copy of the Google Sheet template named **V8** or higher.

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

This project lets you use Google Sheets and Google Apps Script, a platform that 
allows you to create web apps with JavaScript, to make a cloud tool that saves 
the latest Instagram Stories of any user you choose to your Google Drive.

With this tool, you can:

- Type the Instagram usernames and IDs of the people whose Stories you want to 
  save in a Google Sheet.
- Create a time-based trigger to run the script regularly at fixed intervals.
- Modify the code to fit your needs and use it to connect and automate various 
  Google services, such as Gmail, Calendar, Drive, and Sheets.

This project is free and open-source. You can find the source code, the Google 
Sheet template, and the step-by-step instructions on how to use the tool in this 
repository. For more information, please visit the [project website].

[project website]: https://chriskyfung.github.io/AutoFetcher-IG-Stories-to-GDrive/

## 🛹 Usage

> [!NOTE]
> From `build21110a` onwards, the Apps Script has been redesigned to work with a
> Google Sheet file as a user interface.

To get started, click the button below to make a copy of our Google Sheet
template to your Google Drive.

<div style="padding-left: 1.5em">
  <a href="https://docs.google.com/spreadsheets/d/1td-CfE5NWHtKSeAMo32rPYQOZC5ydX9BXnXtumzYnL8/copy">
    <img src="https://img.shields.io/badge/Google%20Sheet-34a853?logo=googlesheets&logoColor=white" 
     height="28" alt="Make Copy">
  </a>
</div>

The spreadsheet consists of the following three sheets:

| Sheet Name    | Description                                                                                       |
| ------------- | ------------------------------------------------------------------------------------------------- |
| Subscriptions | A table where you can list the Instagram users and their IDs that you want to subscribe to.       |
| Logs          | A log sheet that records the file download activities.                                            |
| Settings      | A tabular form where you can fill in the values of options and parameters for running the script. |

You can use the Google Sheet file and bind our script to it in the following
ways:

- **Use our shared library**: The easiest option that requires no coding

  Simply make a copy of our template to your Google Drive. The Google Sheet will
  comes with the pre-built script, which contains the functions to import and
  use our library.

- **Inject our code into your project**: Make a standalone project

  Open the Script editor from your Google Sheet file and edit the script that is
  bound to your Google Sheet file. Copy the code from the `/dist/bundle.js` file
  in our repository and paste it to a `.gs` file in your Script editor. Then,
  follow the example in the [Advanced Configurations] documentation page to get
  and call the functions from the IGSF object.

  [Advanced Configurations]: https://chriskyfung.github.io/AutoFetcher-IG-Stories-to-GDrive/advanced-configurations/

- **Deploy a new library**: Reuse your code across multiple projects

  Create a new Apps Script project and paste the code from `/dist/bundle.js` to
  it. Then, [deploy the project as a library for other scripts][create_and_share_a_library]
  and reference it in your Google Sheet files.

  [create_and_share_a_library]: https://developers.google.com/apps-script/guides/libraries#create_and_share_a_library

### 📩 Set Up Subscriptions

To subscribe to the stories of your favorite Instagram users, you need to add
their names and IDs to the table on the “Subscriptions” sheet.

The **Instagram User ID** is a unique number that identifies each Instagram
user. You can find the ID of any user by using the [ID finder] powered by The
Code of a Ninja.

[ID finder]: https://www.codeofaninja.com/tools/find-instagram-user-id/

> [!TIP]
> For example, to subscribe to the stories from [BBC News’s Instagram account],
> you can enter **bbcnews** as the name in the first column and **16278726** as
> the ID in the second column.

[BBC News’s Instagram account]: https://www.instagram.com/bbcnews/

The script will fetch the photos and videos from Instagram and upload them to
your Google Drive folder whenever you click on the <kbd>▶ Run</kbd> button.

### ⚙️ Configuration Settings

The “Settings” sheet contains a tabular form where you can enter the values of
options and parameters for running the script. Here is a brief explanation of
each setting:

#### Google Drive

- `Folder ID`
  : (Optional) The ID of a Google Drive folder where you want to save the media
  files. If you leave this blank, the files will be downloaded to the root
  folder of your Google Drive.

> [!TIP]
> You can find the ID in the URL of the folder. For example, if the URL of
> the folder is `https://drive.google.com/drive/folders/1a2b3c4d5e6f7g8h9i0j1k2l3m4n?resourcekey=0-XXXXXCt-XXXXX4WRe1aA`,
> then the folder ID is `1a2b3c4d5e6f7g8h9i0j1k2l3m4n`.

#### Instagram

> [!WARNING]
> Please note that this information may change over time and may not be accurate.

To access the Instagram API, the script needs to send some request header fields
that mimic the behavior of a logged-in user on instagram.com. These fields are:

- `x-asbd-id`
  : A unique identifier for the user’s session. It is generated by Instagram’s
  servers and is used to track the user’s activity on the site.

- `x-csrftoken`
  : A security token that is used to prevent cross-site request forgery (CSRF)
  attacks. It is generated by Instagram’s servers and is sent with every
  request to verify that the request is valid.

- `x-ig-app-id`
  : A unique identifier for the Instagram application that the user is using. It
  is generated by Instagram’s servers and is used to track the user’s activity
  on the site.

- `x-ig-www-claim`
  : A security token that is used to prevent cross-site scripting (XSS) attacks.
  It is generated by Instagram’s servers and is sent with every request to
  verify that the request is valid.

- `x-instagram-ajax`
  : A header that is sent with every request to Instagram’s servers. It is used
  to indicate that the request was made using AJAX (Asynchronous JavaScript
  and XML) and to provide additional information about the request.

> [!Caution]
> The `x-instagram-ajax` field has been deprecated from `build230214a`
> (Library v7).

- `cookie`
  : A small piece of data that is sent from Instagram’s servers to the user’s
  browser. It is used to track the user’s activity on the site and to
  personalize the user’s experience.

### 🛠️ Advanced Configurations

In addition to the basic configurations outlined above, you can also enable the
following advanced configurations:

- Set Up Health Monitoring
  : (Optional) You can establish health checks to monitor Instagram’s API and
  user login status, update status badges, and send error report.

  To do this, you need to fill in these fields in the “Settings” sheet:

  **Badge File IDs**

  - `Tested Date`
    : (Optional) The file ID of the `last-tested-date.svg` badge.

  - `Health Status`
    : (Optional) The file ID of the `last-tested-status.svg` badge.

  **Error Report**

  - `Email To`
    : (Optional) The email address that will receive an error message when
    the health check function returns a “failed” status.

- Enable Auto-Run
  : (Optional) You can set up a time-driven trigger for your Apps Script,
  enabling automated function execution at specific time intervals.

- Deploy As a Web API
  : (Optional) You can deploy your Apps Script as a web API to make it
  accessible to users via a web browser.

For more information, please refer to the [Advanced Configurations]
documentation page.

## 🛡️ Privacy and Security

We respect your privacy and data security. Here are some important points to
note:

- No sensitive data, such as your Instagram username, password, cookies,
  credentials, and tokens, will be shared with our developers or any third
  parties. They will only be stored in your Google Sheet file and used by the
  Apps Script to access the Instagram API.

- The Apps Script, which is bound to a Google Sheet file that is stored in your
  Google Drive, will only run and be able to access your data with your Google
  Account. Unless you share the file with other users or place it in a shared
  folder, no one else can access or modify your data.

> [!TIP]
> If you want better protection of your data, you can self-host the code as a
> standalone project. This way, you can have full control over the code and the
> data, and you can customize the script according to your needs.

> [!CAUTION]
> If you have any worries about any potential security issues with our script
> or shared library, please do not use them. We are not responsible for any
> data loss or damage that may occur from using our tool.

## ❓ FAQ

If you have any questions or problems with using our tool, please refer to our
[FAQ section] on the project webpage. We have answered some of the most common
questions, such as:

[FAQ section]: https://chriskyfung.github.io/AutoFetcher-IG-Stories-to-GDrive/#-faq

1. How to find the values of `x-asbd-id`, `x-csrftoken`, `x-ig-app-id`,
   `x-ig-www-claim`, and `cookie`?

2. What to do if you receive an error message `Exception: Request failed for `
   `https://i.instagram.com returned code 400.`?

3. What to do if you receive an error message `Exception: Unexpected error while `
   `getting the method or property getFolderById on object DriveApp.`?

If you cannot find the answer to your question in the FAQ section, please feel
free to contact us via GitHub issues or discussions. We will try our best to
help you. 😊

## 📋 Release Notes

To see the full list of changes made in each release, please refer to the
[CHANGELOG.md](/CHANGELOG.md) file.

## 💕 Like my stuff?

Would you like to buy me a coffee? I would really appreciate it if you could support me in the development.

<a href="https://www.buymeacoffee.com/chrisfungky"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" target="_blank"></a>

## ⚖️ License

This project is distributed under the AGPL-3.0 license. You can use, modify, and distribute this project, as long as you comply with the terms and conditions in the [LICENSE](/LICENSE.md) file.
