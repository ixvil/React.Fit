import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import './index.css';
import FitGridList from "./GridList";

class Fit extends React.Component {

    render() {
        return (
            <MuiThemeProvider
                muiTheme={getMuiTheme(darkBaseTheme)}>
                {/*<MyAwesomeReactComponent />*/}
                <FitGridList/>
            </MuiThemeProvider>
        );
    }
}

// ========================================

ReactDOM.render(
    <Fit/>,
    document.getElementById('root')
);

