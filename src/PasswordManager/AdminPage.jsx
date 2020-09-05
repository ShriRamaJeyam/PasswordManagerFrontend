import React from 'react';
import CryptoJS from 'crypto-js';

import {
    Navbar,
    Button,
    Card,
    Tag,
    InputGroup
} from '@blueprintjs/core';

import {
    Grid
} from '@material-ui/core';
import apiConsumer from '../Utils/apiConsumer';
import Constants from './Constants';

class AdminPage extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            username:'',
            password:'',
            userList : null
        };
    }

    loadUsersList = async() => {
        const response = await apiConsumer('/admin/listUser',this.authenticator({}));
        if(response.status === 'ok')
            this.stateSetter('userList',response.result);
        else
            window.toast.error(`Some error!!! ${response.error_message}`);
    };

    addUser = async() => {
        const {
            username,
            password
        } = this.state;
        const response = await apiConsumer('/admin/addUser',this.authenticator({
            username,
            hash: CryptoJS.HmacSHA256(password,Constants.dbUserAuthHashMaker).toString(CryptoJS.enc.Hex)
        }));
        if(response.status === 'ok')
        {
            const { userList } = this.state;
            userList.push(response.result.username);
            this.setState({userList});
        }
        else
        {
            window.toast.error(response.error_message);
        }
    }

    componentDidMount()
    {
        this.loadUsersList();
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
        const { authHash } = this.props;
        const auth = {};
        const now = new Date().getTime();
        auth.millis = now;
        auth.hash = CryptoJS.SHA256(`${authHash}${now}`).toString(CryptoJS.enc.Hex);
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
            addUser 
        } = this; 

        const { logoutHandler } = props;
        const { 
            username, 
            password,
            userList 
        } = state;
        return (
            <React.Fragment>
                <Navbar>
                    <Navbar.Group align="left">
                        <Navbar.Heading>
                            {"Password Manager Administrator"}
                        </Navbar.Heading>
                    </Navbar.Group>
                    <Navbar.Group align="right">
                        <Button onClick={logoutHandler} minimal intent="danger" icon="log-out">
                            {"Logout"}
                        </Button>
                    </Navbar.Group>
                </Navbar>
                <br />
                <Card elevation={5}>
                    <Grid spacing={1} container direction="column">
                        <Grid item>
                            <InputGroup value={username} onChange={(e) => stateSetter('username',e.target.value)} placeholder="Username" fill large leftIcon="person" />
                        </Grid>
                        <Grid item>
                            <InputGroup type="password" value={password} onChange={(e) => stateSetter('password',e.target.value)} placeholder="Password" fill large leftIcon="key" />
                        </Grid>
                        <Grid spacing={1} container item direction="row">
                            <Grid item>
                                <Button onClick={addUser} intent="primary" icon="add">{"Add User"}</Button>
                            </Grid>
                            <Grid item>
                                <Button onClick={loadUsersList} intent="warning" icon='refresh'>{"Refresh Users"}</Button>
                            </Grid>
                        </Grid>
                        <Grid spacing={1} container direction="row" item>
                            {
                                userList &&
                                userList.map(user => (
                                    <Grid key={user} item>
                                        <Tag round large icon='person' >
                                            {user}
                                        </Tag>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Grid>
                </Card>
            </React.Fragment>
        );
    }
}

export default AdminPage;