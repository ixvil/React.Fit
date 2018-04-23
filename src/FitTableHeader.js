import React from "react";
import {
    TableHeader,
    TableHeaderColumn,
    TableRow,
} from 'material-ui/Table';


class FitTableHeader extends TableHeader {

    days = ['Понедельник','Вторник', 'Среда', 'Четверг', 'Пятница']; //, 'Суббота', 'Воскресение'];

    getDayRow() {
        return this.days.map((day) => {
            return (
                <TableHeaderColumn>
                    {day}
                </TableHeaderColumn>
            );
        })
    }

    render() {
        return (
            <TableHeader displaySelectAll={false}>
                <TableRow>
                    {/*<TableHeaderColumn>10</TableHeaderColumn>*/}
                    {this.getDayRow()}
                </TableRow>
            </TableHeader>
        );
    }
}



export default FitTableHeader;