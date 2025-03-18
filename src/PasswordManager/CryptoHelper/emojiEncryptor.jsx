import { 
    b64Decrypt,
    emojiList,
    numberKey
} from './emojiKey';

const emojiEncryptor = (data) => {
    const result = [];
    let init = 'A';
    for(let i = 0 ; i !== data.length; i++)
    {
        const letter = data[i];
        let result_child = letter;
        result_child = b64Decrypt[result_child];
        let init_num = b64Decrypt[init];
        result_child = numberKey[init_num][result_child];
        result_child = emojiList[result_child]
        result.push(result_child);
        init = letter;
    }
    return result;
};

export default emojiEncryptor;