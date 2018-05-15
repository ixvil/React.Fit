import {Component} from "react";
import React from "react";
import FitAppBar from "./AppBar/FitAppBar";
import LogoBlock from "./AppBar/LogoBlock";
import FitGridList from "./FitGridList";
import {Snackbar} from "material-ui";

class FitAuthContainer extends Component {
    constructor() {
        super();
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    config = {
        url: {
            'host': 'http://127.0.0.1:8000/client/',
            'lessonsMethod': 'lesson/',
            'lessonUserMethod': 'lessonUser/',
            'requestCodeMethod': 'auth/requestCode/',
            'loginMethod': 'auth/login/',

        }
    }

    state = {
        login: false,
        user: {},
        snackOpen: false
    };

    handleLogin(phone) {

        fetch(this.config.url.host + this.config.url.loginMethod,
            {
                'method': 'POST',
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
            } else {

            }

        }).catch((error) => {
            console.error(error);
        });
    }

    handleLogout() {
        this.setState({login: false});
    }

    render() {
        let snackMessage = 'Успешная авторизация';
        if (this.state.login !== true) {
            snackMessage = 'Авторизация не прошла (Введен неверный код)';
        }

        return (
            <div>
                <FitAppBar
                    user={this.state}
                    handleLogin={this.handleLogin}
                    handleLogout={this.handleLogout}
                    config={this.config}
                />
                <LogoBlock/>
                <FitGridList
                    user={this.state}
                />
                <Snackbar
                    open={this.state.snackOpen}
                    message={snackMessage}
                    autoHideDuration={4000}
                    // onRequestClose={this.setState({snackOpen: false})}
                />
            </div>
        );
    }
}

export default FitAuthContainer;