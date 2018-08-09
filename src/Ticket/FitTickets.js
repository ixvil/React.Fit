import React from "react";
import {withStyles} from '@material-ui/core/styles';
import {MuiThemeProvider} from '@material-ui/core';

import {
    AppBar,
    Button,

    Dialog,
    DialogContent,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Toolbar,
    Typography,
} from "@material-ui/core"


import CloseIcon from "@material-ui/icons/Close"
import {createMuiTheme} from "@material-ui/core/styles/index";

const styles = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
};

class FitTickets extends React.Component {
    whiteBaseTheme = createMuiTheme({
        palette: {
            type: 'light'
        },
    });

    state = {
        ticketPlans: []
    }

    render() {
        const {classes} = this.props;

        if (this.state.ticketPlans.length === 0 && typeof this.props.user.id !== 'undefined') {
            this.getTicketPlans();
        }

        return (
            <MuiThemeProvider theme={this.whiteBaseTheme}>
                <Dialog
                    fullScreen
                    maxWidth='md'
                    open={this.props.open}
                    onClose={this.props.handleClose}
                >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton color="inherit" onClick={this.props.handleClose} aria-label="Close">
                                <CloseIcon/>
                            </IconButton>
                            <Typography variant="title" color="inherit" className={classes.flex}>
                                Купить абонемент
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    {this.getTicketPlansList()}
                    <DialogContent>
                        <Typography>
                            *Приобретая абонемент на сайте, вы соглашаетесь с Правилами студии и Договором присоединения
                        </Typography>
                        <span className={"tickets-footer"}>
                        <Button onClick={() => this.props.handleDocumentDialog('contract')}>Договор
                            присоединения</Button>
                        <Button onClick={() => this.props.handleDocumentDialog('refund')}>Возврат средств</Button>
                        <Button onClick={() => this.props.handleDocumentDialog('payment')}>Процесс оплаты</Button>
                        <Button onClick={() => this.props.handleDocumentDialog('rules')}>Правила студии</Button>
                        <Button onClick={() => this.props.handleDocumentDialog('confidential')}>Политика
                            конфиденциальности</Button>
                        </span>
                    </DialogContent>

                </Dialog>
            </MuiThemeProvider>
        );
    }

    getTicketPlansList = () => {
        return (
            <List key={0}>
                {this.state.ticketPlans.map((ticketPlan) => {
                    let secondary = ticketPlan.price;
                    if (ticketPlan.oldPrice !== null) {
                        secondary += ' (Цена без скидки ' + ticketPlan.oldPrice + ')';
                    }
                    return [
                        <ListItem button key={ticketPlan.id}>
                            <ListItemText
                                onClick={() => {
                                    this.buyTicket(ticketPlan.id)
                                }}
                                primary={ticketPlan.name}
                                secondary={secondary}
                            />
                        </ListItem>,
                        <Divider/>
                    ];
                })}
            </List>
        );
    }

    getTicketPlans = (userId) => {
        fetch(this.props.config.url.host + this.props.config.url.getTicketPlans,
            {
                'method': 'POST',
                'headers': {'Accept': 'application/json'},
                'credentials': 'include',
                'body': JSON.stringify({
                    "userId": userId
                })
            }
        ).then(function (response) {
            return response.json();
        }).then((data) => {
            this.setState({ticketPlans: data.ticketPlans});
            console.log(data);
        }).catch((error) => {
            console.error(error);
        });
    }

    buyTicket = (type) => {
        fetch(this.props.config.url.host + this.props.config.url.buyTicketMethod,
            {
                'method': 'POST',
                'headers': {'Accept': 'application/json'},
                'credentials': 'include',
                'body': JSON.stringify({
                    "ticket_plan_id": type
                })
            }
        ).then(function (response) {
            return response.json();
        }).then((data) => {
            if (data.status === 'ok') {
                window.location.href = data.formUrl;
            }
            console.log(data);
        }).catch((error) => {
            console.error(error);
        });
    }

}

export default withStyles(styles)(FitTickets);