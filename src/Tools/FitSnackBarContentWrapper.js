import React from "react";
import {SnackbarContent, IconButton} from '@material-ui/core';
import {green, amber} from "@material-ui/core/colors";
import {CheckCircle, Warning, Error, Info, Close} from '@material-ui/icons'

class FitSnackBarContentWrapper extends React.Component {

    styles = {
        success: {
            backgroundColor: green[600],
        },
        // error: {
        //     backgroundColor: theme.palette.error.dark,
        // },
        // info: {
        //     backgroundColor: theme.palette.primary.dark,
        // },
        warning: {
            backgroundColor: amber[700],
        },
        icon: {
            fontSize: 20,
            color: '#FFFFFF',
        },
        iconVariant: {
            opacity: 0.9,
            marginRight: 10,
        },
        message: {
            display: 'flex',
            alignItems: 'center',
            color: '#FFFFFF',
        },
    };

    message;

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SnackbarContent
                style={this.styles.success}
                aria-describedby="client-snackbar"
                message={
                    <span id="client-snackbar" style={this.styles.message}>
                        <CheckCircle style={this.styles.iconVariant}/>
                        {this.props.message}
                    </span>
                }
                action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={this.props.onClose}
                    >
                        <Close style={this.styles.icon}/>
                    </IconButton>
                ]}
            />
        );
    }
}

export default FitSnackBarContentWrapper;