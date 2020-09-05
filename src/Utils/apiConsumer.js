import Constants from '../PasswordManager/Constants';
//import { default as axios } from 'axios';
const axios = require('axios').default;

async function apiConsumer(url,data)
{
    try
    {
       const result = await axios.post(`${Constants.apiHome}${url}`,data);
       return result.data;
    }
    catch(except)
    {
        window.toast.error("Some error occured.Please check network and try again.")
        return null;
    }
}

export default apiConsumer;