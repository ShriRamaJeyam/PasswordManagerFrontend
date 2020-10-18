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
    //let key = ["Matsya","Kurma","Varaha","Narashima","Vamana","Parasurama"];
    let key = ["9c382f2f0c0a49564fea1704698a298b273ca21619c7399855…f60f181d7cfdc0d9e4274839a3b64cb3e1c46096d984d44f3", "4841300fc36b9d75aecf8efb5d8072b3cd76e25b5b119c7e49…255baf505f582c4861e581f7a64a625600d1e71841f5caed4", "2446dd7db96dbdb15b72c04607aab93fe77df7321145893265…029103dad485a900136f07892ddd59a0be1f409577b4dccaa", "4262dd47a4dbee8241553ae91540431b8ccb279ab8bc7a15ff…940b0d4348956cb4179a74fe750015d1153fb66264bfe4865", "b0295c88b559daed9400144aef82df27f835ef2e8e68520f48…7f2df2fec8c2efb58bb7fdc47ce6d33fb808542d1e0a8c6cb", "ce39ff8cd3613e31f8c729d54a2b872a45e210e1e0769f10dc…b6da1d0c494d0a1c1f05ca3ffa5241d5255dcce9fce949567"]
    for(let i=0;i!==20;i++)
    {
        let shuffled = shuffle(deepClone(base)).join('');
        let shuffled1 = deepClone(shuffled);
        expect(decrypt(encrypt(shuffled,key),key)).toBe(shuffled1);
    }
});