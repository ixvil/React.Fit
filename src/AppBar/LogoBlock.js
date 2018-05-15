import {Component} from "react";
import React from "react";

class LogoBlock extends Component {
    render() {
        return (
            <div
                style={{
                    height: '400px',
                    fontSize: 30,
                    textAlign: 'center',
                    paddingTop: 100
                }}>
                <img src={"/logo.jpg"}/> <br/>
                <b>Наша студия самая лучшая студия <br/>всех времен и народов</b>

            </div>
        );
    }
}

export default LogoBlock;