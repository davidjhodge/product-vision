import CryptoJS, { HmacSHA256 } from 'crypto-js';
import config from './config.js';

export function awsSignature(paramString) {

  stringToSign = "GET\n" + "ecs.amazonaws.com\n" + "/onca/xml\n" + paramString
  
  return encodeURIComponent(sha256(stringToSign, config.AWSPrivateKey));
}

function sha256(stringToSign, secretKey) {
  var hex = CryptoJS.HmacSHA256(stringToSign, secretKey);
  return hex.toString(CryptoJS.enc.Base64);
}
