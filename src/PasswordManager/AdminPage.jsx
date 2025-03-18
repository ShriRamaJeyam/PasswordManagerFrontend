import React from 'react';
import CryptoJS from 'crypto-js';

import {
    Navbar,
    Button,
    Card,
    Tag,
    InputGroup
} from '@blueprintjs/core';

import { Grid2 as Grid } from '@mui/material';

import apiConsumer from '../Utils/apiConsumer';
import { downloadTextFile } from '../Utils/utilities';
import Constants from './Constants';

class AdminPage extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            username:'',
            password:'',
            tag:'',
            tagList : null,
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
        if(!username || !password)
        {
            window.toast.error("Please enter username and password.");
            return null;
        }
        if(username.length < 8 || password.length < 8 )
        {
            window.toast.error("Both username and password must be atleast 8 characters.");
            return null;
        }
        const response = await apiConsumer('/admin/addUser',this.authenticator({
            username,
            hash: CryptoJS.HmacSHA256(password,Constants.dbUserAuthHashMaker).toString(CryptoJS.enc.Hex)
        }));
        if(response.status === 'ok')
        {
            const { userList } = this.state;
            userList.push(response.result.username);
            this.setState({
                userList,
                username:'',
                password:''
            });
        }
        else
        {
            window.toast.error(response.error_message);
        }
    }

    loadTagsList = async() => {
        const response = await apiConsumer('/admin/listTag',this.authenticator({}));
        if(response.status === 'ok')
            this.stateSetter('tagList',response.result);
        else
            window.toast.error(`Some error!!! ${response.error_message}`);
    };

    addTag = async() => {
        const {
            tag
        } = this.state;
        if(!tag)
        {
            window.toast.error("Please enter Tagname.");
            return null;
        }
        const response = await apiConsumer('/admin/addTag',this.authenticator({
            tag
        }));
        if(response.status === 'ok')
        {
            const { tagList } = this.state;
            tagList.push(response.result.tag);
            this.setState({
                tagList,
                tag:''
            });
        }
        else
        {
            window.toast.error(response.error_message);
        }
    }

    componentDidMount()
    {
        this.loadUsersList();
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
        const { authHash } = this.props;
        const auth = {};
        const now = new Date().getTime();
        auth.millis = now;
        auth.hash = CryptoJS.HmacSHA256(`${now}`, authHash).toString(CryptoJS.enc.Hex);
        data.auth = auth;
        return data;
    }
    
    backupData = async() => {
        const response = await apiConsumer('/admin/backup',this.authenticator({}));
        if(response.status === 'ok')
        {
            const data = JSON.stringify(response.result);
            const fileName = `PasswordBackup_${new Date().toString()}.json`;
            downloadTextFile(data,fileName);
        }
    };

    render()
    {
        const { 
            props, 
            state, 
            stateSetter,
            loadUsersList,
            addUser,
            loadTagsList,
            addTag,
            backupData
        } = this; 

        const { logoutHandler } = props;
        const { 
            username, 
            password,
            tag,
            tagList,
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
                        <Grid>
                            <InputGroup value={username} onChange={(e) => stateSetter('username',e.target.value)} placeholder="Username" fill large leftIcon="person" />
                        </Grid>
                        <Grid>
                            <InputGroup type="password" value={password} onChange={(e) => stateSetter('password',e.target.value)} placeholder="Password" fill large leftIcon="key" />
                        </Grid>
                        <Grid spacing={1} container item direction="row">
                            <Grid>
                                <Button onClick={addUser} intent="primary" icon="add">{"Add User"}</Button>
                            </Grid>
                            <Grid>
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
                <br />
                <Card elevation={5}>
                    <Grid spacing={1} container direction="column">
                        <Grid>
                            <InputGroup value={tag} onChange={(e) => stateSetter('tag',e.target.value)} placeholder="Tag Name" fill large leftIcon='tag' />
                        </Grid>
                        <Grid spacing={1} container item direction="row">
                            <Grid>
                                <Button onClick={addTag} intent="primary" icon="add">{"Add Tag"}</Button>
                            </Grid>
                            <Grid>
                                <Button onClick={loadTagsList} intent="warning" icon='refresh'>{"Refresh Tags"}</Button>
                            </Grid>
                        </Grid>
                        <Grid spacing={1} container direction="row" item>
                            {
                                tagList &&
                                tagList.map(tag => (
                                    <Grid key={tag} item>
                                        <Tag round icon='tag' >
                                            {tag}
                                        </Tag>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Grid>
                </Card>
                <br />
                <Button onClick={backupData} intent="primary" text="Backup" />
            </React.Fragment>
        );
    }
}

export default AdminPage;