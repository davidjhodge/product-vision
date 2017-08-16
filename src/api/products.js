'use strict';

var parseString = require('react-native-xml2js').parseString;
import { awsSignature } from '../lib/awsSignature.js';
import { get } from 'lodash';
import config from '../lib/config.js';

export async function productLookup(barcodeId, callback) {
  if (typeof barcodeId !== 'string') {
    callback("Search query is not a string.", null);
    return;
  }

  var date = new Date();
  var baseUrl = "http://ecs.amazonaws.com/onca/xml"
  var params = [];
  params.push("AWSAccessKeyId=" + config.AWSAccessKeyId);
  params.push("AssociateTag=" + config.AssociateTag);

  params.push("IdType=" + "EAN");
  params.push("ItemId=" + barcodeId);

  params.push("Operation=" + "ItemLookup");
  params.push("ResponseGroup=" +encodeURIComponent("Images,ItemAttributes,Offers"));

  params.push("SearchIndex=" + "All");
  params.push("Service=" + "AWSECommerceService");
  params.push("Timestamp=" + encodeURIComponent(date.toISOString()));
  params.push("Version=" + "2011-08-01");

  params.sort();
  var paramString = params.join('&');

  const signature = awsSignature(paramString);

  paramString = paramString + "&Signature=" + signature;

  const url = baseUrl + "?" + paramString;

  return fetch(url)
  .then((response) => {
    return response.text();
  })
  .then((responseXml) => {
    // Parse response (as xml) to json
    parseString(responseXml, function (parseError, result) {
      if (parseError) {
        callback(parseError, null);
        console.log("xml parsing error");
      } else {
        // Success
        const jsonResponse = result;

        if (jsonResponse) {
          var simpleItems = [];

          const items = get(jsonResponse,'ItemLookupResponse.Items[0].Item');
          if (items && items != 'undefined') {
            // Response exists
            items.forEach(function(item) {

              var simple = {};
              simple["id"] = get(item, 'ASIN[0]');
              simple["title"] = get(item, 'ItemAttributes[0].Title[0]');

              simple["price"] = get(item, 'ItemAttributes[0].ListPrice[0].FormattedPrice[0]');
              if (simple["price"] === undefined) {
                simple["price"] = get(item, 'OfferSummary[0].LowestNewPrice[0].FormattedPrice[0]')
              }

              // simple["salePrice"] = null;
              simple["imageUrl"] = get(item, 'LargeImage[0].URL[0]');
              simple["outboundUrl"] = get(item, 'DetailPageURL[0]');
              // simple["source"] = "amazon";

              // Ensure object is valid
              // TODO There should be a better object validation system in the future
              if (typeof simple["id"] !== "undefined" &&
                  typeof simple["title"] !== "undefined") {
                simpleItems.push(simple);
              }
            });
          } else {
            callback("Items field in response was undefined", null);
            return;
          }

          // This is the result of a successful request
          callback(null, simpleItems);
        } else {
          callback("The json-formatted response was undefined", null);
        }
      }
    });
  })
  .catch((error) => {
    console.error(error);
  });
}

export async function similarProducts(amazonId, callback) {
  if (typeof amazonId !== 'string') {
    callback("Similar Products: Amazon Id is not a string.", null);
    return;
  }

  var date = new Date();
  var baseUrl = "http://ecs.amazonaws.com/onca/xml"
  var params = [];
  params.push("AWSAccessKeyId=" + AWSAccessKeyId);
  params.push("AssociateTag=" + AssociateTag);

  params.push("ItemId=" + amazonId);
  params.push("MerchantId=" + "Amazon");
  params.push("Operation=" + "SimilarityLookup");
  params.push("ResponseGroup=" +encodeURIComponent("Images,ItemAttributes,Offers"));

  params.push("Service=" + "AWSECommerceService");
  params.push("Timestamp=" + encodeURIComponent(date.toISOString()));
  params.push("Version=" + "2011-08-01");

  params.sort();
  var paramString = params.join('&');

  const signature = awsSignature(paramString);

  paramString = paramString + "&Signature=" + signature;

  const url = baseUrl + "?" + paramString;

  return fetch(url)
  .then((response) => {
    return response.text();
  })
  .then((responseXml) => {
    // Parse response (as xml) to json
    parseString(responseXml, function (parseError, result) {
      if (parseError) {
        callback(parseError, null);
        console.log("xml parsing error");
      } else {
        // Success
        const jsonResponse = result;

        if (jsonResponse) {
          var simpleItems = [];

          const items = get(jsonResponse,'SimilarityLookupResponse.Items[0].Item');
          if (items && items != 'undefined') {
            // Response exists
            items.forEach(function(item) {

              var simple = {};
              simple["id"] = get(item, 'ASIN[0]');
              simple["title"] = get(item, 'ItemAttributes[0].Title[0]');

              simple["price"] = get(item, 'ItemAttributes[0].ListPrice[0].FormattedPrice[0]');
              if (simple["price"] === undefined) {
                simple["price"] = get(item, 'OfferSummary[0].LowestNewPrice[0].FormattedPrice[0]')
              }

              // simple["salePrice"] = null;
              simple["imageUrl"] = get(item, 'LargeImage[0].URL[0]');
              simple["outboundUrl"] = get(item, 'DetailPageURL[0]');
              // simple["source"] = "amazon";

              // Ensure object is valid
              // TODO There should be a better object validation system in the future
              if (typeof simple["id"] !== "undefined" &&
                  typeof simple["title"] !== "undefined") {
                simpleItems.push(simple);
              }
            });
          } else {
            callback("Items field in response was undefined", null);
            return;
          }

          // This is the result of a successful request
          callback(null, simpleItems);
        } else {
          callback("The json-formatted response was undefined", null);
        }
      }
    });
  })
  .catch((error) => {
    console.error(error);
  });
}
