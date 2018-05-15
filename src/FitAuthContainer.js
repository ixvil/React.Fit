import {Component} from "react";
import React from "react";
import FitAppBar from "./AppBar/FitAppBar";
import LogoBlock from "./AppBar/LogoBlock";
import FitGridList from "./FitGridList";

class FitAuthContainer extends Component {
    constructor() {
        super();
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    state = {
        user: {
            login: false,
            user: {}
        }
    };

    handleLogin() {
        this.setState({
            user:
                {login: true}
        });
    }

    handleLogout() {
        this.setState({
            user: {login: false}
        });
    }

    render() {
        return (
            <div>
                <FitAppBar
                    user={this.state.user}
                    handleLogin={this.handleLogin}
                    handleLogout={this.handleLogout}
                />
                <LogoBlock/>
                <FitGridList
                    user={this.state.user}
                />
            </div>
        );
    }
}

export default FitAuthContainer;