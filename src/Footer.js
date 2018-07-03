import React from 'react';
import {
    Paper,
    Button
} from '@material-ui/core'

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Paper className='footer-paper'
            >
                <Button onClick={() => this.props.handleDocumentDialog('contract')}>Договор
                    присоединения</Button>
                <Button onClick={() => this.props.handleDocumentDialog('refund')}>Возврат средств</Button>
                <Button onClick={() => this.props.handleDocumentDialog('payment')}>Процесс оплаты</Button>
                <Button onClick={() => this.props.handleDocumentDialog('rules')}>Правила студии</Button>
                <Button onClick={() => this.props.handleDocumentDialog('confidential')}>Политика
                    конфиденциальности</Button>
                <Button onClick={() => this.props.handleDocumentDialog('data_transfer')}>Передача данных</Button>
            </Paper>
        );
    }

}

export default Footer;