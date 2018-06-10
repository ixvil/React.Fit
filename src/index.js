import React from 'react';
import ReactDOM from 'react-dom';
import {
    MuiThemeProvider,
    createMuiTheme
} from '@material-ui/core/styles';

import './index.css'
import FitAuthContainer from "./FitAuthContainer";

class Fit extends React.Component {

    render() {

        let darkBaseTheme = createMuiTheme({
            palette: {
                type: 'dark',
            },
        });
        return (

            <MuiThemeProvider theme={darkBaseTheme}>
                <FitAuthContainer/>
            </MuiThemeProvider>
        );
    }
}

// ========================================

ReactDOM.render(
    <Fit/>,
    document.getElementById('root')
);

