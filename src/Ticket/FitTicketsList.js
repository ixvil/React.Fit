import React from "react";

import {
    AppBar,
    Toolbar,
    IconButton,
    Button,
    Dialog,
    DialogTitle,
    DialogActions,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    DialogContent,
    Typography,
    MuiThemeProvider
} from "@material-ui/core";
import {ExpandMore, Close} from "@material-ui/icons"
import moment from "moment/moment";
import {createMuiTheme, withStyles} from "@material-ui/core/styles/index";
import Expiration from "../Tools/Expiration";

const styles = {

    heading: {
        flexBasis: '25%',
        flexShrink: 0,
    },
    mobHeading: {
        flexBasis: '45%',
        flexShrink: 0,
        paddingLeft: '20px',
    },
    spacing: {
        flexBasis: '10%',
        flexShrink: 0,
    },
    subHeader: {
        flexBasis: '70%',
        flexShrink: 0,
    },
    default: {

        paddingLeft: '20px',
    },
    clear: {
        clear: 'both'
    },
    inactivePanel: {
        backgroundColor: '#dddddd',
        color: '#aaaaaa'
    },
    isActiveSpan: {
        color: '#00aa00'
    },
    isNotActiveSpan: {
        color: '#ff0000'
    }

};

class FitTicketsList extends React.Component {

    whiteBaseTheme = createMuiTheme({
        palette: {
            type: 'light'
        },
    });

    render() {
        const {classes} = this.props;
        let dialogContent;
        if (typeof this.props.user.userTickets === 'undefined' || this.props.user.userTickets.length === 0) {
            dialogContent =
                <DialogContent><Typography>Вы еще не приобрели ни одного абонемента</Typography></DialogContent>;
        } else {
            this.props.user.userTickets.sort(
                function (a, b) {
                    if (a.dateCreatedAt < b.dateCreatedAt) {
                        return 1;
                    }
                    if (a.dateCreatedAt > b.dateCreatedAt) {
                        return -1;
                    }
                    return 0;

                }
            );

            dialogContent = <DialogContent>
                {this.props.user.userTickets.map((userTicket) => {
                    let expireDate = Expiration.getDate(userTicket);
                    let more = userTicket.lessonUsers.map((lessonUser) => {
                        return [
                            <ExpansionPanelDetails>

                                <Typography className={classes.mobHeading}>
                                    {lessonUser.lesson.lessonSet.lessonType.name} <br/>
                                    {lessonUser.lesson.lessonSet.trainerUser.name}
                                </Typography>
                                <Typography className={classes.mobHeading}>
                                    {moment(new Date(lessonUser.lesson.startDateTime)).format('LT DD.MM.YYYY')}<br/>
                                    {lessonUser.lesson.hall.name}
                                </Typography>

                            </ExpansionPanelDetails>
                        ];
                    });

                    return (
                        <ExpansionPanel className={userTicket.isActive ? null : classes.inactivePanel}
                                        key={userTicket.id}>
                            <ExpansionPanelSummary key={userTicket.id} expandIcon={<ExpandMore/>}>
                                <Typography className={classes.subHeader}>
                                    {userTicket.ticketPlan.name} <br/>

                                    {userTicket.isActive
                                        ? <span className={classes.isActiveSpan}>Активен</span>
                                        : <span className={classes.isNotActiveSpan}>Не активен</span>
                                    } <br/>
                                    {userTicket.lessonUsers.length > 0 ? 'Истекает' : 'Активировать' } до {expireDate.format('DD.MM.YYYY')}
                                </Typography>
                                <Typography className={classes.default}>
                                    Ост:{userTicket.lessonsExpires} <br/>
                                    Исп:{userTicket.lessonUsers.length}
                                </Typography>
                                {/*<Typography>{moment(new Date(minDate)).format('DD.MM.YYYY')}</Typography>*/}
                            </ExpansionPanelSummary>
                            {more}
                        </ExpansionPanel>
                    );
                })}

            </DialogContent>;
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
                            <Typography variant="h6" color="inherit">
                                Ваши абонементы
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <DialogTitle>Ваши абонементы</DialogTitle>
                    {dialogContent}
                    <DialogActions>
                        <Button
                            onClick={this.props.handleClose}>
                            OK
                        </Button>
                    </DialogActions>

                </Dialog>
            </MuiThemeProvider>
        );

    }
}

export default withStyles(styles)(FitTicketsList);