---
layout: page-right-sidebar
date: 2020-09-29
last_modified_at: 2021-11-11 22:30 +0800
title: AutoFetcher for Saving IG Stories to GDrive <i class="fab fa-instagram"></i><i class="fab fa-google-drive"><i class="fas fa-cloud-download-alt"></i></i>
download: true
css:
    syntax: true
    custom: >-
        .status-badge-container amp-img img {
            object-fit: contain;
        }
        .ml-li {
            margin-left: 1.5rem;
        }
        table { font-size: .95rem; margin-bottom: 1.5rem; }
        table ul { margin-top: 0; }
        tr:nth-child(odd) { backgroud-color: #e3edf3; }
        th, td { padding: .5em; vertical-align: top; }
image:
    path: /images/instagram-to-drive_730x365_o55.jpg
    height: 365
---

{% include picture.html img="/images/instagram-to-drive_730x365_o55.jpg" width="730" height="365" alt="Instagram to Google Drive Automation" source="raw" %}

<figure class="status-badge-container shadow-none" style="display:flex;margin-top:1.75em">
    <amp-img layout="fixed" width="150" height="20" src="https://drive.google.com/u/0/uc?id=1BCyF1y8m1LKj8Um77st-3KC5-sTESoUZ&export=download" alt="Service Status"></amp-img>
    <amp-img layout="fixed" width="150" height="20" src="https://drive.google.com/u/0/uc?id=1VnSH5wtVOJXd_kmZsCSd3yQSpXTjMr0E&export=download" alt="Last tested date"></amp-img>
</figure>

{:style="font-size:1.25rem;margin-top:2rem"}
A Google Apps Script to automatically fetch the latest available IG Stories of a target Instagram user to your Google Drive.

{% include toc.md %}

## How to Use

{:style="background:lightyellow;padding:1rem"}
Starting from Build 2021.11.10, the Apps Script has been redesigned to work with a Google Sheet file as a user interface.

Make a copy of our Google Sheet template to your Google Drive by clicking the button below.

<div style="padding-left:1.5em;margin-bottom:1.5em">
  <a href="https://docs.google.com/spreadsheets/d/1VucEhAUn-mq2Z38QrVGa9GdFrmHY4UCPMCi6mrWRnQI/copy">
    <amp-img src="https://img.shields.io/badge/Google%20Sheet-34a853?logo=googlesheets&logoColor=white" width="288" height="56" layout="fixed" alt=""></amp-img>
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

## Configuration Settings

- Google Drive

   - Folder ID (Optional)
   : The ID of a Google Drive folder that serves as the default save location. Media files will be downloaded to the Google Drive root folder if this value is unspecified.

- Instagram

   - x-ig-app-id
   : The value of `x-ig-app-id` request-header field sends when you browse `www.instagram.com` with logging in to an account.

   - x-ig-www-claim
   : The value of `x-ig-www-claim` request-header field sends when you browse `www.instagram.com` with logging in to an account.

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

### How to find the values of `x-ig-app-id`, `x-ig-www-claim`, and `cookie`

1. Visit `www.instagram.com` and log in to your account using a desktop browser, such as Chrome or Firefox.
2. Open the DevTool by pressing **F12** or choose **Inspect** from the right-click menu on the page.
3. Open the **Network** tab, then enter `?reel_ids=` in the filter.
4. Go back to the Instagram page and click on an IG story.
5. While the stories are playing on the screen, new items named `?reel_ids=...` will be iteratively added to the list of request items.
6. Click on one of the fetched items and explore its Headers.
7. Scroll to the **Request Header** section, grab the value of your **cookie** as in the picture below.

   {% include picture.html alt="Find Instagram Cookie using Chrome DevTools" source="raw" img="/images/find-your-instagram-cookie-with-devtools.png" width="1007" height="730" %}

8. Also, copy the values of `x-ig-app-id` and `x-ig-www-claim` at the bottom of the same section.

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
4. In the dialog, choose `run` as the function to run and configure an appropriate time interval (6 - 12 hours) to run periodically, as the example below.

{% include picture.html source="raw" img="/images/setup_a_google_app_script_timed_trigger.png" width="711" height="802" alt="Setup a Google App Script Timed Trigger" class="ml-li" %}

## Set Up Health Monitoring (Optional)

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

### Create and Register Your Health Check Badges

1. Open the page "Settings" in your Google Sheet file.
2. Click the <kbd>+ Create badges</kbd> button to execute `createBadges()`.
3. Open your Google Drive, you should see the two badge files, `last-tested-date.svg` and `last-tested-status.svg`, are created in the destination folder.

   {% include picture.html alt="Health Check passed, Tested on 2021-11-11" source="raw" img="/images/status-badges.png" width="537" height="70" %}

4. Go back to the spreadsheet, their file IDs should be found on the page **Settings**.

5. Share the SVG files to view publicly and copy their Download URLs if you want to display them on a website or monitoring page.

## Deploy As a Web App (Optional)

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

## About Privacy

1. No sensitive data, like your Instagram username, password, cookies, credentials, and tokens, will be shared with our developers.
2. The Apps Script, which bounds to a Google Sheet file that stores in your Google Drive will only run and be able to access with your Google Account unless you share the file with other users or place it in a shared folder.
3. Self-hosting the code as a standalone project if you want better protection of your data.
4. Do not use our script or shared library if you have any worries about any potential security issues with them.

## History

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

## Get Help

<i class="fas fa-comment-dots"></i> [Discussions]({{ site.github.repository_url }}/discussions) \| <i class="fas fa-bug"></i> [Bug Reporting]({{ site.github.issues_url }})

## License

Distributed under the [GNU Affero General Public License v3.0](LICENSE.md)
