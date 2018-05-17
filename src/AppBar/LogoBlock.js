import {Component} from "react";
import React from "react";
import Phone from 'material-ui/svg-icons/communication/phone';
import FaInstagram from 'react-icons/lib/fa/instagram'
import {FlatButton, GridList, GridTile} from "material-ui";

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
                    <GridTile cols={textCols}>
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
                            <FlatButton primary={true} label="Записаться на занятие"/>
                            <FlatButton secondary={true} label="Купить абонемент онлайн"/>
                        </div>
                    </GridTile>
                    <GridTile><img style={{width: 250}} src={"/strlogo_black.jpg"}/> </GridTile>
                    <GridTile cols={textCols}>
                        <div
                            align="left"
                            style={styles.s}

                        >
                            г. Домодедово, <span style={{whiteSpace: 'nowrap'}}>Племхозский пр. 1</span>
                            <br/>
                            ТЦ Западный, <span style={{whiteSpace: 'nowrap'}}>2 этаж</span>
                            <br/>
                            <div style={{verticalAlign: 'middle'}} className='phoneDiv'>

                                <Phone color='#000000'/> <span style={{fontSize: 20}}>+7(906)018-00-01</span>
                            </div>
                            <div className='instDiv'>
                                <FaInstagram color='#000000'/> <span style={{fontSize: 24}}>@stretchandgo</span>

                            </div>

                        </div>
                    </GridTile>

                </GridList>
                {/*<img src={"/logo.jpg"}/> <br/>*/}
                {/*<div*/}
                {/*align="left"*/}
                {/*style={styles.f}*/}
                {/*>*/}
                {/*Стретчинг*/}
                {/*<br/>*/}
                {/*Силовые тренировки*/}
                {/*<br/>*/}
                {/*TRX*/}

                {/*</div>*/}
                {/*<div*/}
                {/*align="left"*/}
                {/*style={styles.s}*/}

                {/*>*/}
                {/*г. Домодедово,*/}
                {/*Племхозский пр. 1*/}
                {/*<br/>*/}
                {/*ТЦ Западный, 2 этаж*/}
                {/*<br/>*/}
                {/*<div style={{verticalAlign: 'middle'}} className='phoneDiv'>*/}

                {/*<Phone color='#000000'/> <span style={{fontSize: 20}}>+7(906)018-00-01</span>*/}
                {/*</div>*/}
                {/*<div className='instDiv'>*/}
                {/*<FaInstagram color='#000000'/> <span style={{fontSize: 24}}>@stretchandgo</span>*/}

                {/*</div>*/}
                {/*<br/>*/}

                {/*</div>*/}

            </div>
        );
    }
}

export default LogoBlock;