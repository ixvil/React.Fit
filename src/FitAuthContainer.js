import {Component} from "react";
import React from "react";
import FitAppBar from "./AppBar/FitAppBar";
import LogoBlock from "./AppBar/LogoBlock";
import FitGridList from "./FitGridList";
import {
    Snackbar
} from "@material-ui/core";
import FitSnackBarContentWrapper from "./Tools/FitSnackBarContentWrapper";
import Cookies from 'universal-cookie'
import FitTickets from "./Ticket/FitTickets";
import DocumentDialog from "./Documents/DocumentDialog";
import Footer from "./Footer";
import FitTicketsList from "./Ticket/FitTicketsList";
import {YMInitializer} from 'react-yandex-metrika';
import ym from "react-yandex-metrika";
import YMHelper from "./Tools/YMHelper";
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
            'tokenLoginMethod': 'auth/tokenLogin/',
            'buyTicketMethod': 'userTicket/buy/',
            'welcomeFormMethod': 'user/welcome/',
            'checkUserQR': 'lessonUser/check',
            'closeLesson': 'lesson/close',
            'addUser': 'lessonUser/managerAdd',
            'getTicketPlans': 'ticketPlan/',
            'expiratingTickets': 'userTicket/expiration/',
            'newTickets': 'userTicket/new/'
        }
    }

    state = {
        login: false,
        loginDialog: {open: false, codeSent: false, phone: {valid: false, frozen: false}},
        user: {type: {id: 3}, userTickets: []},
        snackOpen: false,
        tokenAuthTried: false,
        fitTickets: {
            open: false
        },
        fitTicketsList: {
            open: false
        },
        documents: {
            open: this.props.documentId ? true : false,
            type: this.props.documentId ? this.props.documentId : null
        }
    };

    handleDocumentDialog = (type) => {
        this.setState({
            'documents': {
                'open': true,
                'type': type
            }
        })
    }

    handleDocumentDialogClose = () => {
        this.setState({documents: {open: false}});
    }

    handleSetUser = function (user) {
        this.setState({'user': user});
    }.bind(this);


    handleLoginOpen = () => {
        ym('reachGoal', YMHelper.YM_GOAL_OPEN_AUTH);
        this.setState({loginDialog: {open: true}})
    }
    handleLoginClose = () => {
        this.setState({loginDialog: {open: false}});

    }

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
                this.setState({
                    'user': data.user,
                    loginDialog: {open: false, codeSent: false, phone: {valid: false, frozen: false}}
                });

                this.cookies.set('authToken', data.token, {
                    domain: process.env.COOKIE_DOMAIN,
                    expires: new Date(new Date().getTime() + 60 * 60 * 24 * 30 * 1000),
                    path: '/'
                });
                this.cookies.set('authUserId', data.user.id, {
                    domain: process.env.COOKIE_DOMAIN,
                    expires: new Date(new Date().getTime() + 60 * 60 * 24 * 30 * 1000),
                    path: '/'
                });
            } else {

            }
            ym('reachGoal', YMHelper.YM_GOAL_AUTH);
        }).catch((error) => {
            console.error(error);
        });
    }

    handleLogout() {
        this.setState({login: false});
        this.cookies.remove('authToken', {
            domain: process.env.COOKIE_DOMAIN,
            path: '/'
        });
        this.cookies.remove('authUserId', {
            domain: process.env.COOKIE_DOMAIN,
            path: '/'
        });
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
                    handleLoginOpen={this.handleLoginOpen}
                    handleLoginClose={this.handleLoginClose}
                    loginDialog={this.state.loginDialog}
                    config={this.config}
                    handleSetUser={this.handleSetUser}
                    fitTicketsHandleOpen={this.fitTicketsHandleOpen}
                    fitTicketsListHandleOpen={this.fitTicketsListHandleOpen}
                    handleDocumentDialog={this.handleDocumentDialog}
                />
                <LogoBlock/>

                <FitTickets
                    open={this.state.fitTickets.open}
                    user={this.state.user}
                    handleClose={this.fitTicketsHandleClose}
                    config={this.config}
                    handleDocumentDialog={this.handleDocumentDialog}
                />

                <FitTicketsList
                    open={this.state.fitTicketsList.open}
                    user={this.state.user}
                    config={this.config}
                    handleClose={this.fitTicketsListHandleClose}
                />

                <FitGridList
                    config={this.config}
                    user={this.state}
                    handleLoginOpen={this.handleLoginOpen}
                />

                {snackBar}
                <DocumentDialog
                    open={this.state.documents.open}
                    type={this.state.documents.type}
                    handleDocumentDialogClose={this.handleDocumentDialogClose}
                />
                <Footer
                    handleDocumentDialog={this.handleDocumentDialog}
                />
                <YMInitializer accounts={[49394071]}/>
            </div>
        );
    }

    fitTicketsHandleClose = () => {
        this.setState({fitTickets: {open: false}});
    }
    fitTicketsHandleOpen = () => {
        this.setState({fitTickets: {open: true}});
    }
    fitTicketsListHandleOpen = () => {
        this.setState({fitTicketsList: {open: true}});
    }
    fitTicketsListHandleClose = () => {
        this.setState({fitTicketsList: {open: false}});
    }

    snackHandleClose = (event, reason) => {
        this.setState({snackOpen: false});
    }
}

export default FitAuthContainer;
