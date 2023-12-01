# IG Stories to GDrive Fetcher

A Google Apps Script to automatically fetch the latest available IG Stories of a target Instagram user to your Google Drive.

[![clasp](https://img.shields.io/badge/built%20with-clasp-4285f4.svg)](https://github.com/google/clasp) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) ![GitHub](https://img.shields.io/github/license/chriskyfung/AutoFetcher-IG-Stories-to-GDrive)
![Service Status](https://drive.google.com/u/0/uc?id=1BCyF1y8m1LKj8Um77st-3KC5-sTESoUZ&export=download) ![Last Tested Date](https://drive.google.com/u/0/uc?id=1VnSH5wtVOJXd_kmZsCSd3yQSpXTjMr0E&export=download)

## Highlights

🆕 NEW RELEASE ON 2023-02-16 🆕

Thanks for the contributions from [hidehiro98](https://github.com/hidehiro98)❤ We can now save downloaded files from different IG users to separate Google Drive folders 📁.

Please update the Library Version to the latest in your Google Script or make a new copy of the Google Sheet template named V8 or later.

🪂 MINOR UPDATE ON 2023-02-14 🪂

🧹 **Deprecated `x-instagram-ajax` from the _Settings_**. (_* Update Library to V7 or later_)

### Table of Contents

1. [Introduction](#introduction)
2. [How to Use](#how-to-use)
3. [Configuration Settings](#configuration-settings)
4. [Set Up Subscriptions](#set-up-subscriptions)
5. [Set Up Health Monitoring (Optional)](#set-up-health-monitoring-optional)
6. [Deploy As Web App (Optional)](#deploy-as-web-app-optional)
7. [About Privacy](#about-privacy)
8. [Release Notes](#release-notes)
9. [Contributing](#like-my-stuff)
10. [License](#license)

## Introduction

**AutoFetcher-IG-Stories-to-GDrive** is a Google Apps Script that automatically fetches the latest available Instagram stories of a target user to your Google Drive. The script is designed to work with a **Google Sheet** file as a user interface. The spreadsheet contains three sheets: **Subscriptions**, **Logs**, and **Settings**.

- **Subscriptions**: A table for you to list the Instagram users and their IDs that you want to subscribe to.
- **Logs**: A log sheet of file download activities.
- **Settings**: A tabular form for you to fill in the values of options and parameters for running the script.

You can use the Google Sheet file and bind our script to it in the following ways:

- **Use our shared library**: Simply use a copy of our Google Sheet template. The functions to import and use our library are already present in the pre-built script bound to the Google Sheet template. No coding is required, and it’s an easy way to upgrade to a new version.
- **Inject our code into your project**: Modify the script bounded to your Google Sheet file by copying the source code in /dist/bundle.js to a .gs file and following the example below to call the functions from the IGSF object. This method is suitable for standalone deployment.
- **Deploy a new library**: Create a new Apps Script project, copy the source code in /dist/bundle.js to it, and deploy the project as a library for other scripts. This method is suitable for reusable code across projects.

## How to Use

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

## Configuration Settings

### Google Drive

**Folder ID** (*Optional*)
: The ID of a Google Drive folder that serves as the default save location. Media files will be downloaded to the Google Drive root folder if this value is unspecified.

### Instagram

The following request header fields are required to access the Instagram API as a user browses instagram.com with their logged-in account:

**x-asbd-id**
: This is a unique identifier for the user’s session. It is generated by Instagram’s servers and is used to keep track of the user’s activity on the site.

**x-csrftoken**
: This is a security token that is used to prevent cross-site request forgery (CSRF) attacks. It is generated by Instagram’s servers and is sent with every request to verify that the request is legitimate.

**x-ig-app-id**
: This is a unique identifier for the Instagram application that the user is using. It is generated by Instagram’s servers and is used to keep track of the user’s activity on the site.

**x-ig-www-claim**
: This is a security token that is used to prevent cross-site scripting (XSS) attacks. It is generated by Instagram’s servers and is sent with every request to verify that the request is legitimate.

**x-instagram-ajax**
: This is a header that is sent with every request to Instagram’s servers. It is used to indicate that the request was made using AJAX (Asynchronous JavaScript and XML) and to provide additional information about the request.
⛔ *This field has been deprecated from Build 2023.02.14 (= Library v7)*.

**cookie**
: This is a small piece of data that is sent from Instagram’s servers to the user’s browser. It is used to keep track of the user’s activity on the site and to personalize the user’s experience.

⚠ Please note that this information is subject to change and may not be up-to-date.

### Health Monitoring

**Badge File IDs** (*Optional*)

- **Tested Date**
  : The Google Drive file ID of `last-tested-date.svg` badge, which shows the last execution date of `test_pipeline()`.

- **Health Status**
  : The Google Drive file ID of `last-tested-status.svg` badge, which shows if the last execution of `test_pipeline()` was "passed" or "failed".

**Error Report** (*Optional*)

- **Email To**
  : The email address to receive an error message when the execution of `test_pipeline()` returns a "failed" status.

### How to find the values of `x-asbd-id`, `x-csrftoken`, `x-ig-app-id`, `x-ig-www-claim`, and `cookie`

1. Visit `www.instagram.com` and log in to your account using a desktop browser, such as Chrome or Firefox.
2. Open the DevTool by pressing **F12** or choose **Inspect** from the right-click menu on the page.
3. Open the **Network** tab, then enter `?reel_ids=` in the filter.
4. Go back to the Instagram page and click on an IG story.
5. While the stories are playing on the screen, new items named `?reel_ids=...` will be iteratively added to the list of requested items.
6. Click on one of the fetched items and explore its Headers.
7. Scroll to the **Request Header** section, and grab the value of your **cookie** as in the picture below. Find Instagram cookies using Chrome DevTools](/docs/images/find-your-instagram-cookie-with-devtools.png)
8. Also, copy the values of `x-asbd-id`, `x-csrftoken`, `x-ig-app-id` and `x-ig-www-claim` at the bottom of the same section.

## Set Up Subscriptions

Add the name and ID of your target Instagram user accounts to the table on the page "Subscriptions"

The **Instagram User ID** is necessary to query the data of the target Instagram user from the official web API. You can look up the ID with username by using [the ID finder powered by The Code of a Ninja](https://codeofaninja.com/tools/find-instagram-user-id).

For example, label **bbcnews** as the name in the first column and put its ID **16278726** in the second column to subscribe to the stories from [BBC News's Instagram account](https://www.instagram.com/bbcnews/).

It will fetch the photos and videos from Instagram and upload them to your Google Drive folder if it finds any new stories from the listed accounts when you click on the <kbd>▶Run</kbd> button.

## Create Time-driven Trigger for Auto-Run

You can manually create a trigger with the following steps:

1. Open an Apps Script Editor from your Google Sheet file.
2. At the left, click **Triggers** ⏰.
3. At the bottom right, click **Add Trigger**.
4. In the dialog, choose `run` as the function to run and configure an appropriate time interval (6 - 12 hours) to run periodically, as in the example below.

   ![Setup a Google App Script Timed Trigger](/docs/images/setup_a_google_app_script_timed_trigger.png)

## Set Up Health Monitoring (Optional)

Instagram changes its API endpoint and data structure occasionally without any announcements. Therefore, you may want to set up health monitoring to check if the script requests and handles the Instagram API data properly.

`test_pipeline()` is a function to perform a health check, trigger badge updates, and error report emails. The health check is considered passing if it detects the presence of stories from the following Instagram accounts,

- bbcnews,
- cnn,
- medium, and
- nasa.

The health check is likely passing because these accounts publish stories frequently. If a health check fails but not an absence of stories on the Instagram accounts, it points out an error occurring in accessing the API endpoint or interpreting media URLs from the data.

You can set up a periodic health check with the following steps:

1. Open an Apps Script Editor from your Google Sheet file.
2. Add the following code to a `.gs` file:

   ```js
   function runTestPipeline() {
     const IGSF = IGStoriesToGDrive.getInstance();
     IGSF.test_pipeline();
   }
   ```

3. At the left, click **Triggers** ⏰.
4. At the bottom right, click **Add Trigger**.
5. In the dialog, choose `runTestPipeline` as the function to run and configure an appropriate timer.
6. (Optional) In your Google Sheet file, fill in an email address for error reporting on the page "Settings".

### Create and Register your Status Badges

1. Open the page "Settings" in your Google Sheet file.
2. Click the <kbd>+ Create badges</kbd> button to execute `createBadges()`.
3. Open your Google Drive, you should see the two badge files, `last-tested-date.svg` and `last-tested-status.svg`, created in the destination folder.

   ![Status Badges](/docs/images/status-badges.png)

4. Go back to the spreadsheet, their file IDs should be found on the page **Settings**.

5. Share the SVG files to view publicly and copy their Download URLs if you want to display them on a website or monitoring page.

## Deploy As Web App (Optional)

You can [publish the script as a web app](https://developers.google.com/apps-script/guides/web) and trigger the script with HTTP GET requests.

**NOTE**: _The current version only supports web app deployment if you inject our source code directly into your Apps Script project_.

To protect your deployed endpoint, you are required to set a username and password. Copy the following code to your project and replace `myUsername` and `myPassword` with your values:

```js
function setUserProperties() {
  PropertiesService
      .getUserProperties()
      .setProperty('AUTH_USERNAME', 'myUsername')
      .setProperty('AUTH_PASSWORD', 'myPassword');
}
```

Run `setUserProperties()` once to store your username and password as secret properties. After that, this code is no longer necessary and you can remove it.

Now you can test your web app deployment by passing a URL with query strings like this, `https://script.google.com/<YOUR_APP_PATH>/exec?usr=<AUTH_USERNAME>&pwd=<AUTH_PASSWORD>&target={"name":"bbcnews","id":"16278726"}`.

## About Privacy

1. No sensitive data, like your Instagram username, password, cookies, credentials, and tokens, will be shared with our developers.
2. The Apps Script, which bounds to a Google Sheet file that stores in your Google Drive will only run and be able to access with your Google Account unless you share the file with other users or place it in a shared folder.
3. Self-hosting the code as a standalone project if you want better protection of your data.
4. Do not use our script or shared library if you have any worries about any potential security issues with them.

## Release Notes

To see the full list of changes made in each release, please refer to the [CHANGELOG.md](/CHANGELOG.md) file.

## Like my stuff?

Would you like to buy me a coffee? I would really appreciate it if you could support me in the development.

<a href="https://www.buymeacoffee.com/chrisfungky"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" target="_blank"></a>

## License

Distributed under the [GNU Affero General Public License v3.0](LICENSE.md)
