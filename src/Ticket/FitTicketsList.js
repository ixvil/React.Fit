import React from "react";

import {
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
import {ExpandMore} from "@material-ui/icons"
import moment from "moment/moment";
import {createMuiTheme, withStyles} from "@material-ui/core/styles/index";

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
        console.log(this.props.user);

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

        return (
            <MuiThemeProvider theme={this.whiteBaseTheme}>
                <Dialog
                    fullScreen
                    maxWidth='md'
                    open={this.props.open}
                    onClose={this.props.handleClose}
                >
                    <DialogTitle>Ваши абонементы</DialogTitle>
                    <DialogContent>
                        {this.props.user.userTickets.map((userTicket) => {
                            let minDate = this.getMinDate(userTicket.lessonUsers);
                            let maxDate = moment(minDate).add(userTicket.ticketPlan.daysToOutdated, 'day');
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
                                <ExpansionPanel className={userTicket.isActive ? null : classes.inactivePanel}>
                                    <ExpansionPanelSummary key={userTicket.id} expandIcon={<ExpandMore/>}>
                                        <Typography className={classes.subHeader}>
                                            {userTicket.ticketPlan.name} <br/>

                                            {userTicket.isActive
                                                ? <span className={classes.isActiveSpan}>Активен</span>
                                                : <span className={classes.isNotActiveSpan}>Не активен</span>
                                            } <br/>
                                            Истекает {maxDate.format('DD.MM.YYYY')}
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

                    </DialogContent>
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

    getMinDate(lessonUsers) {
        let minDate = new Date();
        for (let i = 0; i < lessonUsers.length; i++) {
            let lessonUser = lessonUsers[i];
            let curDate = new Date(lessonUser.lesson.startDateTime);
            if (curDate < minDate) {
                minDate = curDate;
            }
        }

        return minDate;
    }

}

export default withStyles(styles)(FitTicketsList);