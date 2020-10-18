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

import { Grid } from '@material-ui/core';

import CKEditor from 'ckeditor4-react';

import apiConsumer from '../Utils/apiConsumer';
import Constants from './Constants';
import AddPassword from './AddPassword';
import keySource from './keySource';
import decrypt from './CryptoHelper/decrypt';

class UserPage extends React.Component
{
    constructor(props)
    {
        super(props);
        window.CryptoJS=CryptoJS;
        this.state = {
            tagList : [],
            tagMap : {},
            selected: null,
            passwords: {}
        };
    }

    loadTagsList = async() => {
        const response = await apiConsumer('/user/listTag',this.authenticator({}));
        if(response.status === 'ok')
        {
            const tagMap = {};
            const tagList = [];
            response.result.forEach(t => {tagMap[t.id] = t.tag; tagList.push(t.tag)});
            this.setState({tagList,tagMap});
        }
        else
            window.toast.error(`Some error!!! ${response.error_message}`);
    };

    loadPasswordsList = async() => {
        const response = await apiConsumer('/user/listPassword',this.authenticator({}));
        if(response.status === 'ok')
        {
            const passwords = {};
            response.result.forEach(p => {
                passwords[p.id] = p;
                p.password = decrypt(p.password,this.state.key)
            });
            this.setState({passwords});
        }
        else
        {
            window.toast.error(`Some error!!! ${response.error_message}`);
        }
    }

    componentDidMount()
    {
        this.loadTagsList();
        const key = keySource.map( key => {
            return CryptoJS.HmacSHA512(this.props.authHash,key).toString(CryptoJS.enc.Hex);
        } );
        this.setState({key},() => { this.loadPasswordsList(); });
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

    savePassword = async(data,plaintxt) => {
        data = this.authenticator(data);
        let result = await apiConsumer('/user/savePassword',data);
        if(result.status === 'ok')
        {
            window.toast.success("Successfully Saved");
            this.cancelEdit();
            const { passwords } = this.state;
            passwords[data.id] = {
                id : data.id,
                password : plaintxt,
                tags : data.tags
            }
            this.setState({ passwords });
        }
        else
        {
            window.toast.error("Some error occured while saving the password");
        }
    };

    editPassword = (id) => {
        this.setState({
            selected : id
        });
    }

     cancelEdit = () => {
         this.setState({selected:null})
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
            addTag,
            authenticator,
            savePassword,
            editPassword,
            loadPasswordsList
        } = this; 

        const { logoutHandler } = props;
        const { 
            passwords,
            tag,
            tagList,
            tagMap,
            userList,
            selected ,
            key
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
                        <Button minimal intent="success" icon="refresh" onClick={loadPasswordsList} />
                        <Button minimal intent="primary" icon="add" onClick={() => stateSetter('selected','new')}>
                            {"Add Page"}
                        </Button>
                        <Button onClick={logoutHandler} minimal intent="danger" icon="log-out">
                            {"Logout"}
                        </Button>
                    </Navbar.Group>
                </Navbar>
                <br />
                {
                    selected === 'new' &&
                    (
                        <AddPassword cancelEdit={this.cancelEdit} keys={key} savePassword={savePassword} tagMap={tagMap} />
                    )
                }
                {
                    typeof selected === 'number' &&
                    <AddPassword cancelEdit={this.cancelEdit} text={passwords[selected].password} tags={passwords[selected].tags} savePassword={savePassword} id={selected} keys={key} tagMap={tagMap} />
                }
                {
                    ( selected === null || selected === undefined ) &&  
                    (
                        <Grid container spacing={1} direction="column">
                            {
                                Object.entries(passwords).map(([id,p]) => (
                                        <Grid item>
                                            <Card elevation={3}>
                                                <Grid container direction="column" spacing={1}>
                                                    <Grid item>
                                                        <Button onClick={() => editPassword(parseInt(id))} intent="warning" icon="edit" text="Edit" />
                                                    </Grid>
                                                    <Grid item>
                                                        {p.password.split('\n').map( d => (
                                                            <React.Fragment>
                                                                {d}
                                                                <br />
                                                            </React.Fragment>
                                                        ))}
                                                    </Grid>
                                                    <Grid item container spacing={1} direction="row">
                                                        {
                                                            p.tags.map(tag => (
                                                                <Grid item>
                                                                    <Tag>
                                                                        {tagMap[tag]}
                                                                    </Tag>
                                                                </Grid>
                                                            ))
                                                        }
                                                    </Grid>
                                                </Grid>
                                            </Card>
                                        </Grid>
                                    )
                                )
                            }
                        </Grid>
                    )
                }
            </React.Fragment>
        );
    }
}

export default UserPage;