---
layout: page-right-sidebar
date: 2024-02-05 03:21:16 +08:00
title: Advanced Configurations
permalink: /advanced-configurations/
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
      table { font-size: .95rem; margin: auto auto 1.5rem auto; }
      th { background-color: #e3edf3; }
      th, td { padding: .05rem 1.5rem; }
      .word-break-wrap { word-break: break-all; }
---

{% include toc.md %}

## 🔁 Enable Auto-Run

You can create a time-driven trigger for your Apps Script with the following steps:

1. Open an Apps Script Editor from your Google Sheet file.
2. On the left, click on **Triggers** ⏰.
3. At the bottom right, select **Add Trigger**.
4. In the dialog, choose the function to run and configure an appropriate time interval (e.g., every 6-12 hours) to run periodically, as the example below.

   {% include picture.html source="raw" img="/images/setup_a_google_app_script_timed_trigger.png" width="640" height="722" alt="Setup a Google App Script Timed Trigger" %}

You can set up the script to run automatically at regular intervals using a time-driven trigger. This way, you don't have to manually run the script every time you want to download the Stories. To do this, you need to:

1. Open your Google Sheet file and go to the **Extensions** menu. Select **Apps Script** to open the script editor.
2. On the left panel of the script editor, select ⏰ **Triggers**.
3. Click on the ➕ **Add trigger** button at the bottom right corner of the screen.
4. In the **Choose which function to run** dropdown, select **run**,which is the main function of the script that downloads the Stories.
5. In the **Select event source** dropdown, select **Time-driven**. This means the script will run based on a time schedule.
6. In the **Select type of time based trigger** dropdown, select **Hour timer**. This means the script will run every few hours.
7. In the **Select hour interval** dropdown, select how often you want the script to run.  You can choose from every hour to every 24 hours (**every 12 hours** is recommended, this means the script will run twice a day).
8. Click on the **Save** button.  
   **Note**: You may be asked to authorize the script to access your Google account. Follow the instructions on the screen to grant the necessary permissions.

{:.note.warning}
> **⚠️ Warning**  
> Please be careful not to overuse the script! You may be logged out and asked to confirm your identity when you try to log in again.

{:.note.tip}
> **💡 Tip**: To avoid this, you should log in to the Instagram website every 2-3 days using Chrome on your PC. This will keep your cookies and session valid for longer.

{:.note.caution}
> **🛑 Caution**  
> If you download too many Stories in a short period of time, Instagram may detect unusual activity from your account and temporarily restrict certain actions.  

That’s it! You have successfully set up a time-driven trigger to run the script automatically at regular intervals. 🎉

You can check the Logs sheet in your Google Sheet file to see the file download activities and the status of the script. If you encounter any errors or issues, please refer to the Troubleshooting section of the documentation.

## 🩺 Set Up Health Check

Instagram may change its API endpoint and data structure without any announcements. Therefore, you may want to set up a health monitoring to check if the script can access and process the Instagram data correctly.

`test_pipeline()` is a function that performs a health check, updates the badges, and sends error report emails. The health check passes if it detects stories from the following Instagram accounts:

| Account | Description |
| :-----: | :---------: |
| bbcnews | BBC News    |
| cnn     | CNN         |
| medium  | Medium      |
| nasa    | NASA        |

These accounts are chosen because they publish stories frequently. If the health check fails, it means there is an error in accessing the API endpoint or interpreting the media URLs from the data.

You can set up a periodic health check with the following steps:

1. Open the Apps Script Editor from your Google Sheet file.
2. Add the following code to a `.gs` file:

   ```js
   function runTestPipeline() {
     const IGSF = IGStoriesToGDrive.getInstance();
     IGSF.test_pipeline();
   }
   ```

3. On the left panel, click **Triggers** ⏰.
4. At the bottom right, click **Add Trigger**.
5. In the dialog, choose `runTestPipeline` as the function to run and configure an appropriate timer.
6. (Optional) In your Google Sheet file, enter an email address for error reporting on the "Settings" sheet.

   {:.note}
   > **Email To**  
     The email address to receive an error message when the execution of `test_pipeline()` returns a "failed" status.

You can also create and display health check badges to show the last execution date and status of the `test_pipeline()` function.

Here is how you do it:

1. Open the page "Settings" in your Google Sheet file.
2. Click the <kbd>➕ Create badges</kbd> button to execute `createBadges()`.
3. Open your Google Drive, you should see the two badge files, `last-tested-date.svg` and `last-tested-status.svg`, are created in the destination folder.

   {% include picture.html alt="Health Check passed, Tested on 2021-11-11" source="raw" img="/images/status-badges.png" width="537" height="70" %}

4. Go back to the spreadsheet, their file IDs should be found on the page **Settings**.

5. Share the SVG files to view publicly and copy their Download URLs if you want to display them on a website or monitoring page.

## 🛑 Deploy As a Web API (deprecated)

{:.note.important}
> **Important**  
> The current version only supports web app deployment if you inject our source code directly into your script.

You can also customize the code and [deploy the script as a web API](https://developers.google.com/apps-script/guides/web). This way, you can trigger the script with HTTP GET requests from other apps.

To protect your web API endpoint, you have to set the username and password. Copy the following code to your project and replace `myUsername` and `myPassword` with your values:

```js
function setUserProperties() {
  PropertiesService
      .getUserProperties()
      .setProperty('AUTH_USERNAME', 'myUsername')
      .setProperty('AUTH_PASSWORD', 'myPassword');
}
```

Run `setUserProperties()` once to store your username and password as secret properties. After that, this code is no longer necessary and you can remove it.

Now you can test your web app deployment by passing a URL with query strings like this,

```html
https://script.google.com/<YOUR_APP_PATH>/exec?usr=<AUTH_USERNAME>&pwd=<AUTH_PASSWORD>&target={"name":"bbcnews","id":"16278726"}
```

You can check the "Logs" sheet to see the file download activities and the status of the script.

If you need any help or have any feedback, you can visit the project GitHub repository or contact me through this website. I hope you enjoy using this tool and saving your favorite Instagram Stories to your Google Drive. 😊
