import { deepClone } from '../../Utils/utilities';
import emojiDecryptor from './emojiDecryptor';
import emojiEncryptor from "./emojiEncryptor";
import decrypt from './decrypt';
import encrypt from './encrypt';

function shuffle(array)
{
    for(let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * i)
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    return array
}

test('encrypt and decrypt emoji work properly', () => {
    let base = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    base += base;
    base += base;
    base += base;
    base=base.split('');
    for(let i=0;i!==20;i++) 
    {
        let shuffled = shuffle(deepClone(base)).join('');
        let shuffled1 = deepClone(shuffled);
        expect(emojiDecryptor(emojiEncryptor(shuffled))).toBe(shuffled1);
    }
});

test('encrypt and decrypt work properly', () => {
    let base = "!@#$%^&*()-_+={}[]'\"\\:;?></.,~`|ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    base += base;
    base=base.split('');
    let key = ["Matsya","Kurma","Varaha","Narashima","Vamana","Parasurama"]
    for(let i=0;i!==20;i++)
    {
        let shuffled = shuffle(deepClone(base)).join('');
        let shuffled1 = deepClone(shuffled);
        expect(decrypt(encrypt(shuffled,key),key)).toBe(shuffled1);
    }
});