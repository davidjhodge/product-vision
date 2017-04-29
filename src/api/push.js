var Parse = require('parse/react-native');

const PARSE_APP_ID = "pqjygx3eAiWlqKGyvD58yDNOhmnb2URbAtjIAajj";
const PARSE_REST_KEY = "DVZD8q4Rk6ztvF0NKTmHCMr69PvhSQcVInm1vSIj";

export function registerPushInstallation(deviceToken, deviceType) {
  var Installation = Parse.Object.extend(Parse.Installation);
  var installation = new Installation();
  // Permissions
  installation.setACL(new Parse.ACL(Parse.User.current()));

  installation.set("deviceToken", deviceToken);
  installation.set("deviceType", deviceType);
  installation.set("channels", ["global"]);
  installation.set("owner", Parse.User.current());
  installation.save();
}

export function scheduleNotification(productTitle) {
  const epochTime = new Date(Date.now() + (5*100));
  const isoString = epochTime.toISOString();
  console.log(epochTime);
  var query = new Parse.Query(Parse.Installation);
  query.equalTo('owner', Parse.User.current());

  const message = "Don't forget about your recent search for " + productTitle + "!";

  Parse.Push.send({
    where: query,
    data: {
      "content-available": 1,
      alert: message
    },
    push_time: isoString
  }, {
    useMasterKey: true,
    success: function() {
      // Push was successful
      console.log("Push scheduled successfully.");
    },
    error: function(error) {
      // Handle error
      console.log(error);
    }
  });
}
