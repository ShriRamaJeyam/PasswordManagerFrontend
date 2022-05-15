import React from 'react';
import LoginScreen from './LoginScreen';
import apiConsumer from '../Utils/apiConsumer';
import AdminPage from './AdminPage';
import Constants from './Constants';
import UserPage from './UserPage';
const CryptoJS = require('crypto-js')

class MainApp extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            loginID:null,
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
            let result = await apiConsumer('/admin/auth',data);
            if(result.status === 'ok')
            {
                this.stateSetter('authHash',password);
                this.stateSetter('loginID','admin');
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
            const data = { auth:{ } };
            const { auth } = data;
            auth.username = username;
            auth.millis = now;
            const authHash = CryptoJS.HmacSHA256(password,Constants.dbUserAuthHashMaker).toString(CryptoJS.enc.Hex);
            auth.hash = CryptoJS.HmacSHA256(`${now}`,authHash).toString(CryptoJS.enc.Hex);
            let result = await apiConsumer('/user/auth',data);
            if(result.status === 'ok')
            {
                this.stateSetter('authHash',authHash);
                this.stateSetter('username',username);
                this.stateSetter('userPassword',password);
                this.stateSetter('loginID',result.id);
            }
            else
            {
                if(typeof errorSetter === 'function')
                {
                    errorSetter(result.error_message);
                }
            }
        }
    };

    logoutHandler = () => {
        this.stateSetter('loginID',null);
        this.stateSetter('username',null);
        this.stateSetter('authHash',null);
    }

    render()
    {
        const { logoutHandler } = this;
        const { loginID,authHash,username, userPassword } = this.state;
        if(!loginID)
        {
            return (<LoginScreen loginHandler={this.loginHandler} />);
        }
        else if(loginID === 'admin')
        {
            return (<AdminPage authHash={authHash} logoutHandler={logoutHandler} />);
        }
        else if(typeof loginID === 'number')
        {
            return (<UserPage userPassword={userPassword} authHash={authHash} loginID={loginID} username={username} logoutHandler={logoutHandler}  />);
        }
        return null;
    }
}

export default MainApp;