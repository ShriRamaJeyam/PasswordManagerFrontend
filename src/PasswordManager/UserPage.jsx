import React from 'react';
import CryptoJS from 'crypto-js';
import {
    Navbar,
    Button,
    Card,
    Tag,
} from '@blueprintjs/core';

import { Grid } from '@material-ui/core';

import apiConsumer from '../Utils/apiConsumer';
import AddPassword from './AddPassword';
import keySource from './keySource';
import decrypt from './CryptoHelper/decrypt';
import Select from '../Utils/Select'
import Collapseifier from '../Utils/Collapseifier';
import { retrier } from '../Utils/utilities';

const StringElementMaker = (data) => {
    return data.split('\n').map(d => (
        <React.Fragment>
            {d}
            <br />
        </React.Fragment>
    ));
};

class UserPage extends React.Component {
    constructor(props) {
        super(props);
        window.CryptoJS = CryptoJS;
        this.state = {
            tagList: [],
            tagMap: {},
            selected: null,
            passwords: {},
            filterTags: new Set()
        };
    }

    loadTagsList = async () => {
        const response = await apiConsumer('/user/listTag', this.authenticator({}));
        if (response.status === 'ok') {
            const tagMap = {};
            const tagList = [];
            response.result.forEach(t => { tagMap[t.id] = t.tag; tagList.push(t.tag) });
            this.setState({ tagList, tagMap });
        }
        else
            window.toast.error(`Some error!!! ${response.error_message}`);
    };

    loadPasswordsList = async () => {
        const response = await apiConsumer('/user/listPassword', this.authenticator({}));
        const { key } = this.state;
        if (response.status === 'ok') {
            const passwords = {};
            for (let i = 0; i !== response.result.length; i++) {
                retrier(() => {
                    const p = response.result[i];
                    p.password = decrypt(p.password, key);
                    passwords[p.id] = p;
                }, 3);
            }
            this.setState({ passwords });
        }
        else {
            window.toast.error(`Some error!!! ${response.error_message}`);
        }
    }

    refresher = () => {
        this.loadPasswordsList();
        this.loadTagsList();
    }

    componentDidMount() {
        this.loadTagsList();
        const key = [];
        const { userPassword } = this.props;
        for (let i = 0; i !== keySource.length; i++) {
            const tempKey = CryptoJS.HmacSHA512(userPassword, keySource[i]).toString(CryptoJS.enc.Hex);
            key.push(tempKey);
        }
        this.setState({ key }, () => { this.loadPasswordsList(); });
    }

    stateSetter = (property, value) => {
        const propHierarchy = property.split('.');
        let rootProp = this.state[propHierarchy[0]];
        if (propHierarchy.length === 1) {
            rootProp = value;
        }
        else {
            let parentProp = rootProp;
            for (let i = 1; i < propHierarchy.length - 1; i++) {
                parentProp = parentProp[propHierarchy[i]];
            }
            parentProp[propHierarchy[propHierarchy.length - 1]] = value;
        }
        this.setState({
            [propHierarchy[0]]: rootProp
        });
    };

    authenticator = (data) => {
        const { authHash, loginID } = this.props;
        const auth = {};
        const now = new Date().getTime();
        auth.millis = now;
        auth.hash = CryptoJS.HmacSHA256(`${now}`, authHash).toString(CryptoJS.enc.Hex);
        auth.id = loginID;
        data.auth = auth;
        return data;
    }

    savePassword = async (data, plaintxt) => {
        data = this.authenticator(data);
        let result = await apiConsumer('/user/savePassword', data);
        if (result.status === 'ok') {
            window.toast.success("Successfully Saved");
            const { passwords } = this.state;
            if (data.id === 'new') {
                data.id = result.result;
            }
            passwords[data.id] = {
                id: data.id,
                password: plaintxt,
                tags: data.tags
            }
            this.setState({ passwords });
            this.cancelEdit();
        }
        else {
            window.toast.error("Some error occured while saving the password");
        }
    };

    editPassword = (id) => {
        this.setState({
            selected: id
        });
    }

    cancelEdit = () => {
        this.setState({ selected: null })
    }

    render() {
        const {
            props,
            state,
            stateSetter,
            savePassword,
            editPassword,
            loadPasswordsList
        } = this;

        const { logoutHandler } = props;
        const {
            passwords,
            tagMap,
            selected,
            filterTags,
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
                        <Button minimal intent="success" icon="refresh" onClick={this.refresher} />
                        <Button minimal intent="primary" icon="add" onClick={() => stateSetter('selected', 'new')}>
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
                    (selected === null || selected === undefined) &&
                    (
                        <Grid container spacing={1} direction="column">
                            <Grid item>
                                <Select
                                    fill
                                    placeholder="Filter Based on Tags"
                                    large
                                    onChange={(e) => this.stateSetter('filterTags', e.target.value)}
                                    value={filterTags}
                                    multiple={true}
                                    listValues={tagMap}
                                />
                            </Grid>
                            {
                                Object.entries(passwords).map(([id, p]) => {
                                    if (filterTags.size !== 0) {
                                        const currentTags = p.tags.map(t => `${t}`);
                                        let isFound = false;
                                        for (let i = 0; i !== currentTags.length; i++) {
                                            if (filterTags.has(currentTags[i])) {
                                                isFound = true;
                                                break;
                                            }
                                        }
                                        if (!isFound) {
                                            return null;
                                        }

                                    }
                                    return (
                                        <Grid item>
                                            <Card elevation={3}>
                                                <Grid container direction="column" spacing={1}>
                                                    <Grid item>
                                                        <Button onClick={() => editPassword(parseInt(id))} intent="warning" icon="edit" text="Edit" />
                                                    </Grid>
                                                    <Grid item>
                                                        {
                                                            (() => {
                                                                let content = p.password;
                                                                let firstSplitIndex = content.indexOf('~');
                                                                if (firstSplitIndex === -1) {
                                                                    return StringElementMaker(content);
                                                                }
                                                                let former, latter;
                                                                former = content.substr(0, firstSplitIndex);
                                                                latter = content.substr(firstSplitIndex + 1, content.length);

                                                                return (
                                                                    [
                                                                        (
                                                                            StringElementMaker(former)
                                                                        ),
                                                                        (
                                                                            <Collapseifier body={
                                                                                StringElementMaker(latter)
                                                                            }>

                                                                            </Collapseifier>
                                                                        )
                                                                    ]
                                                                );
                                                            })()
                                                        }
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
                                }
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