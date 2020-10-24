import React from 'react';
import {
    Button,
    Collapse
} from '@blueprintjs/core';


class Collapsifier extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            isOpen : false
        };
    }
    
    onExpand = () => {
        const { isOpen } = this.state;
        this.setState({isOpen : (!isOpen)});
    }

    render()
    {
        const { isOpen } = this.state;
        return (
            <React.Fragment>
            <Button minimal icon={isOpen?"caret-down":"caret-right"} onClick={this.onExpand}>
                {
                    (
                        isOpen?
                        "Collapse":
                        "Expand"
                    )
                }
            </Button>
            <Collapse isOpen={isOpen}>
                {this.props.body}
            </Collapse>
            </React.Fragment>
        );
    }
}

export default Collapsifier;