import React from 'react';
import {
    TextArea,
    Button
} from '@blueprintjs/core';

import { Grid2 as Grid } from '@mui/material';

import Select from '../Utils/Select'
import encrypt from './CryptoHelper/encrypt';



class AddPassword extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            id : props.id || "new",
            text : props.text,
            tags : new Set(( (props.tags && props.tags.map(t => `${t}`)) || [] ))
        };
    }

    savePassword = () => {
        let { text,tags,id } = this.state;
        const { keys } = this.props;
        const plaintext = text;
        text = encrypt(text,keys);
        tags = Array.from(tags);
        this.props.savePassword({ password : text,tags,id },plaintext);
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

    render()
    {
        const { stateSetter, state, props } = this;
        const { text, tags } = state;
        const { tagMap, cancelEdit } = props;
        
        return (
            <React.Fragment>
                <TextArea onChange={ e => this.stateSetter('text',e.target.value)} growVertically large fill>
                    {text}
                </TextArea>
                <br />
                <br />
                <Select 
                    fill 
                    placeholder="Tags" 
                    large 
                    onChange={(e) => stateSetter('tags',e.target.value)} 
                    value={tags} 
                    multiple={true} 
                    listValues={tagMap} 
                />
                <br />
                <Grid container direction="row" spacing={1} >
                    <Grid>
                        <Button onClick={this.savePassword} icon="floppy-disk" intent="primary" text="Save Password" />
                    </Grid>
                    <Grid>
                        <Button onClick={cancelEdit} icon="cross" intent="danger" text="Cancel" />
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

export default AddPassword;