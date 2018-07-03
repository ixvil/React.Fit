import React from "react";
import {withStyles} from '@material-ui/core/styles';

import {
    AppBar,
    Button,

    Dialog,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Slide,
    Toolbar,
    Typography,
} from "@material-ui/core"


import CloseIcon from "@material-ui/icons/Close"

const styles = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
};

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class FitTickets extends React.Component {

    render() {
        const {classes} = this.props;
        return (
            <Dialog
                fullScreen
                open={this.props.open}
                onClose={this.props.handleClose}
                TransitionComponent={Transition}
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
                <List>
                    <ListItem button>
                        <ListItemText onClick={this.buyTicketHandle8} primary="Абонемент на 8 занятий"
                                      secondary="3200 р."/>
                    </ListItem>
                    <Divider/>
                    <ListItem button>
                        <ListItemText onClick={this.buyTicketHandle1} primary="Разовое посещение"
                                      secondary="560 р."/>
                    </ListItem>
                </List>
            </Dialog>);
    }

    buyTicketHandle8 = () => {
        this.buyTicket(1);
    }

    buyTicketHandle1 = () => {
        this.buyTicket(3);
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