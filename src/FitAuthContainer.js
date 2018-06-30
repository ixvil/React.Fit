import {Component} from "react";
import React from "react";
import FitAppBar from "./AppBar/FitAppBar";
import LogoBlock from "./AppBar/LogoBlock";
import FitGridList from "./FitGridList";
import {Snackbar} from "@material-ui/core";
import FitSnackBarContentWrapper from "./Tools/FitSnackBarContentWrapper";
import Cookies from 'universal-cookie'

class FitAuthContainer extends Component {
    cookies;

    constructor(props) {
        super(props);
        this.cookies = new Cookies();
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    config = {
        url: {
            'host': process.env.REACT_APP_API_HOST,
            'lessonsMethod': 'lesson/',
            'lessonUserMethod': 'lessonUser/',
            'requestCodeMethod': 'auth/requestCode/',
            'loginMethod': 'auth/login/',
            'tokenLoginMethod': 'auth/tokenLogin/'

        }
    }

    state = {
        login: false,
        user: {},
        snackOpen: false,
        tokenAuthTried: false
    };

    handleSetUser = function (user) {
        this.setState({'user': user});
    }.bind(this);

    handleLogin(phone) {

        fetch(this.config.url.host + this.config.url.loginMethod,
            {
                'method': 'POST',
                'credentials': 'same-origin',
                'headers': {'Accept': 'application/json'},
                'body': JSON.stringify({
                    "phone": phone.phone,
                    "code": phone.code
                })
            }
        ).then(function (response) {
            console.log(response);
            return response.json();
        }).then((data) => {
            this.setState({login: data.status, snackOpen: true});
            if (typeof data.user === 'object') {
                this.setState({'user': data.user});

                this.cookies.set('authToken', data.token, {domain:'.stretchandgo.ru'});
                this.cookies.set('authUserId', data.user.id, {domain:'.stretchandgo.ru'});
            } else {

            }

        }).catch((error) => {
            console.error(error);
        });
    }

    handleLogout() {
        this.setState({login: false});
        this.cookies.remove('authToken');
        this.cookies.remove('authUserId');
    }

    tokenAuth() {
        this.setState({'tokenAuthTried': true});
        fetch(this.config.url.host + this.config.url.tokenLoginMethod,
            {
                'method': 'POST',
                'credentials': 'include',
                'headers': {
                    'Accept': 'application/json'
                }
            }
        ).then(function (response) {
            console.log(response);
            return response.json();
        }).then((data) => {
            this.setState({login: data.status, snackOpen: true});
            if (typeof data.user === 'object') {
                this.setState({'user': data.user});
            } else {

            }

        }).catch((error) => {
            console.error(error);
        });
    }

    render() {
        let snackMessage = 'Успешная авторизация';
        if (this.state.login !== true) {
            snackMessage = 'Авторизация не прошла (Введен неверный код)';
        }
        let snackBar = <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={this.state.snackOpen}
            autoHideDuration={6000}
            onClose={this.snackHandleClose}
        >
            <FitSnackBarContentWrapper
                onClose={this.snackHandleClose}
                variant="success"
                message={snackMessage}
            />
        </Snackbar>;

        if (this.state.tokenAuthTried !== true) {
            this.tokenAuth();
        }
        return (
            <div>
                <FitAppBar
                    user={this.state}
                    handleLogin={this.handleLogin}
                    handleLogout={this.handleLogout}
                    config={this.config}
                    handleSetUser={this.handleSetUser}
                />
                <LogoBlock/>

                <FitGridList
                    config={this.config}
                    user={this.state}
                />

                {snackBar}

            </div>
        );
    }

    snackHandleClose = (event, reason) => {
        this.setState({snackOpen: false});
    }
}

export default FitAuthContainer;
