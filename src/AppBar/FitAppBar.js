import * as React from "react/cjs/react.development";
import {
    Card, CardHeader, CardText, Dialog, Divider, Drawer,
    FlatButton,
    IconButton,
    MenuItem, TextField,
    Toolbar,
    ToolbarGroup,
    ToolbarTitle
} from "material-ui";
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import Person from 'material-ui/svg-icons/social/person'


class FitAppBar extends React.Component {

    classes = {
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '0 8px',
        },
    }

    state = {
        drawerOpen: false,
        loginOpen: false,
        codeSent: false,
        phoneFrozen: false,
        phone: {
            errorText: '',
            valid: false,
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
            <IconButton onClick={this.handleDrawerOpen}>
                <NavigationMenu/>
            </IconButton>;

        if (this.props.user.login === false) {
            icon = <IconButton onClick={this.handleLoginOpen}>
                <Person/>
            </IconButton>;
        }


        return (
            <div>
                <Toolbar style={{backgroundColor: "#484848"}}>
                    <ToolbarGroup firstChild={true}>
                        {icon}
                        <ToolbarTitle text="Stretch&GO"/>
                    </ToolbarGroup>
                    {this.getDrawer()}

                </Toolbar>

            </div>

        );
    }

    getDrawer() {
        return (
            <Drawer
                docked={false}
                width={300}
                open={this.state.drawerOpen}
                // onRequestChange={(open) => this.setState({open})}
            >
                <div className={this.classes.drawerHeader}>
                    <IconButton onClick={this.handleDrawerClose}>
                        <ArrowBack/>
                    </IconButton>

                    <Card>
                        <CardHeader
                            title={this.props.user.user.name}
                            subtitle={this.props.user.user.phone}
                            avatar="https://rr.img.naver.jp/mig?src=http%3A%2F%2Fimgcc.naver.jp%2Fkaze%2Fmission%2FUSER%2F20141230%2F30%2F3151100%2F397%2F236x236xccdffb5405c96366d53d0af7.jpg%2F300%2F600&twidth=300&theight=300&qlt=80&res_format=jpg&op=r"
                        />

                        <CardText>
                            Свободных занятий: 6 <br/>
                            Бонусных баллов: 500
                        </CardText>
                    </Card>
                </div>
                <Divider/>
                <MenuItem>Записаться на занятие</MenuItem>
                <MenuItem>Купить абонемент</MenuItem>
                <Divider/>
                <MenuItem onClick={this.handleLogout}>Выход</MenuItem>
                {this.getLoginDialog()}
            </Drawer>

        );
    }

    getLoginDialog() {


        return (
            <Dialog
                title={"Авторизация"}
                modal={false}
                open={this.state.loginOpen}
                onRequestClose={this.handleLoginClose}
                autoDetectWindowHeight={true}
            >
                {this.getPhoneField()}
                <FlatButton
                    label={"Получить код"}
                    disabled={!this.state.phone.valid}
                    onClick={this.handleCodeSending}
                />
                <br/>
                <TextField
                    hintText="0000"
                    floatingLabelText="Код подтверждения"
                    onChange={this.onChangeCode.bind(this)}
                    disabled={!this.state.codeSent}
                />
                <FlatButton
                    label={"Подтвердить"}
                    disabled={!this.state.codeSent}
                    onClick={this.handleCodeConfirmation}
                />

            </Dialog>
        );
    }

    onChangeCode(event) {
        this.setState({
            code: event.target.value
        });
    }

    onChangePhone(event) {
        if (event.target.value.match('^((\\+7)+\\([0-9]{3}\\)([0-9]){7})$')) {
            this.setState({
                phone: {
                    errorText: '',
                    phoneNumber: event.target.value,
                    valid: true,
                }
            })
        } else {
            this.setState({
                phone: {
                    errorText: 'Формат телефона: +7(999)0000000',
                    phoneNumber: event.target.value,
                    valid: false,
                }
            })
        }
    }

    getPhoneField() {
        return (
            <TextField
                hintText="+7(999)0000000"
                errorText={this.state.phone.errorText}
                onChange={this.onChangePhone.bind(this)}
                floatingLabelText="Введите номер телефона"
                disabled={this.state.phoneFrozen}
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