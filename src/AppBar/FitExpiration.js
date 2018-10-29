import React from 'react';
import {
    Dialog,
    Card, CardContent, CardHeader,
    List, ListItemText,
    ListItem,
    ListSubheader,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    DialogContent
} from '@material-ui/core';
import {Close} from '@material-ui/icons';
import Expiration from "../Tools/Expiration";

class FitExpiration extends React.Component {

    state = {
        expiratingTickets: [],
        useBonus: false
    }

    render() {

        if (this.state.expiratingTickets.length === 0 && this.props.open) {
            this.getExpiratingTickets();
        }

        return (
            <Dialog
                fullScreen

                open={this.props.open}
                onClose={this.props.handleClose}
            >
                <AppBar>
                    <Toolbar>
                        <IconButton color="inherit" onClick={this.props.handleClose} aria-label="Close">
                            <Close/>
                        </IconButton>
                        <Typography variant="title" color="inherit">
                            Заканчивающиеся абонементы
                        </Typography>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <List>
                        {this.state.expiratingTickets.map((ticket) => {
                            return (
                                <ListItem>
                                    <ListItemText>
                                        <Typography>
                                            {ticket.user.phone} ({ticket.user.name})
                                        </Typography>
                                        <Typography>
                                            {ticket.isActive === true ? "Активен" : "Не активен"}
                                            {", законч. " + Expiration.getDate(ticket).format('DD.MM.YYYY')}
                                        </Typography>
                                        <Typography>
                                            {ticket.ticketPlan.name}
                                        </Typography>
                                        <Typography>
                                            {"Осталось " + ticket.lessonsExpires}
                                        </Typography>

                                    </ListItemText>
                                </ListItem>
                            );
                        })}
                    </List>
                </DialogContent>
            </Dialog>
        );
    }

    getExpiratingTickets = () => {
        fetch(this.props.config.url.host + this.props.config.url.expiratingTickets,
            {
                'method': 'GET',
                'headers': {'Accept': 'application/json'},
                'credentials': 'include'
            }
        ).then(function (response) {
            return response.json();
        }).then((data) => {
            if (typeof data.tickets !== 'undefined' && data.tickets.length !== 0) {
                this.setState({
                    expiratingTickets: data.tickets,

                });
            }
            console.log(data);
        }).catch((error) => {
            console.error(error);
        });
    }
}

export default FitExpiration;