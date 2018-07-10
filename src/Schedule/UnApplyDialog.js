import React from "react";
import {
    Button,
    Dialog,
    DialogContent,
    DialogActions,
    DialogTitle,
    DialogContentText
} from "@material-ui/core";
import moment from "moment";

class UnApplyDialog extends React.Component {

    render() {
        let title = '';
        let canCancel = false;

        if (this.props.cancel.open) {
            title = 'Отменить запись на '
                + this.props.cancel.lesson.lessonSet.lessonType.name
                + ' в '
                + moment(this.props.cancel.lesson.startDateTime).format('H:m')
                + '?';

            if (moment(this.props.cancel.lesson.startDateTime).unix() > (moment(new Date()).unix() + 60 * 60 * 6)) {
                canCancel = true;
            }

        }


        return (
            <Dialog
                open={this.props.cancel.open}
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Внимание! Отменить запись на занятие можно не позднее, чем за 6 часов до начала.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleCancelClose}>
                        Нет
                    </Button>
                    <Button
                        onClick={() => {
                            this.props.handleCancelApplication(this.props.cancel.lesson);
                        }}
                        autoFocus disabled={!canCancel}
                    >
                        Да
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }


}

export default UnApplyDialog;