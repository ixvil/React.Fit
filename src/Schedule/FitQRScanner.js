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
                        <LessonUserList
                            lesson={this.props.lesson}
                            clickHandler={this.handleOnScan}
                        />
                        <QrReader
                            style={{width: '240px', height: '240px'}}
                            onScan={this.handleOnScan}
                            delay={1000}
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            let count = window.prompt('Сколько всего мест будет на этом занятии?');
                            if (count === '0' || count >= 1) {
                                this.closeLesson(this.props.lesson, count);
                            }
                        }}>
                            Мест
                        </Button>
                        <Button onClick={this.props.handleQRScannerClose}>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </MuiThemeProvider>
        );
    }

    closeLesson = (lesson, count) => {

        fetch(this.props.config.url.host + this.props.config.url.closeLesson, {
                'method': 'POST',
                'headers': {'Accept': 'application/json'},
                'credentials': 'include',
                'body': JSON.stringify({
                    "lessonId": lesson.id,
                    "count": count
                })
            }
        ).then(function (response) {
            return response.json();
        }).then((data) => {
            if (typeof data.error !== "undefined") {
                console.log(data.error);
            } else {
                this.props.setLessonHandler(data.lesson);
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    handleOnScan = (result) => {
        if (result === null) {
            return false;
        }

        fetch(this.props.config.url.host + this.props.config.url.checkUserQR,
            {
                'method': 'POST',
                'headers': {'Accept': 'application/json'},
                'credentials': 'include',
                'body': JSON.stringify({
                    "lessonId": this.props.lesson.id,
                    "clientId": result
                })
            }
        ).then(function (response) {
            return response.json();
        }).then((data) => {
            if (typeof data.error !== "undefined") {
                console.log(data.error);
            } else {
                this.props.setLessonHandler(data.lesson);
            }
        }).catch((error) => {
            console.error(error);
        });
    }
}

export default FitQRScanner;