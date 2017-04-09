'use strict';

var parseString = require('react-native-xml2js').parseString;
import { awsSignature } from '../lib/awsSignature.js';
import { get } from 'lodash';

const AWSAccessKeyId = "AKIAI5UXYO3ULRMQ56TQ";
const AssociateTag = "findlayers0d-20";

// ** HOW TO SEND A NETWORK REQUEST **

// export function networkRequest() {
  // ** THIS IS THE BEST WAY **
  // let url = "";
  // return fetch(url)
  // .then((response) => response.json())
  // .then((responseJson) => {
  //   return responseJson.movies;
  // })
  // .catch((error) => {
  //   console.error(error);
  // });

  // ** THIS IS THE OLD WAY **
  // var xhr = new XMLHttpRequest();
  // xhr.onreadystatechange = function() {
  //   if (xhr.readyState == XMLHttpRequest.DONE) {
  //     alert(xhr.responseText);
  //   }
  // }
  // xhr.open('GET', 'http://example.com', true);
  // xhr.send(null);
// }

export async function productLookup(barcodeId, callback) {
  if (typeof barcodeId !== 'string') {
    callback("Search query is not a string.", null);
    return;
  }

  var date = new Date();
  var baseUrl = "http://ecs.amazonaws.com/onca/xml"
  var params = [];
  params.push("AWSAccessKeyId=" + AWSAccessKeyId);
  params.push("AssociateTag=" + AssociateTag);

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

export async function similarProducts(barcodeId, callback) {
  if (typeof barcodeId !== 'string') {
    callback("Similar Products: Barcode is not a string.", null);
    return;
  }

  var date = new Date();
  var baseUrl = "http://ecs.amazonaws.com/onca/xml"
  var params = [];
  params.push("AWSAccessKeyId=" + AWSAccessKeyId);
  params.push("AssociateTag=" + AssociateTag);

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

// http://webservices.amazon.com/onca/xml?Service=AWSECommerceService&Operation=SimilarityLookup
// &SubscriptionId=AKIAI5UXYO3ULRMQ56TQ&AssociateTag=findlayers0d-20&ItemId=0465028020&
// MerchantId=Amazon&ResponseGroup=Images,ItemAttributes,Offers,Small

// export function fetchAmazonProducts(searchQuery, page, callback) {
//     // Get products for a search query from Amazon
//     if (typeof searchQuery !== 'string') {
//       callback("Search query is not a string.", null);
//       return;
//     }
//
//     // Amazon only returns the first 10 pages
//     if (page >= 10) {
//       callback("Amazon doesn't return more than 10 pages of results", null);
//       return;
//     }
//
//     var date = new Date();
//     var baseUrl = "http://ecs.amazonaws.com/onca/xml"
//     var params = [];
//     params.push("AWSAccessKeyId=" + Meteor.settings.amazon.AWSAccessKeyId);
//     params.push("AssociateTag=" + Meteor.settings.amazon.AssociateTag);
//
//     params.push("Keywords=" + encodeURIComponent(searchQuery));
//
//     params.push("Operation=" + "ItemSearch");
//     params.push("ResponseGroup=" +encodeURIComponent("Images,ItemAttributes,Offers"));
//
//     params.push("SearchIndex=" + "All");
//     params.push("ItemPage=" + page.toString())
//     params.push("Service=" + "AWSECommerceService");
//     params.push("Timestamp=" + encodeURIComponent(date.toISOString()));
//     params.push("Version=" + "2011-08-01");
//
//     params.sort();
//     paramString = params.join('&');
//
//     signature = awsSignature(paramString);
//
//     paramString = paramString + "&Signature=" + signature;
//
//     const url = baseUrl + "?" + paramString;
//     return fetch(url)
//     .then((response) => response.json())
//     .then((responseXml) => {
//       // Parse response (as xml) to json
//       parseString(responseXml, function (parseError, result) {
//         if (parseError) {
//           callback(parseError, null);
//           console.log("xml parsing error");
//         } else {
//           // Success
//           jsonResponse = result
//
//           if (jsonResponse) {
//             simpleItems = [];
//
//             items = get(jsonResponse,'ItemSearchResponse.Items[0].Item');
//             if (items && items != 'undefined') {
//               // Response exists
//               items.forEach(function(item) {
//
//                 simple = {};
//                 simple["id"] = get(item, 'ASIN[0]');
//                 simple["title"] = get(item, 'ItemAttributes[0].Title[0]');
//                 simple["brand"] = get(item, 'ItemAttributes[0].Brand[0]');
//                 simple["price"] = get(item, 'ItemAttributes[0].ListPrice[0].FormattedPrice[0]');
//                 simple["salePrice"] = null;
//                 simple["imageUrl"] = get(item, 'MediumImage[0].URL[0]');
//                 simple["outboundUrl"] = get(item, 'DetailPageURL[0]');
//                 simple["source"] = "amazon";
//                 // Ensure object is valid
//                 if (typeof simple["id"] !== "undefined" &&
//                 typeof simple["title"] !== "undefined" &&
//                 typeof simple["brand"] !== "undefined" &&
//                 typeof simple["price"] !== "undefined" &&
//                 typeof simple["imageUrl"] !== "undefined" &&
//                 typeof simple["outboundUrl"] !== "undefined") {
//                   simpleItems.push(simple)
//                 }
//               });
//
//               callback(null, simpleItems);
//             } else {
//               // Request was successful but response does not exist
//               callback("Response object is undefined.", null);
//             }
//           }
//         }
//       });
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }
