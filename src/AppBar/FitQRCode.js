import React from "react";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from "@material-ui/core";

import QRCode from "qrcode.react";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import {createMuiTheme} from "@material-ui/core/styles/index";

class FitQRCode extends React.Component {

    whiteBaseTheme = createMuiTheme({
        palette: {
            type: 'light'
        },
    });

    render() {
        return (
            <MuiThemeProvider theme={this.whiteBaseTheme}>
                <Dialog
                    open={this.props.open}
                    onClose={this.props.handleQRClose}
                >
                    <DialogTitle>Ваш QR код</DialogTitle>
                    <DialogContent>
                        <QRCode
                            value={this.props.value+''}
                            size={256}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleQRClose}>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </MuiThemeProvider>
        );
    }
}

export default FitQRCode;