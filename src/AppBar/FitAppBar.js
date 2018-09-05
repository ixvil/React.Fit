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
import ArrayTools from "../Tools/ArrayTools";
import FitPromoCode from "./FitPromoCode";
import WelcomeForm from "./WelcomeForm";
import {withStyles} from "@material-ui/core/styles/index";
import FitQRCode from "./FitQRCode";


class FitAppBar extends React.Component {

    constructor(props) {
        super(props);
    }

    static styles = {
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '0 8px'
        },
        drawerPaper: {
            width: 350
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
            width: '250px',
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
        codeSent: false,
        phoneFrozen: false,
        QROpen: false,
        phone: {
            errorText: '',
            valid: false,
            phoneNumber: '+7('
        },
        code: '',
        promoCode: {
            open: false
        },
        welcomeForm: {
            open: false,
            showed: false
        }
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
        const {classes} = this.props;
        if (this.props.user.login === true && this.props.user.user.name === '' && this.state.welcomeForm.showed == false) {
            this.setState({
                welcomeForm: {
                    open: true,
                    showed: true
                }
            });
        }

        let icon =
            <IconButton
                onClick={this.handleDrawerOpen}
                color="inherit"
                aria-label="Menu"
            >
                <Menu/>
            </IconButton>;
        if (this.props.user.login === false) {
            icon = <IconButton onClick={this.props.handleLoginOpen}>
                <Person/>
            </IconButton>;
        }
        let typo = <Typography variant="title">Stretch&GO</Typography>;
        if (this.props.user.login === false) {
            if (window.innerWidth < 950) {
                typo = <Typography variant="title" onClick={this.props.handleLoginOpen}>Войти</Typography>;
            } else {
                typo = <Typography variant="title" onClick={this.props.handleLoginOpen}>Личный кабинет</Typography>;
            }
        }
        return (
            <div className={classes.root}>
                <AppBar position="fixed">
                    <Toolbar style={{backgroundColor: "#484848"}}>
                        {icon}
                        {typo}
                        {this.getDrawer()}
                        {this.getLoginDialog()}
                        <Button
                            color="inherit"
                            onClick={() => this.props.handleDocumentDialog('contacts')}
                        >Контакты</Button>

                    </Toolbar>
                </AppBar>
                <FitPromoCode
                    open={this.state.promoCode.open}
                    handleClose={this.handlePromoCodeClose}
                    handleSetUser={this.props.handleSetUser}
                />
                <WelcomeForm
                    open={this.state.welcomeForm.open}
                    handleCloseWelcome={this.handleCloseWelcome}
                    handleSetUser={this.props.handleSetUser}
                    config={this.props.config}
                />
                <FitQRCode
                    open={this.state.QROpen}
                    value={this.props.user.user.id}
                    handleQROpen={this.handleQROpen}
                    handleQRClose={this.handleQRClose}
                />
            </div>

        );
    }

    handleCloseWelcome = () => {
        this.setState({welcomeForm: {open: false, showed: true}})
    }

    getDrawer() {
        const {classes} = this.props;


        return (
            <Drawer
                open={this.state.drawerOpen}
                variant="persistent"
                classes={{
                    paper: classes.drawerPaper,
                }}

            >
                <div>
                    <IconButton onClick={this.handleDrawerClose}>
                        <ArrowBack/>
                    </IconButton>

                    <Card>
                        <CardHeader
                            title={this.props.user.user.name}
                            subheader={this.props.user.user.phone}
                            avatar={<Avatar
                                src={"https://st3.depositphotos.com/9998432/13335/v/1600/depositphotos_133353474-stock-illustration-default-avatar-profile-icon-gray.jpg"}
                            />}
                        />
                        <CardContent>
                            <Typography>
                                Свободных занятий: {this.countAvailableLessons(this.props.user.user.userTickets, [1,2,4])} <br/>
                                Персональных тренировок: {this.countAvailableLessons(this.props.user.user.userTickets, [3])} <br/>
                                Бонусных баллов: {this.props.user.user.bonusBalance}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
                <Divider/>
                <MenuItem onClick={this.handleQROpen}>Показать QR код</MenuItem>
                <Divider/>
                <MenuItem onClick={this.props.fitTicketsHandleOpen}>Купить абонемент</MenuItem>
                <MenuItem onClick={this.props.fitTicketsListHandleOpen}>Ваши абонементы</MenuItem>
                <MenuItem onClick={this.handlePromoCodeOpen}>Ввести промокод</MenuItem>
                <Divider/>
                <MenuItem onClick={this.handleLogout}>Выход</MenuItem>
            </Drawer>

        );
    }

    handleQROpen = () => {
        this.setState({
            QROpen: true
        });
    }

    handleQRClose = () => {
        this.setState({
            QROpen: false
        });
    }

    handlePromoCodeOpen = () => {
        this.setState({
            promoCode: {
                open: true
            }
        });
    }

    handlePromoCodeClose = () => {
        this.setState({
            promoCode: {
                open: false
            }
        });
    }

    getLoginDialog() {
        return (
            <Dialog
                open={this.props.loginDialog.open}
                onClose={this.props.handleLoginClose}
                fullWidth
            >
                <DialogTitle id="form-dialog-title">{"Авторизация"}</DialogTitle>
                <DialogContent>
                    <div>
                        {this.getPhoneField()}
                    </div>
                    <div>
                        <Button
                            disabled={!this.state.phone.valid}
                            onClick={this.handleCodeSending}
                        >Получить код</Button>
                    </div>
                    <div></div>
                    <div>
                        <TextField
                            label="Код подтверждения"
                            onChange={this.onChangeCode.bind(this)}
                            disabled={!this.state.codeSent}
                            fullWidth
                        />
                    </div>
                    <div>
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

    countAvailableLessons(userTickets, availableTypes) {
        if (typeof userTickets !== 'object') {
            return 0;
        }

        let countTickets = userTickets.map((ticket) => {
            if (ticket.isActive === false) {
                return 0;
            }
            if (!availableTypes.includes(ticket.ticketPlan.type.id)) {
                return 0;
            }
            return ticket.lessonsExpires;
        });
        if (countTickets.length == 0) {
            return 0;
        }
        return countTickets.reduce(ArrayTools.sum);
    }
}

export default withStyles(FitAppBar.styles)(FitAppBar);