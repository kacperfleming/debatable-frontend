import {ReactElement} from 'react';

import {Paper, Typography, Button} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { callbackify } from 'util';

const useStyles = makeStyles({
  formWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100vh - 74px)',
    justifyContent: 'center',
    alignContent: 'center'
  },
  headline: {
    marginBottom: "1rem",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    padding: "0 10px",
    width: "90%",
    maxWidth: 400,
    margin: "0 auto 100px",

    "& > *": {
      marginBottom: "0.5rem",
    },
  },
});

type props = {
    headline: string;
    onSubmit: () => void;
    children: JSX.Element[] | JSX.Element;
    buttonText?: string;
    additives?: JSX.Element;
    headlineStyles?: string;
    buttonStyles?: string;
};

const Form = (props: props) => {
    const classes = useStyles();

    return (
        <Paper component="div" className={classes.formWrapper}>
        <Typography className={`${classes.headline} ${props.headlineStyles}`} variant="h4" component="h1">
          {props.headline}
        </Typography>
        {props.additives}
        <form className={classes.form}>
            {props.children}
            <Button className={props.buttonStyles} variant="contained" color="primary" onClick={props.onSubmit}>{props.buttonText || 'Submit'}</Button>
        </form>

      </Paper>
    )
};

export default Form;
