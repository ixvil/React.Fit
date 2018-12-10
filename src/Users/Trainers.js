import React from "react";
import {
    createMuiTheme,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, MuiThemeProvider,
    Typography, withStyles,
    ExpansionPanel,
    ExpansionPanelActions,
    ExpansionPanelDetails,
    ExpansionPanelSummary
} from '@material-ui/core';
import {ExpandMore} from '@material-ui/icons';

const styles = theme => ({
    dialog: {
        backgroundColor: '#eeeeee'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
});

class Trainers extends React.Component {
    whiteBaseTheme = createMuiTheme({
        palette: {
            type: 'light',
        },
    });


    render() {
        const {classes} = this.props;

        return (
            <MuiThemeProvider theme={this.whiteBaseTheme}>
                <Dialog
                    fullScreen
                    open={this.props.open}

                >
                    <DialogTitle
                        className={classes.dialog}
                    >Наши тренеры</DialogTitle>
                    <DialogContent
                        className={classes.dialog}
                    >
                        <Card>
                            <CardHeader
                                title={"Кристина Орлова"}
                                subheader={"TRX, Strong body, Slim body"}
                            />


                            <CardMedia
                                className={classes.media}
                                image={"https://scontent-arn2-1.cdninstagram.com/vp/a82dc740d8ff2764b8a5f060379034ca/5C34CB39/t51.2885-15/e35/s240x240/38432022_926079724247834_1254192559954067456_n.jpg"}
                                title="Кристина Орлова"
                            />
                            <CardContent
                                className={classes.cardContent}
                            >
                                <Typography>
                                    Доброе утро! <br/>
                                    На связи Кристина Орлова @orlovafit, я тренер «Stretch and Go» по
                                    направлению Strong Body + Stretching.
                                    <br/>
                                    Давайте знакомиться?
                                </Typography>
                                <ExpansionPanel>
                                    <ExpansionPanelSummary expandIcon={<ExpandMore/>}>
                                        <Typography className={classes.heading}>Вот несколько фактов обо
                                            мне:</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Typography>
                                            Родилась в городе Домодедово
                                            Спорт в моей жизни был всегда. В детстве увлекалась лёгкой атлетикой и
                                            боксом. Потом
                                            несколько лет активно посещала тренажёрный зал и групповые тренировки. А
                                            позже я
                                            открыла
                                            для себя уличные тренировки с лентами и эспандерами, но занималась ими
                                            только для
                                            себя.
                                            В 2016 году начала изучать основы правильного питания. Углубляясь в эту
                                            тему,
                                            настолько
                                            ей заинтересовалась, что решила закончить курсы спортивного диетолога. Я
                                            поняла, что
                                            хочу помочь людям, которые имеют проблемы с лишним весом, а в этом вопросе
                                            без
                                            правильно
                                            организованного питания не обойтись.
                                        </Typography>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>


                            </CardContent>

                        </Card>
                        <br/>
                        <Card>
                            <CardHeader
                                title={"Кристина Орлова"}
                                subheader={"TRX, Strong body, Slim body"}
                            />


                            <CardMedia
                                className={classes.media}
                                image={"https://scontent-arn2-1.cdninstagram.com/vp/a82dc740d8ff2764b8a5f060379034ca/5C34CB39/t51.2885-15/e35/s240x240/38432022_926079724247834_1254192559954067456_n.jpg"}
                                title="Кристина Орлова"
                            />
                            <CardContent
                                className={classes.cardContent}
                            >
                                <Typography>
                                    Доброе утро! <br/>
                                    На связи Кристина Орлова @orlovafit, я тренер «Stretch and Go» по
                                    направлению Strong Body + Stretching.
                                    <br/>
                                    Давайте знакомиться? Вот несколько фактов обо
                                    мне:
                                    ⠀</Typography>
                                <Typography>
                                    Родилась в городе Домодедово<br/>
                                    Спорт в моей жизни был всегда. В детстве увлекалась лёгкой атлетикой и боксом. Потом
                                    несколько лет активно посещала тренажёрный зал и групповые тренировки. А позже я
                                    открыла
                                    для себя уличные тренировки с лентами и эспандерами, но занималась ими только для
                                    себя.
                                    В 2016 году начала изучать основы правильного питания. Углубляясь в эту тему,
                                    настолько
                                    ей заинтересовалась, что решила закончить курсы спортивного диетолога. Я поняла, что
                                    хочу помочь людям, которые имеют проблемы с лишним весом, а в этом вопросе без
                                    правильно
                                    организованного питания не обойтись.
                                </Typography>

                            </CardContent>

                        </Card>
                    </DialogContent>
                </Dialog>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(styles)(Trainers);