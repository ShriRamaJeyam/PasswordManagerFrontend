import React from 'react';

import {
    Select as Sele,
    MultiSelect as MSele, MultiSelect
} from '@blueprintjs/select';

import {
    Tag,
    MenuItem,
    Checkbox,
    InputGroup
} from '@blueprintjs/core'

import { Grid } from '@material-ui/core';

class Select extends React.Component
{
    constructor(props)
    {
        super(props);
    }
    render()
    {
        const { state, props } = this;
        const { 
            multiple,
            listValues,
            value,
            onChange
        } = props;
        const ModifiedProps = {};
        let HTMLTag;
        if(multiple)
        {
            HTMLTag = MSele;
            ModifiedProps.tagRenderer = (item) => (<Tag>{listValues[item]}</Tag>);
            ModifiedProps.itemRenderer = (item) => (
                <Grid 
                    onClick={() => {
                        (value.has(item)?value.delete(item):value.add(item)); 
                        onChange({target:{ value }});
                    }}
                    container 
                    direction="row"
                >
                    <Grid item>
                        <Checkbox checked={value.has(item)}></Checkbox>
                    </Grid>
                    <Grid item>
                        {listValues[item]}
                    </Grid>
                </Grid>
            );
            ModifiedProps.items = Object.keys(listValues);
            ModifiedProps.selectedItems = Array.from(value);
            ModifiedProps.onItemSelect = () => null;
            ModifiedProps.itemPredicate = ((query,item) => {
                return listValues[item].match(
                    RegExp(query.split(' ').join('[\\S\\s]* '),'i')
                );
            });
            ModifiedProps.query = "";
            ModifiedProps.tagInputProps = { 
                tagProps : {
                    onRemove : undefined,
                    large : false
                },
                large : false,
                fill : props.fill
            };
        }
        else
        {
            HTMLTag = Select;
        }

    
        
        return (
            <HTMLTag
                {...ModifiedProps}
                {...props}
            >
            </HTMLTag>
        );
    }
}

export default Select;