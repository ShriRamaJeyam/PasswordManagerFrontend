import { 
    b64,
    b64Decrypt,
    emojiDecryptList,
    numDecryptKey
} from './emojiKey';


const emojiDecrypter = (data) => {
    let result = '';
    let init = 'A';
    for(let i = 0 ; i !== data.length; i++)
    {
        const emoji = data[i];
        let result_child = emoji;
        result_child =  emojiDecryptList[result_child];
        let init_num = b64Decrypt[init];
        result_child = numDecryptKey[init_num][result_child];
        result_child = b64[result_child];
        result += result_child;
        init = result_child;
    }
    return result;
};

export default emojiDecrypter;