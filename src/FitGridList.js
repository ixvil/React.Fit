import React from "react";
import {
    Card,
    CardMedia,
    CardHeader,
    CardActions,
    CardContent,
    LinearProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Typography,
    CircularProgress,
    Button,
    GridList,
    GridListTile,
    IconButton,
    GridListTileBar
} from "@material-ui/core";
import {Add, Done, PlaylistAddCheck} from '@material-ui/icons'
import moment from "moment-timezone";
import ru from 'moment/locale/ru'
import ArrayTools from "./Tools/ArrayTools";
import UnApplyDialog from "./Schedule/UnApplyDialog";
import FitQRScanner from "./Schedule/FitQRScanner";
import ym from "react-yandex-metrika";
import YMHelper from "./Tools/YMHelper";

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
                },
                usersLimit: 0
            },
            overriddenUsersLimit: null,
            lessonUsers: [],
            hall: {
                name: 'hall'
            },
            startDateTime: '',
            id: 0
        },
        phone: {},
        lessons: {},
        cancel: {
            open: false,
        },
        QRScannerOpen: false
    };

    handleOpen = (lesson) => {
        this.setState({open: true, dialog: lesson});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleCancelOpen = (lesson) => {
        this.setState({cancel: {open: true, lesson: lesson}});
    }

    handleCancelClose = () => {
        this.setState({cancel: {open: false}});
    }

    handleQRScannerOpen = (lesson) => {
        this.setState({QRScannerOpen: true, dialog: lesson});
    }
    handleQRScannerClose = () => {
        this.setState({QRScannerOpen: false});
        this.getLessons();
    }


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
                    ym('reachGoal', YMHelper.YM_GOAL_ACCEPT);
                    alert('Ура! Вы записаны за занятие');
                    this.setLessons(data.lessons);
                    this.setState({'user': data.user});
                }
            }).catch((error) => {
                console.error(error);
            });
        }
    }

    handleCancelApplication = (lesson) => {

        fetch(this.url.host + this.url.lessonUserMethod + 'delete',
            {
                'method': 'POST',
                'credentials': 'include',
                'headers': {'Accept': 'application/json'},
                'body': JSON.stringify({
                    "lesson": lesson
                })
            }
        ).then(function (response) {
            return response.json();
        }).then((data) => {

            if (typeof data.error !== "undefined") {
                alert(data.error);
            } else {
                alert('Отмена произведена успешно');
                this.setLessons(data.lessons);
                this.setState({'user': data.user, cancel: {open: false}});
            }
        }).catch((error) => {
            console.error(error);
        });

    }

    days = [];

    styles = {
        root: {
            // display: 'flex',
            // flexWrap: 'wrap',
            // justifyContent: 'space-around',
            overflowX: 'scroll',

        },
        headerGridList: {
            background: 'rgb(72, 72, 72)'
        },
        gridList: {
            minWidth: 1200,

            display: 'flex',
            // overflowX: 'scroll',
            // overflowY: '',
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

        let iconButton = null;
        let limit = lesson.lessonSet.usersLimit;

        if (lesson.overriddenUsersLimit !== null) {
            limit = lesson.overriddenUsersLimit;
        }

        const canApply = (limit - lesson.lessonUsers.length) > 0;

        if (canApply && this.props.user.user.type.id === 3) {
            iconButton = <IconButton>
                <Add onClick={() => {
                    this.handleOpen(lesson);
                }}/>

            </IconButton>;
        }
        const freePlacesText = canApply
            ? 'Осталось ' + (limit - lesson.lessonUsers.length) + ' мест'
            : (<b>Мест нет</b>)
        ;


        if (this.checkApplied(this.props.user.user.id, lesson.lessonUsers)) {
            iconButton = <IconButton>
                <Done
                    style={{"color": "#00FF00"}}
                    onClick={() => {
                        this.handleCancelOpen(lesson);
                    }}
                />

            </IconButton>;
        }

        if (this.props.user.user.id === lesson.lessonSet.trainerUser.id || this.props.user.user.type.id === 1) {
            iconButton = <IconButton>
                <PlaylistAddCheck
                    onClick={() => {
                        this.handleQRScannerOpen(lesson)
                    }}
                />
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
                    title={moment(new Date(lesson.startDateTime)).tz("Europe/Moscow").format('LT') + ' ' + lesson.hall.name}
                    titlePosition="top"
                    actionIcon={iconButton}
                    subtitle={
                        <span>
                            <br/>{lesson.lessonSet.trainerUser.name}
                        </span>}
                />
                <GridListTileBar
                    title={lesson.lessonSet.lessonType.name}
                    titlePosition="bottom"
                    subtitle={freePlacesText}
                />
            </GridListTile>
        );
    }


    render() {

        let buttonLabel = "Записаться";
        if (this.props.user.login === false) {
            buttonLabel = "Авторизуйтесь, что бы записаться"
        }
        let trainerPhoto = null;
        if (this.state.dialog.lessonSet.photo) {
            trainerPhoto = <img
                src={this.state.dialog.lessonSet.photo}
                title="Trainer photo"
                className="trainerPhoto"
            />;
        }

        const actions = [
            <Button
                onClick={this.props.user.login ? this.handleApplication : this.props.handleLoginOpen}
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
                    занятия: {moment(new Date(this.state.dialog.startDateTime)).tz("Europe/Moscow").format('LT DD.MM.YYYY')}
                    <br/>
                    Тренер: {this.state.dialog.lessonSet.trainerUser.name} <br/>
                    Осталось: {this.state.dialog.lessonSet.usersLimit - this.state.dialog.lessonUsers.length} мест
                </DialogContentText>
                <DialogActions>
                    {actions}
                </DialogActions>
                {trainerPhoto ? this.getTrainerDescriptionBlock(trainerPhoto, actions) : null}

            </DialogContent>
        </Dialog>;

        return (
            <div>
                <div style={this.styles.root}>
                    {this.getGridList()}
                </div>
                {dialog}
                <UnApplyDialog
                    cancel={this.state.cancel}
                    handleCancelClose={this.handleCancelClose}
                    handleCancelApplication={this.handleCancelApplication}
                />
                <FitQRScanner
                    open={this.state.QRScannerOpen}
                    handleQRScannerOpen={this.handleQRScannerOpen}
                    handleQRScannerClose={this.handleQRScannerClose}
                    setLessonHandler={this.handleQRScannerOpen}
                    lesson={this.state.dialog}
                    config={this.props.config}
                />
            </div>
        );
    }

    getTrainerDescriptionBlock(trainerPhoto, actions) {
        return [
            <DialogContentText>
                {trainerPhoto}

                <Typography>
                    {this.state.dialog.lessonSet.description}
                </Typography>
                <br/>
                <Typography>
                    Осталось: {this.state.dialog.lessonSet.usersLimit - this.state.dialog.lessonUsers.length} мест
                </Typography>


            </DialogContentText>,
            <DialogActions>
                {actions}
            </DialogActions>
        ];
    }

    getGridList() {
        if (Object.keys(this.state.lessons).length === 0) {
            return [
                <CircularProgress key={"CircularProgress"}/>,
                <LinearProgress key={"LinearProgress"}/>
            ];
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

    setLessons = (data) => {
        let newData = {};
        data.map((element) => {
            let day = moment(new Date(element.startDateTime)).tz("Europe/Moscow").format('YYYY-MM-DD');

            if (typeof(newData[day]) !== 'object') {
                newData[day] = [];
            }
            newData[day].push(element);
            return null;
        });
        this.setState({'lessons': newData, 'open': false})

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