import React from 'react';
import CryptoJS from 'crypto-js';
import * as qwerty from './CryptoHelper/emojiKey';
import {
    Navbar,
    Button,
    Card,
    Tag,
    InputGroup
} from '@blueprintjs/core';

import CKEditor from 'ckeditor4-react';

import {
    Grid
} from '@material-ui/core';
import apiConsumer from '../Utils/apiConsumer';
import Constants from './Constants';
console.log("qwerty",qwerty)

class UserPage extends React.Component
{
    constructor(props)
    {
        super(props);
        window.CryptoJS=CryptoJS;
        this.state = {
            username:'',
            password:'',
            tag:'',
            tagList : null,
            userList : null
        };
    }

    loadTagsList = async() => {
        const response = await apiConsumer('/user/listTag',this.authenticator({}));
        if(response.status === 'ok')
            this.stateSetter('tagList',response.result);
        else
            window.toast.error(`Some error!!! ${response.error_message}`);
    };

    componentDidMount()
    {
        this.loadTagsList();
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

    authenticator = (data) => {
        const { authHash, loginID } = this.props;
        const auth = {};
        const now = new Date().getTime();
        auth.millis = now;
        auth.hash = CryptoJS.HmacSHA256(`${now}`,authHash).toString(CryptoJS.enc.Hex);
        auth.id = loginID;
        data.auth = auth;
        return data;
    }

    render()
    {
        const { 
            props, 
            state, 
            stateSetter,
            loadUsersList,
            addUser,
            loadTagsList,
            addTag
        } = this; 

        const { logoutHandler } = props;
        const { 
            password,
            tag,
            tagList,
            userList 
        } = state;
        const { username } = props;
        return (
            <React.Fragment>
                <Navbar>
                    <Navbar.Group align="left">
                        <Navbar.Heading>
                            {`Hi, ${username}`}
                        </Navbar.Heading>
                    </Navbar.Group>
                    <Navbar.Group align="right">
                        <Button minimal intent="primary" icon="add">
                            {"Add Page"}
                        </Button>
                        <Button onClick={logoutHandler} minimal intent="danger" icon="log-out">
                            {"Logout"}
                        </Button>
                    </Navbar.Group>
                </Navbar>
                <br />
            </React.Fragment>
        );
    }
}

export default UserPage;