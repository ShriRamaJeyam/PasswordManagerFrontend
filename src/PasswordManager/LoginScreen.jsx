import React from 'react';

import {
    Card,
    InputGroup,
    Text,
    Classes,
    Button
} from '@blueprintjs/core';

import {
    Dialog,
    Grid
} from '@material-ui/core';

class LoginScreen extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            username:'',
            password:'',
            error:''
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

    resetData = () => {
        this.stateSetter('username','');
        this.stateSetter('password','');
        this.stateSetter('error','');
    }

    errorSetter = (error) => {
        this.stateSetter('error',error);
    };

    render()
    {
        const {
            stateSetter,
            resetData,
            errorSetter,
            props,
            state
        } = this;

        const { 
            username, 
            password,
            error 
        } = state;

        const {
            loginHandler
        } = props;

        return (
            <Dialog open>
                <Card elevation="5" >
                    <Grid spacing={2} container direction="column">
                        <Grid item>
                            <Text tagName="h2" className={Classes.HEADING}>
                                {"Password Manager Login"}
                            </Text>
                        </Grid>
                        <Grid item>
                            <InputGroup placeholder="Username" value={username} onChange={(e) => stateSetter('username',e.target.value) } fill large leftIcon="person" />
                        </Grid>
                        <Grid item>
                            <InputGroup placeholder="Password" value={password} onChange={(e) => stateSetter('password',e.target.value) } type="password" fill large leftIcon="key" />
                        </Grid>
                        {
                            error &&
                            <Grid item>
                                <p style={{color:'red'}}>{error}</p>
                            </Grid>
                        }
                        <Grid spacing={1} item container direction="row">
                            <Grid item>
                                <Button disabled={!username || !password} onClick={() => loginHandler(username,password,errorSetter)} fill large intent="primary">
                                    {"Login"}
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button onClick={resetData} large fill intent="warning">
                                    {"Reset"}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Card>
            </Dialog>
        );
    }
}

export default LoginScreen;