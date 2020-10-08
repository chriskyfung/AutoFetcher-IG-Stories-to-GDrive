---
layout: page-right-sidebar
title: AutoFetcher for Saving IG Stories to GDrive <i class="fab fa-instagram"></i><i class="fab fa-google-drive"><i class="fas fa-cloud-download-alt"></i></i>
download: true
css:
    syntax: true
    custom: >-
        .status-badge-container amp-img img {
            object-fit: contain;
        }
---

<figure class="status-badge-container shadow-none" style="display:flex">
    <amp-img layout="fixed" width="150" height="20" src="https://drive.google.com/u/0/uc?id=1VnSH5wtVOJXd_kmZsCSd3yQSpXTjMr0E&export=download" alt="Last tested date"></amp-img> <amp-img layout="fixed" width="150" height="20" src="https://drive.google.com/u/0/uc?id=1BCyF1y8m1LKj8Um77st-3KC5-sTESoUZ&export=download" alt="Service Status"></amp-img>
</figure>

{:style="font-size:1.25rem;margin-top:3rem"}
A Google App Script for deploying a web application that automatically fetches the latest available IG Stories of a target Instagram user to your Google Drive.

## How to Use

1. Create a new App Script project in your Google account, and open the project in the App Script Editor.

2. Copy the scripts under the `gascript` folder to your App Script Editor.

3. Open `code.js` and replace the following variables with your own values, and save the file.

    ```js
    // User-defined Variables
    var g_username = 'your username for this app';
    var g_password = 'your password for this app';
    var gdrive_id = 'your google drive folder id for storing the downloaded files';
    var lastlog_id = '<your google doc ID for storing last tracking log>';
    var historylog_id = '<your google doc ID for storing history log>';
    var crashReportEmail = '<your email for receiving crash report>';

    // New variables in Build 2020.10.08
    var fetchContentLog_id = '<your google doc ID for storing fetched Instgram JSON     Data';
    var statusBadge_id = '<your google drive file ID of Test Status Badge>';

    // New variables in Build 2020.06.02
    var fetchContentLog_id = '<your google doc ID for storing fetched Instgram JSON     Data';
    var query_hash = '<your IG query_hash for story look up>';
    var COOKIE = 'IG Cookie in your web browser';
    ```

4. Deploy the updated App Script project as a web application, and authorize the app to read and write files in your Google Drive.

5. Copy the URL of the deployed web application, like `https://script.google.com/<your-app-path>/exec?`

Now you can test the application by passing a url like this, `https://script.google.com/<your-app-path>/exec?usr=<app_username>&pwd=<app_password>&target={"target":{"name":"nasa","id":"528817151"}}`.

`ig_user_id` is necessary to query the data of the target Instagram user from the official web API. You can obtain the ID with the username by using [the ID finder powered by The Code of a Ninja](https://codeofaninja.com/tools/find-instagram-user-id). The application will track and download the photos and videos to your Google Drive folder, if it finds any new IG stories from the target Instagram account.

## Configure an Auto-Run

1. At the end of the file `code.js`, make a copy the function `try_get()` and give it a new unique function name. and replace the value of the `target` field to the Instagram account you're willing to fetch.

2. Go to your Google Developer Hub, and create a new trigger for this project.

3. In the Add Trigger Dialog, choose the function name that you previously copied. Also, select an appropriate time interval to call the function, as the example below.

<!--{:style="margin-left:2.5rem"}
![Setup a Google App Script Timed Trigger]({{site.url}}{{ site.baseurl }}/docs/images/setup_a_google_app_script_timed_trigger.png){:width="737" height="811"}-->

<amp-img width="737" height="811" layout="responsive" src="{{site.url}}{{ site.baseurl }}/docs/images/setup_a_google_app_script_timed_trigger.png" alt="Setup a Google App Script Timed Trigger" style="margin-left:2.5rem"></amp-img>

## Configure Crash Report

For Build 2020.06.05, a new function called `test_pipeline()` has been added to check if there are any stories shown from the Instagram accounts of BBCNews, NASA and Medium. Since they publish stories frequently, there should be always one or more items available. The function will send an email to your specified email address if it fetches no URLs to download.

1. Enter your email to `historylog_id` in line 7.

2. Go to your Google Developer Hub, and create a new trigger for this project.

3. In the Add Trigger Dialog, choose **test_pipeline** and select Daily timer.

{:style="background:skyblue;margin-bottom:0;padding:1rem"}

## History

🆕 **REMOVE THIRD-PARTY DEPENDENCIES ON Build 2020.06.05** 🆕

Start from the version Build 2020.06.05, all story data and files will be fetched directly from Instagram.com.

{:style="background:limegreen;margin-bottom:0;padding:1rem"}
🔔 **LAST UPDATE ON 2020-06-05 T11:50:00 +08:00** 🔔

{:style="background:lightgreen;padding:1rem"}
The version Build 2020.05.14 works again as storydownloader.net resumed their service on 2020-06-05.

{:style="background:gold;margin-bottom:0;padding:1rem"}
🚧 **AN IMPORTANT UPDATE ON 2020-06-02 T16:00:00 +08:00** 🚧

{:style="background:lightyellow;padding:1rem"}
The version Build 2020.05.14 failed on 2020-06-02 due to the suspension of the download source, storydownloader.net. The data of IG stories has been changed to fetch from the official site in the new version Build 2020.06.02.

## License

{:style="background:lightblue;padding:1rem"}
GNU Affero General Public License v3.0
