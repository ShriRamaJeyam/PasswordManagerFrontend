import CryptoJS from 'crypto-js';
import emojiDecryptor from './emojiDecryptor';

const { enc } = CryptoJS;
const { Base64, Utf8 } = enc;



const decrypt = (data,key) => {
    let result = emojiDecryptor(data);
    result = CryptoJS.TripleDES.decrypt(result,key[5]).toString(Base64);
    result = CryptoJS.RC4.decrypt(result,key[4]);
    result = CryptoJS.Rabbit.decrypt(result.toString(Base64),key[3]);
    result = CryptoJS.DES.decrypt(result.toString(Base64),key[2]);
    result = CryptoJS.AES.decrypt(result.toString(Base64),key[1]);
    result = CryptoJS.TripleDES.decrypt(result.toString(Base64),key[0]);
    result = result.toString(Utf8);
    return result;
};

export default decrypt;