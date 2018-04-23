import React from "react";
import {
     Card, CardHeader, Dialog, FlatButton, GridList, GridTile, IconButton
} from "material-ui";
import StaticHelper from "./StaticHelper";
import Add from 'material-ui/svg-icons/content/add'

class FitGridList extends React.Component {

    state = {
        open: false,
    };


    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    lessons = [
        {
            'title': 'Aerostretching',
            'trainer': 'Конова',
            'room': 'Малый зал',
            'time': '8:00-9:00',
            'img': 'https://static.wixstatic.com/media/7601f5_c2a45bc4991d41df8152b7e48d724448~mv2.jpg/v1/fill/w_690,h_460,al_c,q_90/file.jpg',
            'avatar': "https://yt3.ggpht.com/-KXF8hg1XoF8/AAAAAAAAAAI/AAAAAAAAAAA/8-1QnMLf-IU/s240-c-k-no-mo-rj-c0xffffff/photo.jpg",

        },
        {
            'title': 'TRX',
            'trainer': 'Яковлева',
            'room': 'Малый зал',
            'time': '9:00-10:00',
            'img': 'https://www.fitmost.ru/blog/wp-content/uploads/2016/11/trx1-1.jpg',
            'avatar': "https://s1.1zoom.ru/prev2/501/500373.jpg"

        },
        {
            'title': 'Школа шпагата',
            'trainer': 'Даратонов',
            'room': 'Большой зал',
            'time': '10:00-11:00',
            'img': 'https://www.nastol.com.ua/large/201602/164723.jpg',
            'avatar': "http://i.playground.ru/i/09/64/16/10/user/avatar.jpg?v1"
        },
        {
            'title': 'Yoga',
            'trainer': 'Ан Хи',
            'room': 'Большой зал',
            'time': '11:00-12:00',
            'img': 'https://diet-diet.ru/wp-content/uploads/2017/05/kak-zanimatsya-jogoj-i-vypolnyat-asany-pravilno_1489526281-1140x570.jpg',
            'avatar': ''
        },
        {
            'title': '',
            'trainer': '',
            'room': '',
            'time': '',
            'img:': '',
            'avatar': ''
        },
        {
            'title': '',
            'trainer': '',
            'room': '',
            'time': '',
            'img:': '',
            'avatar': ''
        }

    ];
    days = [
        {'day': 'Понедельник', 'date': '23 апр', 'key': 'mon'},
        {'day': 'Вторник', 'date': '24 апр', 'key': 'tue'},
        {'day': 'Среда', 'date': '25 апр', 'key': 'wed'},
        {'day': 'Четверг', 'date': '26 апр', 'key': 'thu'},
        {'day': 'Пятница', 'date': '27 апр', 'key': 'fri'},
        // {'day': 'Суббота', 'date': '28 апр'},
        // {'day': 'Воскресение', 'date': '29 апр'}
    ];

    justArray = Array(100).fill(null);

    styles = {
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
        },
        gridList: {
            width: 1400,
            height: 950,
            overflowY: 'auto',
        },
    };
    time = 8;


    getRandomTile() {
        const iconButton = <IconButton>
            <Add color="white" onClick={this.handleOpen}/>

        </IconButton>;
        let lesson = StaticHelper.getRandom(this.lessons);
        this.time += 1 / 5;
        return (
            <GridTile
                key={this.time}
                title={lesson.title}
                rows={2}
                subtitle={<span> <b>{lesson.trainer}</b>  <b>{parseInt(this.time)}:00</b></span>}
                actionIcon={iconButton}
                titlePosition="top"

            >

                <img src={lesson.img}/>
            </GridTile>
        );
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleClose}
            />,
        ];

        return (
            <div>
                <GridList
                    cellHeight={80}
                    style={this.styles.gridList}
                    cols={5}
                >
                    {this.days.map((day) => {
                        return (
                            <Card key={'card_' + day.key}>
                                <CardHeader
                                    title={day.day}
                                    subtitle={day.date}
                                />

                            </Card>
                        );
                    })}

                    {this.justArray.map((v) => {
                        return this.getRandomTile();
                    })}

                </GridList>
                <Dialog
                    title="Dialog With Actions"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    The actions in this window were passed in as an array of React objects.
                </Dialog>
            </div>
        );
    }
}


export default FitGridList;