import Constants from '../PasswordManager/Constants';
import axios from 'axios';

async function apiConsumer(url, data) {
    try {
        console.log(axios)
        const result = await axios.post(`${Constants.apiHome}${url}`, data);
        return result.data;
    } catch (except) {
        window.toast.error("Some error occurred. Please check network and try again.")
        console.log(except)
        return null;
    }
}

export default apiConsumer;