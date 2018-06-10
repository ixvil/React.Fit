import * as React from "react/cjs/react.development";
import {
    Avatar,
    Card, CardHeader, CardContent,
    Dialog, DialogContent, DialogTitle,
    Divider, Drawer,
    IconButton, Button,
    MenuItem, TextField,
    Toolbar, AppBar,
    Typography
} from "@material-ui/core";
import Menu from '@material-ui/icons/Menu';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Person from '@material-ui/icons/Person'


class FitAppBar extends React.Component {

    classes = {
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '0 8px',
        },
        root: {
            flexGrow: 1,
        },
        flex: {
            flex: 1,
        },
        menuButton: {
            marginLeft: -12,
            marginRight: 20,
        },
        textFieldDiv: {
            width: '400px',
            float: 'left'
        },
        loginDialogButtonDiv: {
            width: '150px',
            float: 'left',
            marginTop: '20px'
        },
        divider: {
            width: '100%',
            height: '1px',
            float: 'left'
        }


    }

    state = {
        drawerOpen: false,
        loginOpen: false,
        codeSent: false,
        phoneFrozen: false,
        phone: {
            errorText: '',
            valid: false,
            phoneNumber: '+7('
        },
        code: ''
    }

    handleLoginOpen = () => {
        this.setState({loginOpen: true})
    }
    handleLoginClose = () => {
        this.setState({loginOpen: false, codeSent: false, phone: {valid: false, frozen: false}});

    }


    handleDrawerOpen = () => {
        this.setState({drawerOpen: true})
    }
    handleDrawerClose = () => {
        this.setState({drawerOpen: false})
    }

    handleCodeSending = () => {
        this.setState({codeSent: true, phoneFrozen: true});
        this.requestCode();
    }

    handleCodeConfirmation = () => {
        this.props.handleLogin({
            phone: this.state.phone.phoneNumber,
            code: this.state.code
        });
        this.setState({loginOpen: false, phoneFrozen: false, codeSent: false});
    }

    handleLogout = () => {
        this.handleDrawerClose();
        this.props.handleLogout();
    }

    render() {

        let icon =
            <IconButton
                onClick={this.handleDrawerOpen}
                color="inherit"
                aria-label="Menu"
            >
                <Menu/>
            </IconButton>;

        if (this.props.user.login === false) {
            icon = <IconButton onClick={this.handleLoginOpen}>
                <Person/>
            </IconButton>;
        }


        return (
            <div className={this.classes.root}>
                <AppBar position="static">
                    <Toolbar style={{backgroundColor: "#484848"}}>

                        {icon}
                        <Typography variant="title">Stretch&GO</Typography>

                        {this.getDrawer()}
                        {this.getLoginDialog()}

                    </Toolbar>
                </AppBar>

            </div>

        );
    }

    getDrawer() {
        return (
            <Drawer
                open={this.state.drawerOpen}
                variant="persistent"
                // onRequestChange={(open) => this.setState({open})}
            >
                <div>
                    <IconButton onClick={this.handleDrawerClose}>
                        <ArrowBack/>
                    </IconButton>

                    <Card>
                        <CardHeader
                            title={this.props.user.user.name}
                            subtitle={this.props.user.user.phone}
                            avatar={
                                <Avatar
                                    src={"https://rr.img.naver.jp/mig?src=http%3A%2F%2Fimgcc.naver.jp%2Fkaze%2Fmission%2FUSER%2F20141230%2F30%2F3151100%2F397%2F236x236xccdffb5405c96366d53d0af7.jpg%2F300%2F600&twidth=300&theight=300&qlt=80&res_format=jpg&op=r"}
                                />
                            }
                        />
                        <CardContent>
                            <Typography>
                                Свободных занятий: 6 <br/>
                                Бонусных баллов: 500
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
                <Divider/>
                <MenuItem>Записаться на занятие</MenuItem>
                <MenuItem>Купить абонемент</MenuItem>
                <Divider/>
                <MenuItem onClick={this.handleLogout}>Выход</MenuItem>
            </Drawer>

        );
    }

    getLoginDialog() {

        return (
            <Dialog
                open={this.state.loginOpen}
                onClose={this.handleLoginClose}
                fullWidth
            >
                <DialogTitle id="form-dialog-title">{"Авторизация"}</DialogTitle>
                <DialogContent>
                    <div style={this.classes.textFieldDiv}>
                        {this.getPhoneField()}
                    </div>
                    <div style={this.classes.loginDialogButtonDiv}>
                        <Button
                            disabled={!this.state.phone.valid}
                            onClick={this.handleCodeSending}
                        >Получить код</Button>
                    </div>
                    <div style={this.classes.divider}></div>
                    <div style={this.classes.textFieldDiv}>
                        <TextField
                            label="Код подтверждения"
                            onChange={this.onChangeCode.bind(this)}
                            disabled={!this.state.codeSent}
                            fullWidth
                        />
                    </div>
                    <div style={this.classes.loginDialogButtonDiv}>
                        <Button
                            disabled={!this.state.codeSent}
                            onClick={this.handleCodeConfirmation}
                        >Подтвердить</Button>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    onChangeCode(event) {
        this.setState({
            code: event.target.value
        });
    }

    onChangePhone(event) {
        let formatedValue = this.formatPhone(event.target.value)
        if (formatedValue.match('^((\\+7)+\\([0-9]{3}\\)([0-9]){7})$')) {
            this.setState({
                phone: {
                    errorText: '',
                    phoneNumber: formatedValue,
                    valid: true,
                }
            })
        } else {

            this.setState({
                phone: {
                    errorText: 'Формат телефона: +7(999)0000000',
                    phoneNumber: formatedValue,
                    valid: false,
                }
            })
        }
    }

    formatPhone(value) {
        let newValue = '+7(';
        let numRegexp = /[0-9]/ig;
        let number;
        let i = 3;
        let devNull = numRegexp.exec(value);

        while (number = numRegexp.exec(value)) {

            if (i === 6) {
                newValue += ')';
            }

            if (i < 13 && i !== 0) {
                newValue += number;
            }
            i++;
        }

        return newValue;

    }

    getPhoneField() {
        return (
            <TextField
                helperText={this.state.phone.errorText ? this.state.phone.errorText : false}
                error={this.state.phone.errorText ? true : false}
                onChange={this.onChangePhone.bind(this)}
                label="Введите номер телефона"
                disabled={this.state.phoneFrozen}
                value={this.state.phone.phoneNumber}
                fullWidth
            />

        );
    }

    requestCode() {
        if (this.state.phone.valid === true) {
            fetch(this.props.config.url.host + this.props.config.url.requestCodeMethod,
                {
                    'method': 'POST',
                    'headers': {'Accept': 'application/json'},
                    'body': JSON.stringify({
                        "phone": this.state.phone.phoneNumber
                    })
                }
            ).then(function (response) {
                return response.json();
            }).then((data) => {
                console.log(data);
            }).catch((error) => {
                console.error(error);
            });
        }
    }
}

export default FitAppBar;