import React from "react";

import {
    FormControl,
    FormGroup,
    FormControlLabel,
    Switch
} from '@material-ui/core';


class FitAloneSwitch extends React.Component {

    render() {
        return (
            <FormControl component="fieldset">
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={this.props.check}
                                onChange={this.props.onChange}
                                value="useBonus"
                                disabled={this.props.disabled}
                            />
                        }
                        label={this.props.label}
                    />
                </FormGroup>
            </FormControl>);
    }
}

export default FitAloneSwitch;



