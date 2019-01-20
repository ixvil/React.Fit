import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography
} from "@material-ui/core";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import {createMuiTheme} from "@material-ui/core/styles/index";
import LessonUserList from "./LessonUserList";
import moment from "moment-timezone";

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
                    fullScreen
                    maxWidth='md'
                >
                    <DialogTitle>{this.props.lesson.lessonSet.lessonType.name}</DialogTitle>
                    <DialogContent>
                        <Typography>
                            {moment(new Date(this.props.lesson.startDateTime)).tz("Europe/Moscow").format('L LT')}
                        </Typography>
                        <LessonUserList
                            lesson={this.props.lesson}
                            clickHandler={this.handleOnScan}
                            cancelClickHandler={this.handleCancelApplication}
                        />
                        {/*<QrReader*/}
                            {/*style={{width: '240px', height: '240px'}}*/}
                            {/*onScan={this.handleOnScan}*/}
                            {/*onError={this.handleOnError}*/}
                            {/*delay={1000}*/}
                        {/*/>*/}

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            let phone = window.prompt('Кого хотите добавить?');
                            if (phone.length > 0) {
                                this.addUser(this.props.lesson, phone);
                            }
                        }}>
                            Добавить
                        </Button>
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

    addUser = (lesson, phone) => {

        fetch(this.props.config.url.host + this.props.config.url.addUser, {
                'method': 'POST',
                'headers': {'Accept': 'application/json'},
                'credentials': 'include',
                'body': JSON.stringify({
                    "lessonId": lesson.id,
                    "phone": phone
                })
            }
        ).then(function (response) {
            return response.json();
        }).then((data) => {
            if (typeof data.error !== "undefined") {
                alert(data.error);
            } else {
                this.props.setLessonHandler(data.lesson);
            }
        }).catch((error) => {
            console.error(error);
        });
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

    handleOnError = (result) => {

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

    handleCancelApplication = (lessonUserId) => {

        fetch(this.props.config.url.host + this.props.config.url.lessonUserMethod + 'managerDelete',
            {
                'method': 'POST',
                'credentials': 'include',
                'headers': {'Accept': 'application/json'},
                'body': JSON.stringify({
                    "lessonUserId": lessonUserId
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