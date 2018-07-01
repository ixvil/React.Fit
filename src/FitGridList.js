import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    GridList,
    GridListTile,
    IconButton,
    GridListTileBar
} from "@material-ui/core";
import {Add, Done} from '@material-ui/icons'
import moment from "moment";
import ru from 'moment/locale/ru'
import ArrayTools from "./Tools/ArrayTools";

class FitGridList extends React.Component {

    url = {
        'host': process.env.REACT_APP_API_HOST,
        'lessonsMethod': 'lesson/',
        'lessonUserMethod': 'lessonUser/'
    }

    constructor(props) {
        super(props);
        moment.locale('ru');
        this.fillDays();
        this.getLessons();
    }

    fillDays() {
        let today = new Date();
        let todayMoment = moment(today);
        const days = 7;//Math.round(window.innerWidth / 250);
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
        phone: {},
        lessons: {}
    };

    handleOpen = (lesson) => {
        this.setState({open: true, dialog: lesson});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleApplication = () => {

        if (this.props.user.login !== false) {
            fetch(this.url.host + this.url.lessonUserMethod,
                {
                    'method': 'POST',
                    'credentials': 'include',
                    'headers': {'Accept': 'application/json'},
                    'body': JSON.stringify({
                        "state": this.state
                    })
                }
            ).then(function (response) {
                return response.json();
            }).then((data) => {

                if (typeof data.error !== "undefined") {
                    alert(data.error);
                } else {
                    alert('Ура! Вы записаны за занятие');
                    this.setLessons(data.lessons);
                    this.setState({'user': data.user});
                }
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
        headerGridList: {
            background: 'rgb(72, 72, 72)'
        },
        gridList: {
            display: 'flex',
            // flexWrap: 'nowrap',
            overflowX: 'auto',
            overflowY: 'auto',
            margin: 0,
            padding: 0
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
            <GridListTile
                key={Math.random()}
                title=''
                rows={1}
                subtitle=''
            >
                <img src='' alt=''/>

            </GridListTile>
        );
    }

    getNextTile(lesson) {
        let iconButton = <IconButton>
            <Add onClick={() => {
                this.handleOpen(lesson);
            }}/>

        </IconButton>;

        const canApply = (lesson.lessonSet.usersLimit - lesson.lessonUsers.length) > 0;
        const freePlacesText = canApply
            ? 'Осталось ' + (lesson.lessonSet.usersLimit - lesson.lessonUsers.length) + ' мест'
            : (<b>Мест нет</b>)
        ;

        if (this.checkApplied(this.props.user.user.id, lesson.lessonUsers)) {
            iconButton = <IconButton>
                <Done style={{"color": "#00FF00"}}/>

            </IconButton>;
        }

        return (
            <GridListTile
                key={'key_' + lesson.id}
                rows={2}
                id={lesson.id}
            >
                <img src={lesson.lessonSet.lessonType.image} alt=''/>
                <GridListTileBar
                    title={moment(new Date(lesson.startDateTime)).format('LT') + ' ' + lesson.hall.name}
                    titlePosition="top"
                    actionIcon={canApply || this.checkApplied(this.props.user.user.id, lesson.lessonUsers) ? iconButton : null}
                    subtitle={
                        <span>
                            <br/>{lesson.lessonSet.trainerUser.name}
                        </span>}
                />
                <GridListTileBar
                    title={lesson.lessonSet.lessonType.name}
                    titlePosition="bottom"
                    subtitle={freePlacesText}
                ></GridListTileBar>
            </GridListTile>
        );
    }

    render() {

        let buttonLabel = "Согласен";
        if (this.props.user.login === false) {
            buttonLabel = "Авторизуйтесь, что бы записаться"
        }

        const actions = [
            <Button
                onClick={this.handleApplication}
                disabled={!this.props.user.login}
                key={"button_apply_" + this.state.dialog.id}
            >{buttonLabel}</Button>,
        ];
        let dialog = <Dialog
            fullWidth={true}
            open={this.state.open}
            onClose={this.handleClose}
        >
            <DialogTitle>{"Записаться на " + this.state.dialog.lessonSet.lessonType.name + "?"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {this.state.dialog.lessonSet.lessonType.name} проходит в {this.state.dialog.hall.name}. <br/>
                    Время проведение
                    занятия: {moment(new Date(this.state.dialog.startDateTime)).format('LT DD.MM.YYYY')}
                    <br/>
                    Тренер: {this.state.dialog.lessonSet.trainerUser.name} <br/>
                    Осталось: {this.state.dialog.lessonSet.usersLimit - this.state.dialog.lessonUsers.length} мест
                    <br/>
                </DialogContentText>
                <DialogActions>
                    {actions}
                </DialogActions>
            </DialogContent>
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
        if (Object.keys(this.state.lessons).length === 0) {
            return;
        }
        return (
            <GridList
                cellHeight={68}
                style={this.styles.gridList}
                cols={this.days.length}
                key={"grid_list"}
                /*{this.days.length}*/
            >
                {/*<Subheader>December</Subheader>*/}
                {this.days.map((day) => {
                    return (
                        <GridListTile
                            key={'card_' + day.key}
                        >
                            <GridListTileBar
                                style={this.styles.headerGridList}
                                title={day.day}
                                subtitle={day.date}

                            />
                        </GridListTile>
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
                if (typeof tempLessonsArray[date] !== 'object') {
                    tempLessonsArray[date] = Object.assign([], this.state.lessons[day.date]);
                }
                if (typeof tempLessonsArray[date] === 'object' && tempLessonsArray[date].length !== 0) {
                    array.push(tempLessonsArray[date].shift());
                } else {
                    array.push(null);
                    k++;
                }
                return null;
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
        return fetch(this.url.host + this.url.lessonsMethod,
            {
                // 'method': 'POST',
                'credentials': 'include',
            })
            .then(function (response) {
                // The response is a Response instance.
                // You parse the data into a usable format using `.json()`
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

            if (typeof(newData[day]) !== 'object') {
                newData[day] = [];
            }
            newData[day].push(element);
            return null;
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


    checkApplied(id, lessonUsers) {
        let applied = false;
        let applies = lessonUsers.map((lessonUser) => {
            return id === lessonUser.user.id;
        })
        applies.push(0);

        applied = applies.reduce(ArrayTools.sum);

        return applied;
    }
}


export default FitGridList;