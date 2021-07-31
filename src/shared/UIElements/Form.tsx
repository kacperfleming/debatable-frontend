import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  formWrapper: {
    display: "flex",
    flexDirection: "column",
    height: "calc(100vh - 64px)",
    background: "inherit",
    justifyContent: "center",
    alignContent: "center",
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
    margin: "0 auto",
    color: 'inherit',

    "& > *": {
      marginBottom: "0.5rem",
    },
  },
});

interface Props {
  headline: string;
  onSubmit: () => void;
  children: JSX.Element[] | JSX.Element;
  buttonText?: string;
  additives?: JSX.Element;
  headlineStyles?: string;
  buttonStyles?: string;
};

const Form = (props: Props) => {
  const classes = useStyles();

  return (
    <Paper square elevation={0} component="div" className={classes.formWrapper}>
      <Typography
        color="inherit"
        className={`${classes.headline} ${props.headlineStyles}`}
        variant="h4"
        component="h1"
      >
        {props.headline}
      </Typography>
      {props.additives}
      <form className={classes.form}>{props.children}</form>
    </Paper>
  );
};

export default Form;
