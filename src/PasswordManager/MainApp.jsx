import React from 'react';
import LoginScreen from './LoginScreen';
import apiConsumer from '../Utils/apiConsumer';
import AdminPage from './AdminPage';
const CryptoJS = require('crypto-js')

class MainApp extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            loginID:'',
            authHash:null
        };
    }

    stateSetter = (property,value) => {
        const propHierarchy = property.split('.');
        let rootProp = this.state[propHierarchy[0]];
        if( propHierarchy.length === 1 )
        {
            rootProp = value;
        }
        else
        {
            let parentProp = rootProp;
            for( let i = 1 ; i < propHierarchy.length - 1; i++ )
            {
                parentProp = parentProp[propHierarchy[i]];
            }
            parentProp[propHierarchy[propHierarchy.length - 1]] = value;
        }
        this.setState({
            [propHierarchy[0]] : rootProp
        });
    };

    loginHandler = async(username,password,errorSetter) => {
        let now = new Date().getTime();
        if(username === 'admin')
        {
            const data = { auth:{ } };
            const { auth } = data;
            auth.millis = now;
            auth.hash = CryptoJS.SHA256(`${password}${now}`).toString(CryptoJS.enc.Hex);
            var result = await apiConsumer('/admin/auth',data);
            if(result.status === 'ok')
            {
                this.stateSetter('loginID','admin');
                this.stateSetter('authHash',password);
            }
            else
            {
                if(typeof errorSetter === 'function')
                {
                    errorSetter(result.error_message);
                }
            }
        }
        else
        {

        }
    };

    logoutHandler = () => {
        const { loginID } = this.state;
        if(loginID === 'admin');
        {
            this.stateSetter('loginID','');
            this.stateSetter('authHash',null);
        }
    }

    render()
    {
        const { logoutHandler } = this;
        const { loginID,authHash } = this.state;
        if(!loginID)
        {
            return (<LoginScreen loginHandler={this.loginHandler} />);
        }
        else if(loginID === 'admin')
        {
            return (<AdminPage authHash={authHash} logoutHandler={logoutHandler} />);
        }
        return null;
    }
}

export default MainApp;