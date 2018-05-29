import React from "react";
import {
    Card, CardHeader, Dialog, FlatButton, GridList, GridTile, IconButton
} from "material-ui";
import Add from 'material-ui/svg-icons/content/add'
import moment from "moment";

class FitGridList extends React.Component {

    url = {
        'host': '//api.stretchandgo.ru/client/',
        'lessonsMethod': 'lesson/',
        'lessonUserMethod': 'lessonUser/'
    }

    constructor() {
        super();

        this.fillDays();
        this.getLessons();
    }

    fillDays() {
        let today = new Date();
        let todayMoment = moment(today);
        const days = Math.round(window.innerWidth / 350);
        for (let i = 0; i < days; i++) {
            let day = {
                'day': todayMoment.format('dddd'),
                'date': todayMoment.format('YYYY-MM-DD'),
                'key': todayMoment.format('YYYY-MM-DD')
            };
            todayMoment = todayMoment.add(1, 'day');
            this.days.push(day);
        }
    }

    state = {
        open: false,
        dialog: {
            lessonSet: {
                lessonType: {
                    name: 'set'
                },
                trainerUser: {
                    name: ''
                }
            },
            lessonUsers: [],
            hall: {
                name: 'hall'
            },
            startDateTime: '',
            id: 0
        },
        lessons: {}
    };

    handleOpen = (lesson) => {
        console.log(lesson);
        this.setState({open: true, dialog: lesson});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleApplication = () => {
        if (this.state.phone.valid === true) {
            fetch(this.url.host + this.url.lessonUserMethod,
                {
                    'method': 'POST',
                    'headers': {'Accept': 'application/json'},
                    'body': JSON.stringify({
                        "state": this.state
                    })
                }
            ).then(function (response) {
                if (!response.ok) {
                    alert('Вы уже записаны');
                    throw new Error();
                }
                return response.json();
            }).then((data) => {
                alert('Вы успешно записаны на занятие');
                this.setLessons(data);
            }).catch((error) => {
                console.error(error);
            });
        }
    }

    days = [];

    styles = {
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around'
        },

        gridList: {
            display: 'flex',
            // flexWrap: 'nowrap',
            overflowX: 'auto',
            overflowY: 'auto',
            margin: 0,
            // width: 1400,
        },
        gridTile: {
            width: 300
        },
        floatdiv: {
            marginLeft: 10,
            display: 'flex'
            // float: left,left
        }
    };
    time = 8;

    getEmptyTile() {
        return (
            <GridTile
                key=''
                title=''
                rows={2}
                subtitle=''
                titlePosition="top"
            >
                <img src=''/>

            </GridTile>
        );
    }

    getNextTile(lesson) {
        const iconButton = <IconButton>
            <Add color="white" onClick={() => {
                this.handleOpen(lesson);
            }}/>

        </IconButton>;

        const canApply = (lesson.lessonSet.usersLimit - lesson.lessonUsers.length) > 0;
        const freePlacesText = canApply
            ? '(Осталось ' + (lesson.lessonSet.usersLimit - lesson.lessonUsers.length) + ' мест)'
            : (<b> (Мест нет)</b>)
        ;


        return (
            <GridTile
                key={'key_' + lesson.id}
                title={<span>{lesson.lessonSet.lessonType.name} ({lesson.hall.name}) </span>}
                rows={3}
                id={lesson.id}
                subtitle={
                    <span>
                        <b>{lesson.lessonSet.trainerUser.name}</b>
                        <b> {moment(new Date(lesson.startDateTime)).format('LT')}
                        </b> {freePlacesText}</span>}

                actionIcon={canApply ? iconButton : null}
                titlePosition="top"

            >
                <img src={lesson.lessonSet.lessonType.image}/>
            </GridTile>
        );
    }

    render() {

        let buttonLabel = "Согласен";
        if(this.props.user.login === false ){
            buttonLabel = "Авторизуйтесь, что бы записаться"
        }

        const actions = [
            <FlatButton
                label={buttonLabel}
                primary={true}
                keyboardFocused={true}
                onClick={this.handleApplication}
                disabled={!this.props.user.login}
            />,
        ];
        let dialog = <Dialog
            title={"Записаться на " +
            this.state.dialog.lessonSet.lessonType.name + "?"}
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
        >
            {this.state.dialog.lessonSet.lessonType.name} проходит в {this.state.dialog.hall.name}. <br/>
            Время проведение занятия: {moment(new Date(this.state.dialog.startDateTime)).format('LT DD.MM.YYYY')} <br/>
            Тренер: {this.state.dialog.lessonSet.trainerUser.name} <br/>
            Осталось: {this.state.dialog.lessonSet.usersLimit - this.state.dialog.lessonUsers.length} мест
            <br/>
        </Dialog>;

        return (
            <div>
                <div style={this.styles.root}>
                    {this.getGridList()}
                </div>
                {dialog}
            </div>
        );
    }

    getGridList() {
        if (Object.keys(this.state.lessons).length == 0) {
            return;
        }
        return (
            <GridList
                cellHeight={80}
                style={this.styles.gridList}
                cols={this.days.length}
            >
                {/*<Subheader>December</Subheader>*/}
                {this.days.map((day) => {
                    console.log('day+');
                    return (
                        <Card key={'card_' + day.key}>
                            <CardHeader
                                title={day.day}
                                subtitle={day.date}
                            />
                        </Card>
                    );
                })}
                {this.getCards()}
            </GridList>
        );
    }


    getCards() {
        let b = true;
        let array = [];
        let tempLessonsArray = [];


        while (b) {
            let k = 0;
            this.days.map((day) => {
                let date = day.date;
                if (typeof tempLessonsArray[date] != 'object') {
                    tempLessonsArray[date] = Object.assign([], this.state.lessons[day.date]);
                }
                if (typeof tempLessonsArray[date] == 'object' && tempLessonsArray[date].length != 0) {
                    array.push(tempLessonsArray[date].shift());
                } else {
                    array.push(null);
                    k++;
                }
            });
            if (k > this.days.length - 1) {
                b = false
            }

        }
        return array.map((lesson) => {
            if (lesson == null) {
                return this.getEmptyTile();
            } else {
                return this.getNextTile(lesson);
            }
        })
    }

    getLessons() {
        console.log('tuck');
        return fetch(this.url.host + this.url.lessonsMethod)
            .then(function (response) {
                // The response is a Response instance.
                // You parse the data into a usable format using `.json()`
                console.log('tack');
                return response.json();

            }).then((data) => {
                this.setLessons(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    setLessons(data) {
        let newData = {};
        data.map((element) => {
            let day = moment(new Date(element.startDateTime)).format('YYYY-MM-DD');

            if (typeof(newData[day]) != 'object') {
                newData[day] = [];
            }
            newData[day].push(element);
        });
        setTimeout(() => {
            this.setState({'lessons': newData, 'open': false})
        }, 5);
    }

    resize = () => this.render();

    componentDidMount() {
        window.addEventListener('resize', this.resize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize)
    }


}


export default FitGridList;