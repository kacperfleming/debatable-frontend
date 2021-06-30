import React, {useState} from 'react';
import { Typography, Button, Switch, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import {useDispatch} from 'react-redux';

import {authActions} from '../../store/authSlice';
import useForm from "../../shared/hooks/use-form";
import useHttp from "../../shared/hooks/use-http";
import Form from '../../shared/UIElements/Form';

const useStyles = makeStyles({
  headline: {
    marginBottom: "1rem",
    textAlign: 'center'
  },
  form: {
    display: "flex",
    flexDirection: "column",
    padding: "0 10px",
    width: '90%',
    maxWidth: 400,
    margin: '0 auto',

    "& > *": {
      marginBottom: "0.5rem",
    },
  },
  switchGrid: {
      width: 200,
      margin: '0 auto',
      justifyContent: 'center'
  },

});


type props = {};

const Auth = (props: props) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { formState, displayForm, setData } = useForm();
  const { sendRequest, error, isLoading } = useHttp();
  const [isLoggingIn, setIsLoggingIn] = useState(true);

    const onChangeModeHandler = () => {
      setIsLoggingIn(prevState => {
        
        if(!prevState) {
          setData({
              email: {
                  elementType: "input",
                  inputType: "email",
                  value: "",
                  label: "email",
                  isValid: false,
                  required: true,
                  warning: "",
                  validatiors: {
                    isEmail: true,
                    minLength: 8,
                    maxLength: 64,
                  },
                },
                password: {
                  elementType: "input",
                  inputType: "password",
                  value: "",
                  label: "password",
                  isValid: false,
                  required: true,
                  warning: "",
                  validatiors: {
                    minLength: 8,
                    maxLength: 24,
                  },
                },
              });
      } else {
            setData({
              email: {
                  elementType: "input",
                  inputType: "email",
                  value: "",
                  label: "email",
                  isValid: false,
                  required: true,
                  warning: "",
                  validatiors: {
                    isEmail: true,
                    minLength: 8,
                    maxLength: 64,
                  },
                },
                userName: {
                  elementType: "input",
                  inputType: "text",
                  value: "",
                  label: "name",
                  isValid: false,
                  required: true,
                  warning: "",
                  validatiors: {
                    minLength: 4,
                    maxLength: 24,
                  },
                },
                password: {
                  elementType: "input",
                  inputType: "password",
                  value: "",
                  label: "password",
                  isValid: false,
                  required: true,
                  warning: "",
                  validatiors: {
                    isPassword: true,
                    minLength: 8,
                    maxLength: 24,
                  },
                },
                confirmPassword: {
                  elementType: "input",
                  inputType: "password",
                  value: "",
                  label: "confirm password",
                  isValid: false,
                  required: true,
                  warning: "",
                  validatiors: {
                    isPassword: true,
                    minLength: 8,
                    maxLength: 24,
                  },
                },
            })
        }

        return !prevState
      })
    };

  const onSubmitHandler = () => {
    if(isLoggingIn) {
        sendRequest('http://localhost:5000/users/login', 'POST', {
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
        })
        .then(response => {
            dispatch(authActions.login(response?.data.token));
        });
    } else {
        sendRequest('http://localhost:5000/users/signup', 'POST', {
            email: formState.inputs.email.value,
            userName: formState.inputs.firstName.value,
            password: formState.inputs.password.value,
            confirmPassowrd: formState.inputs.confirmPassword.value
        })
        .then(response => {
            
        });
    }
  }

  return (
      <Form headline={isLoggingIn ? 'Log in' : 'Sign up'} onSubmit={onSubmitHandler} additives={
        <Typography component="div">
        <Grid className={classes.switchGrid} component="label" container alignItems="center" spacing={1}>
          <Grid item>Sign up</Grid>
          <Grid item>
            <Switch checked={isLoggingIn} onChange={onChangeModeHandler} name="checkedC" />
          </Grid>
          <Grid item>Log in</Grid>
        </Grid>
      </Typography>
      }>
        {displayForm}
      </Form>
  );
};

export default Auth;
