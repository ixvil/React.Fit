import React from "react";
import {
    Card, CardHeader, Dialog, FlatButton, GridList, GridTile, IconButton
} from "material-ui";
import Add from 'material-ui/svg-icons/content/add'
import moment from "moment";

class FitGridList extends React.Component {

    constructor() {
        super();
        this.getLessons();
    }

    state = {
        open: false,
        lessons: {
            '2018-04-24': [{
                'lessonSet': {
                    'lessonType': {
                        'name': '',
                        'image': ''
                    },
                    'trainerUser': {
                        'name': ''
                    }
                },
                'hall': {
                    'name': ''
                }
            }]
        }
    };


    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    days = [
        {'day': 'Понедельник', 'date': '2018-04-24', 'key': 'mon'},
        {'day': 'Вторник', 'date': '2018-04-25', 'key': 'tue'},
        {'day': 'Среда', 'date': '2018-04-26', 'key': 'wed'},
        {'day': 'Четверг', 'date': '2018-04-27', 'key': 'thu'},
        {'day': 'Пятница', 'date': '2018-04-28', 'key': 'fri'},
        // {'day': 'Суббота', 'date': '2018-04-29', 'key': 'sat'},
        // {'day': 'Воскресение', 'date': '2018-04-30', 'key': 'sun'}
    ];

    styles = {
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
        },
        gridList: {
            width: 280,
            height: 2800,
            overflowY: 'auto',
            margin:0
        },
        floatdiv: {
            marginLeft: 10,
            display: 'flex'
            // float: left,left
        }
    };
    time = 8;


    getNextTile(lesson) {
        const iconButton = <IconButton>
            <Add color="white" onClick={this.handleOpen}/>

        </IconButton>;
        return (
            <GridTile
                key={lesson.id}
                title={<span>{lesson.lessonSet.lessonType.name} ({lesson.hall.name})</span>}
                rows={2}
                subtitle={
                    <span> <b>{lesson.lessonSet.trainerUser.name}</b>  <b>{moment(new Date(lesson.startDateTime)).format('LT')}</b></span>}
                actionIcon={iconButton}
                titlePosition="top"

            >

                <img src={lesson.lessonSet.lessonType.image}/>
            </GridTile>
        );
    }

    render() {


        const actions = [
            <FlatButton
                label="Нет"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Согласен"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleClose}
            />,
        ];

        return (
            <div >
                <div style={this.styles.floatdiv}>
                    {this.days.map((day) => {
                        console.log(day);
                        if (typeof(this.state.lessons[day.date]) != 'object') {
                            this.state.lessons[day.date] = [];
                        }
                        return (
                            <GridList
                                cellHeight={80}
                                style={this.styles.gridList}
                                cols={1}
                            >
                                <Card key={'card_' + day.key}>
                                    <CardHeader
                                        title={day.day}
                                        subtitle={day.date}
                                    />
                                </Card>

                                {this.state.lessons[day.date].map((lesson) => {
                                    return this.getNextTile(lesson);
                                })}
                            </GridList>
                        );
                    })}

                </div>
                <Dialog
                    title="Записаться на занятие"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    Записываясь на занятие, вы подтверждаете свое присутсвие и прочая фигня.
                </Dialog>
            </div>
        );
    }

    getLessons() {
        return fetch('http://127.0.0.1:8000/client/lesson/')
            .then(function (response) {
                // The response is a Response instance.
                // You parse the data into a useable format using `.json()`
                return response.json();
            }).then((data) => {
                let newData = {};
                data.map((element) => {
                    let day = moment(new Date(element.startDateTime)).format('YYYY-MM-DD');
                    if (typeof(newData[day]) != 'object') {
                        newData[day] = [];
                    }
                    newData[day].push(element);
                });
                this.setState({'lessons': newData});
            })
            .catch((error) => {
                console.error(error);
            });
    }
}


export default FitGridList;