import React from 'react';
import FitTableHeader from './FitTableHeader'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

import {
    Table,
    TableBody,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import StaticHelper from "./StaticHelper";


class MyAwesomeReactComponent extends React.Component {

    titles = ['Aerostretching', 'TRX', 'Школа шпагата'];
    trainers = ['Конова', 'Яковлева', 'Ан Хи', 'Даработонович'];
    avatars = [
        "https://yt3.ggpht.com/-KXF8hg1XoF8/AAAAAAAAAAI/AAAAAAAAAAA/8-1QnMLf-IU/s240-c-k-no-mo-rj-c0xffffff/photo.jpg",
        "https://s1.1zoom.ru/prev2/501/500373.jpg",
        "http://i.playground.ru/i/09/64/16/10/user/avatar.jpg?v1"
    ];
    rooms = ['Большой зал', 'Малый зал'];
    times = ['8:00','9:00','11:00','12:00','15:00'];

    getRandom(array){
        return StaticHelper.getRandom(array);
    }
    getCard() {
        return (
            <Card>
                <CardHeader
                    title={this.getRandom(this.titles)}
                    subtitle={this.getRandom(this.trainers)}
                    avatar={this.getRandom(this.avatars)}
                />
                {/*<CardTitle title={this.getRandom(this.titles)} subtitle={this.getRandom(this.trainers)} />*/}
                <CardText>
                    <span>
                        {this.getRandom(this.rooms)} (<b>{this.getRandom(this.times)}</b>)
                    </span>
                </CardText>
                <CardActions>
                    <FlatButton label="Записаться"/>
                </CardActions>
            </Card>
        );
    }



    render() {
        return (
            <Table>
                <FitTableHeader/>
                <TableBody displayRowCheckbox={false}>
                    <TableRow>


                        <TableRowColumn>{this.getCard()}</TableRowColumn>
                        <TableRowColumn>{this.getCard()}</TableRowColumn>
                        <TableRowColumn>{this.getCard()}</TableRowColumn>
                        <TableRowColumn>{this.getCard()}</TableRowColumn>
                        <TableRowColumn>{this.getCard()}</TableRowColumn>


                        </TableRow>
                        <TableRow>
                        <TableRowColumn>{this.getCard()}</TableRowColumn>
                        <TableRowColumn>{this.getCard()}{this.getCard()}{this.getCard()}</TableRowColumn>
                        <TableRowColumn>{this.getCard()}{this.getCard()}{this.getCard()}</TableRowColumn>
                        <TableRowColumn>{this.getCard()}</TableRowColumn>
                        <TableRowColumn>{this.getCard()}</TableRowColumn>


                        </TableRow>
                        <TableRow>
                        {/*<TableRowColumn>8:00</TableRowColumn>*/}
                        <TableRowColumn>{this.getCard()}{this.getCard()}</TableRowColumn>
                        <TableRowColumn>{this.getCard()}</TableRowColumn>
                        <TableRowColumn>{this.getCard()}</TableRowColumn>
                        <TableRowColumn>{this.getCard()}</TableRowColumn>
                        <TableRowColumn>{this.getCard()}{this.getCard()}</TableRowColumn>


                        </TableRow>
                        <TableRow>
                        {/*<TableRowColumn>8:00</TableRowColumn>*/}
                        <TableRowColumn>{this.getCard()}</TableRowColumn>
                        <TableRowColumn>{this.getCard()}</TableRowColumn>
                        <TableRowColumn>{this.getCard()}{this.getCard()}</TableRowColumn>
                        <TableRowColumn>{this.getCard()}</TableRowColumn>
                        <TableRowColumn>{this.getCard()}</TableRowColumn>


                    </TableRow>
                </TableBody>
            </Table>
        );
    }
}

export default MyAwesomeReactComponent;