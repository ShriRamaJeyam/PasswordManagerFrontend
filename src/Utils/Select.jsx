import React from 'react';

import {
    MultiSelect as MSele
} from '@blueprintjs/select';

import {
    Tag,
    Checkbox,
    MenuItem
} from '@blueprintjs/core'

import { Grid } from '@material-ui/core';

class Select extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {};
    }
    render()
    {
        const { props } = this;
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
            /*ModifiedProps.itemRenderer = (item) => (
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
            ); */
            ModifiedProps.itemRenderer = (item) => {
                const isActive = value.has(item);
                return (
                    <MenuItem 
                        text={listValues[item]}
                        onClick={() => {
                            (value.has(item)?value.delete(item):value.add(item)); 
                            onChange({target:{ value }});
                        }}
                        active={isActive}
                        icon={(isActive?"tick":null)}
                    />
                );
            };
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