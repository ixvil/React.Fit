import React from "react";
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions
} from "@material-ui/core"

class FitPromoCode extends React.Component {

    url = {
        'host': process.env.REACT_APP_API_HOST,
        'promoCodeMethod': 'promoCode/',
    }

    constructor(props) {
        super(props);
    }

    state = {
        'open': false,
        'promoCode': ''
    }

    handleActivate = () => {
        this.sendPromoCode(this.state.promoCode);
    }

    handleTextChange = (text) => {
        this.setState({'promoCode': text.target.value});
    }

    sendPromoCode(promoCode) {
        fetch(this.url.host + this.url.promoCodeMethod,
            {
                'method': 'POST',
                'credentials': 'include',
                'body': JSON.stringify({
                    "promoCode": promoCode
                })
            })
            .then(function (response) {
                return response.json();

            }).then((data) => {
            if (typeof data.error !== "undefined") {
                alert(data.error);
            } else {
                this.props.handleSetUser(data);
                this.props.handleClose();
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    render() {
        return (<div>
            <Dialog
                open={this.props.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Активировать промокод</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Каждый промокод можно ввести только один раз. <br/>Если промокод был введен ранее, его нельзя
                        активировать повторно
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Промокод"
                        type="text"
                        fullWidth
                        onChange={this.handleTextChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose} color="secondary">
                        Отмена
                    </Button>
                    <Button onClick={this.handleActivate}>
                        Активировать
                    </Button>
                </DialogActions>
            </Dialog>
        </div>);
    }
}

export default FitPromoCode;