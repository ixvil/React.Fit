import React from "react";
import {
    List,
    ListItem,
    ListSubheader,
    ListItemIcon,
    ListItemText,
    IconButton,
    ListItemSecondaryAction
} from "@material-ui/core";
import {
    Done, Close, Cancel
} from "@material-ui/icons";

class LessonUserList extends React.Component {
    render() {
        const count = this.props.lesson.lessonUsers.length;

        let done = <Done style={{"color": "#00FF00"}}/>;
        let cancel = <Close style={{"color": "#FF0000"}}/>;
        let none = <Done style={{"color": "#FFFFFF"}}/>;

        return (
            <List

            >

                <ListSubheader>{count > 0 ? "" : "Никто не записан"}</ListSubheader>
                {this.props.lesson.lessonUsers.map((lessonUser) => {
                        let button;
                        if (lessonUser.status.id === 3) {
                            button = cancel;
                        } else if (lessonUser.status.id === 2) {
                            button = done;
                        } else {
                            button = none;
                        }
                        return (
                            <ListItem
                                key={lessonUser.id}
                                onClick={() => {
                                    if (window.confirm(lessonUser.user.name + " пришла на занятие?")) {
                                        this.props.clickHandler(lessonUser.user.id);
                                    }
                                }}
                            >

                                <ListItemIcon>
                                    {button}
                                </ListItemIcon>
                                <ListItemText>{lessonUser.user.name}<br/>{lessonUser.user.phone} </ListItemText>

                                <ListItemSecondaryAction>
                                    <IconButton
                                        aria-label="Delete"
                                        onClick={() => {
                                            if (window.confirm(lessonUser.user.name + " отменить запись?")) {
                                                this.props.cancelClickHandler(lessonUser.id);
                                            }
                                        }}
                                    >
                                        <Cancel/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        );
                    }
                )}
            </List>
        );
    }
}


export default LessonUserList;