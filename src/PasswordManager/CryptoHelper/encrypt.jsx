import CryptoJS from 'crypto-js';
const { enc } = CryptoJS;
const { Base64, Utf8 } = enc;

import emojiEncryptor from "./emojiEncryptor";

module.exports = (data,key) => {
    let result = Utf8.parse(data);
    result = CryptoJS.TripleDES.encrypt(result,key[0]).toString();
    result = CryptoJS.AES.encrypt(result,key[1]).toString();
    result = CryptoJS.DES.encrypt(result,key[2]).toString();
    result = CryptoJS.Rabbit.encrypt(result,key[3]).toString();
    result = CryptoJS.RC4.encrypt(result,key[4]).toString();
    result = CryptoJS.TripleDES.encrypt(result,key[5]).toString();
    result = emojiEncryptor(result);
    return result;
};