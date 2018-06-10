import {Component} from "react";
import React from "react";
import Phone from '@material-ui/icons/Phone';
import FaInstagram from 'react-icons/lib/fa/instagram'
import {Button, GridList, GridListTile} from "@material-ui/core";

class LogoBlock extends Component {
    render() {
        const styles = {
            'f': {
                paddingLeft: 40,
                marginTop: 40,

            },
            's': {
                paddingLeft: 40,
                marginTop: 30,
                height: 330
            }

        };

        let cols = 5;
        let textCols = 2;

        if (window.innerWidth < 1300) {
            cols = 3;
            textCols = 1;
        }

        if (window.innerWidth < 950) {
            cols = 1;
            textCols = 1;
        }

        return (
            <div
                style={{
                    // height: '400px',
                    fontSize: 30,
                    textAlign: 'center',
                    paddingTop: 100
                }}>

                <GridList
                    cols={cols}
                    cellHeight={250}
                    style={{marginBottom: 100}}
                >
                    <GridListTile cols={textCols}>
                        <div
                            align="left"
                            style={styles.f}
                        >
                            Стретчинг
                            <br/>
                            Силовые тренировки
                            <br/>
                            TRX
                            <br/>
                            <Button color="primary" >Записаться на занятие</Button>
                            <Button color="secondary" >Купить абонемент онлайн</Button>
                        </div>
                    </GridListTile>
                    <GridListTile><img style={{width: 250}} src={"/strlogo_black.jpg"} alt={"Stretch & GO"}/> </GridListTile>
                    <GridListTile cols={textCols}>
                        <div
                            align="left"
                            style={styles.s}

                        >
                            г. Домодедово, <span style={{whiteSpace: 'nowrap'}}>Племхозский пр. 1</span>
                            <br/>
                            ТЦ Западный, <span style={{whiteSpace: 'nowrap'}}>2 этаж</span>
                            <br/>
                            <div style={{verticalAlign: 'middle'}} className='phoneDiv'>

                                <Phone /> <span style={{fontSize: 20}}>+7(906)018-00-01</span>
                            </div>
                            <div className='instDiv'>
                                <FaInstagram /> <span style={{fontSize: 24}}>@stretchandgo</span>

                            </div>

                        </div>
                    </GridListTile>

                </GridList>

            </div>
        );
    }
}

export default LogoBlock;