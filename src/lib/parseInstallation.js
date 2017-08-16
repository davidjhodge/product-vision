// Pulled from http://stackoverflow.com/questions/29683720/react-native-push-notifications-parse

/**
* registers an installation
* data should look like the following:
* {
*  "deviceType": "ios", // or "android"
*  // if android is targeted set
*  // "pushType": "gcm",
*  // "GCMSenderId": "56712320625545", // whatever the later means
*  "deviceToken": "29e32a686fd09d053e1616cb48",
*  "channels": [
*       ""
*   ]
* };
* for more information visit:
* https://www.parse.com/docs/rest#installations-uploading
*/
import config from './config.js';

export function registerInstallation(data) {
    var url = "https://parseapi.back4app.com";
    url += "/1/installations";
    fetch(url, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'X-Parse-Application-Id': config.ParseAppId,
            'X-Parse-REST-API-Key': config.ParseRESTKey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
          throw response;
        }
        console.log(response.json());
        return response.json();
    })
    // .then((result) => {
    //   // Get Result
    //   console.log(JSON.stringify(result));
    // })
    .catch((error) => {
      console.error(error);
    });
};

export function scheduleNotification(message) {
  var url = "https://parseapi.back4app.com";
  url += "/1/push";

  // 10 seconds from now
  const epochTime = new Date(Date.now() + (10*1000));
  const isoString = epochTime.toISOString();

  const data = {
    "channels": ["global"],
    "push_time": isoString,
    "data": {
      "alert": message
    }
  };

  fetch(url, {
      method: 'post',
      headers: {
          'Accept': 'application/json',
          'X-Parse-Application-Id': config.ParseAppId,
          'X-Parse-REST-API-Key': config.ParseRESTKey,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  })
  .then((status) => {
    // Process Status
    console.log(JSON.stringify(status));
  })
  .then((result) => {
    // Get Result
    console.log(JSON.stringify(result));
  })
  .catch((error) => {
    console.error(error);
  });
}
