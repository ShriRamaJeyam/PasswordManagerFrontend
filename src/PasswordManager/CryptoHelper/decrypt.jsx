import CryptoJS from 'crypto-js';
const { enc } = CryptoJS;
const { Base64, Utf8 } = enc;

import emojiDecryptor from './emojiDecryptor';

module.exports = (data,key) => {
    let result = emojiDecryptor(data);
    result = CryptoJS.TripleDES.decrypt(result,key[5]).toString(Utf8);
    result = CryptoJS.RC4.decrypt(result,key[4]).toString(Utf8);
    result = CryptoJS.Rabbit.decrypt(result,key[3]).toString(Utf8);
    result = CryptoJS.DES.decrypt(result,key[2]).toString(Utf8);
    result = CryptoJS.AES.decrypt(result,key[1]).toString(Utf8);
    result = CryptoJS.TripleDES.decrypt(result,key[0]).toString(Utf8);
    return result;
};