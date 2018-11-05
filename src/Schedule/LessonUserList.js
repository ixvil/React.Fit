import React from "react";
import {
    List,
    ListItem,
    ListSubheader,
    ListItemIcon,
    ListItemText,
    Divider
} from "@material-ui/core";
import {
    Done, Close
} from "@material-ui/icons";

class LessonUserList extends React.Component {
    render() {
        const count = this.props.lesson.lessonUsers.length;

        let done = <ListItemIcon><Done style={{"color": "#00FF00"}}/></ListItemIcon>;
        let cancel = <ListItemIcon><Close style={{"color": "#FF0000"}}/></ListItemIcon>;

        return (
            <List

            >

                <ListSubheader>{count > 0 ? "Клиенты" : "Никто не записан"}</ListSubheader>
                {this.props.lesson.lessonUsers.map((lessonUser) => {
                        let button;
                        if (lessonUser.status.id === 3) {
                            button = cancel;
                        } else if (lessonUser.status.id === 2) {
                            button = done;
                        } else {
                            button = null;
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
                                <ListItemText>{lessonUser.user.name}<br/>{lessonUser.user.phone} </ListItemText>
                                {button}
                            </ListItem>
                        );
                    }
                )}
            </List>
        );
    }
}


export default LessonUserList;