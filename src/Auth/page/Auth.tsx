import React, {ChangeEvent, useState} from 'react';
import { Typography, Button, Switch, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import {useDispatch} from 'react-redux';
import { useHistory } from 'react-router';

import {authActions} from '../../store/authSlice';
import { userActions } from '../../store/userSlice';
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

  const history = useHistory();

  const dispatch = useDispatch();

  const { formState, displayForm, setData } = useForm(onSubmitHandler);
  const { sendRequest, error, isLoading } = useHttp();
  const [isLoggingIn, setIsLoggingIn] = useState(true);

    const onChangeModeHandler = () => {
      setIsLoggingIn(prevState => {
        
        if(!prevState) {
          setData({
              email: {
                  ...formState.inputs.email,
                  value: formState.inputs.email.value || '',
                  warning: "",
                },
                password: {
                  ...formState.inputs.password,
                  value: "",
                  warning: "",
                },
              });
      } else {
            setData({
              avatar: {
                elementType: 'filepicker',
                isValid: false,
                value: null,
              },
              email: {
                  ...formState.inputs.email,
                  value: formState.inputs.email.value || '',
                  warning: "",
                },
                userName: {
                  elementType: "input",
                  inputType: "text",
                  value: "",
                  label: "name",
                  required: true,
                  warning: "",
                  validatiors: {
                    minLength: 4,
                    maxLength: 24,
                  },
                },
                password: {
                  ...formState.inputs.password,
                  value: "",
                  warning: "",
                },
            })
        }

        return !prevState
      })
    };

  function onSubmitHandler() {
    if(isLoggingIn) {
        sendRequest('http://localhost:5000/api/users/login', {success: 'Logged in.', error: 'Could not log you in. Please, try again.'}, 'POST', {
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
        })
        .then((response:any) => {
          const {user, token} = response?.data;
          const {userId} = user;
          console.log(user);
          localStorage.setItem('jwt', token);
          localStorage.setItem('userId', user.userId);
          dispatch(authActions.login({token, userId}));
          dispatch(userActions.setUserData(user));
          history.replace('/');
        })
        .catch(err => {

        });
    } else {
      console.log(formState.inputs.avatar.value);
      const formData = new FormData();
      formData.append('email', formState.inputs.email.value);
      formData.append('username', formState.inputs.userName.value);
      formData.append('password', formState.inputs.password.value);
      formData.append('avatar', formState.inputs.avatar.value);

        sendRequest('http://localhost:5000/api/users/signup', {success: 'Signed up', error: 'Could not sign you up. Please, try again.'}, 'POST', formData,
        )
        .then((response:any) => {
          if(response?.statusText === 'OK') {
            onChangeModeHandler();
          }
        })
        .catch(err => {
          
        });
    }
  }

  return (
      <Form headline={isLoggingIn ? 'Log in' : 'Sign up'} onSubmit={onSubmitHandler} additives={
        <Typography component="div">
        <Grid className={classes.switchGrid} component="label" container alignItems="center" spacing={1}>
          <Grid item>Sign up</Grid>
          <Grid item>
            <Switch color="default" checked={isLoggingIn} onChange={onChangeModeHandler} name="checkedC" />
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
