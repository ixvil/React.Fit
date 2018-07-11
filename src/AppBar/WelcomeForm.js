import React from "react";
import {
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    DialogActions,
    TextField
} from "@material-ui/core"

class WelcomeForm extends React.Component {

    state = {
        welcomeName: ''
    }

    render() {
        return (
            <Dialog
                open={this.props.open}
            >
                <DialogTitle>Представьтесь пожалуйста</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Нам бы очень хотелось обращаться к вам по имени и фамилии, поэтому мы бы очень хотели их узнать
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Имя Фамилия"
                        type="text"
                        fullWidth
                        onChange={this.handleNameChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleCloseWelcome}>
                        Отмена
                    </Button>
                    <Button onClick={() => {
                        this.handleSendWelcome()
                    }}>
                        Сохранить
                    </Button>
                </DialogActions>
            </Dialog>

        );
    }

    handleNameChange = (text) => {
        this.setState({welcomeName: text.target.value});
    }


    handleSendWelcome = () => {
        fetch(this.props.config.url.host + this.props.config.url.welcomeFormMethod,
            {
                'method': 'POST',
                'credentials': 'include',
                'body': JSON.stringify({
                    "name": this.state.welcomeName
                })
            })
            .then(function (response) {
                return response.json();

            }).then((data) => {
            if (typeof data.error !== "undefined") {
                alert(data.error);
            } else {
                this.props.handleSetUser(data);
                this.props.handleCloseWelcome();
            }
        }).catch((error) => {
            console.error(error);
        });
    }
}

export default WelcomeForm;