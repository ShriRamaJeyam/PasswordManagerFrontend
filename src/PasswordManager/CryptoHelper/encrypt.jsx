import CryptoJS from 'crypto-js';
import emojiEncryptor from "./emojiEncryptor";

const { enc } = CryptoJS;
const { Base64, Utf8 } = enc;

const encrypt = (data,key) => {
    let result = Utf8.parse(data);
    result = CryptoJS.TripleDES.encrypt(result,key[0]);
    result = result.toString();
    result = Base64.parse(result);
    result = CryptoJS.AES.encrypt(result,key[1]);
    result = result.toString();
    result = Base64.parse(result);
    result = CryptoJS.DES.encrypt(result,key[2]);
    result = result.toString();
    result = Base64.parse(result);
    result = CryptoJS.Rabbit.encrypt(result,key[3]);
    result = result.toString();
    result = Base64.parse(result);
    result = CryptoJS.RC4.encrypt(result,key[4]);
    result = result.toString();
    result = Base64.parse(result);
    result = CryptoJS.TripleDES.encrypt(result,key[5]);
    result = result.toString();
    result = emojiEncryptor(result);
    return result; 
};

export default encrypt;