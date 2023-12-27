---
layout: page-right-sidebar
date: 2023-12-27 09:59:49 +08:00
title: Advanced Configurations
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

{% include toc.md %}

## 🔁 Enable Auto-Run

You can create a time-driven trigger for your Apps Script with the following steps:

1. Open an Apps Script Editor from your Google Sheet file.
2. On the left, click on **Triggers** ⏰.
3. At the bottom right, select **Add Trigger**.
4. In the dialog, choose the function to run and configure an appropriate time interval (e.g., every 6-12 hours) to run periodically, as the example below.

{% include picture.html source="raw" img="/images/setup_a_google_app_script_timed_trigger.png" width="711" height="802" alt="Setup a Google App Script Timed Trigger" class="ml-li" %}

## 🩺 Set Up Health Monitoring (Optional)

Instagram changes its API endpoint and data structure occasionally without any announcements. Therefore, you may want to set up a health monitoring to check if the script requests and handles the Instagram API data properly.

`test_pipeline()` is a function to perform a health check, trigger badge updates, and error report emails. The health check is considered passing if it detects a presence of stories from the following Instagram accounts,

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

### 📛 Create and Register Your Health Check Badges

1. Open the page "Settings" in your Google Sheet file.
2. Click the <kbd>+ Create badges</kbd> button to execute `createBadges()`.
3. Open your Google Drive, you should see the two badge files, `last-tested-date.svg` and `last-tested-status.svg`, are created in the destination folder.

   {% include picture.html alt="Health Check passed, Tested on 2021-11-11" source="raw" img="/images/status-badges.png" width="537" height="70" %}

4. Go back to the spreadsheet, their file IDs should be found on the page **Settings**.

5. Share the SVG files to view publicly and copy their Download URLs if you want to display them on a website or monitoring page.

## 🚀 Deploy As a Web API (Optional)

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

Run `setUserProperties()` once to store your username and password as secret  properties. After that, this code is no longer necessary and you can remove it.

Now you can test your web app deployment by passing a URL with query strings like this, `https://script.google.com/<YOUR_APP_PATH>/exec?usr=<AUTH_USERNAME>&pwd=<AUTH_PASSWORD>&target={"name":"bbcnews","id":"16278726"}`.
