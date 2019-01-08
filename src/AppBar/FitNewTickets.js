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
    DialogContent, MuiThemeProvider, createMuiTheme, withStyles
} from '@material-ui/core';
import {Close} from '@material-ui/icons';
import moment from "moment/moment";
const styles = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
};
class FitNewTickets extends React.Component {

    whiteBaseTheme = createMuiTheme({
        palette: {
            type: 'light'
        },
    });

    state = {
        expiratingTickets: [],
        useBonus: false
    }

    render() {

        const {classes} = this.props;

        if (this.state.expiratingTickets.length === 0 && this.props.open) {
            this.getExpiratingTickets();
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
                                <Close/>
                            </IconButton>
                            <Typography variant="title" color="inherit">
                                Новые абонементы
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
                                                {", куплен. " + (moment(ticket.dateCreatedAt)).format('DD.MM.YYYY')}
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
            </MuiThemeProvider>
        );
    }

    getExpiratingTickets = () => {
        fetch(this.props.config.url.host + this.props.config.url.newTickets,
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

export  default withStyles(styles)(FitNewTickets);