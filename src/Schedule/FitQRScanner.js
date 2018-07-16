import React from "react";
import {
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    List,
    ListItem
} from "@material-ui/core";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import {createMuiTheme} from "@material-ui/core/styles/index";

import QrReader from "react-qr-reader";
import LessonUserList from "./LessonUserList";

class FitQRScanner extends React.Component {

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
                    onClose={this.props.handleQRScannerClose}
                >
                    <DialogTitle>{this.props.lesson.lessonSet.lessonType.name}</DialogTitle>
                    <DialogContent>
                        {/*<QrReader*/}
                            {/*style={{width: '240px', height: '240px'}}*/}
                            {/*onScan={this.handleOnScan}*/}
                        {/*/>*/}
                        <LessonUserList
                            lesson={this.props.lesson}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleQRScannerClose}>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </MuiThemeProvider>
        );
    }

    handleOnScan = (result) => {
        if (result !== null) {
            console.log(result);
        }
    }
}

export default FitQRScanner;