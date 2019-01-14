import React from 'react';
import ReactDOM from 'react-dom';
import {
    MuiThemeProvider,
    createMuiTheme
} from '@material-ui/core/styles';
import './index.css'
import FitAuthContainer from "./FitAuthContainer";
import {
    BrowserRouter,
    Route
} from "react-router-dom";

class Fit extends React.Component {

    render() {

        let darkBaseTheme = createMuiTheme({
            palette: {
                type: 'dark',
            },
        });
        return (

            <MuiThemeProvider theme={darkBaseTheme}>
                <FitAuthContainer
                    documentId={this.props.match.params.documentId}
                />
            </MuiThemeProvider>
        );
    }
}

// ========================================

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route exact path="/schedule" component={Fit}/>
            <Route exact path="/" component={Fit}/>
            <Route path="/documents/:documentId" component={Fit}/>
        </div>
    </BrowserRouter>,
    document.getElementById('root')
);

