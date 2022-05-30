/* eslint-disable */
import React, { useState, useCallback, useEffect } from 'react';
import Router from 'next/router';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Alert } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { useAuth } from '../../../lib/hooks/useAuth';
import firebase, { initializeApp, } from "firebase/app";
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";

import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const app = initializeApp({
  apiKey: "AIzaSyCOnXDWQ369OM1lW0VC5FdYE19q1ug0_dc",
  authDomain: "earmark-8d1d3.firebaseapp.com",
  projectId: "earmark-8d1d3",
  storageBucket: "earmark-8d1d3.appspot.com",
  messagingSenderId: "46302537330",
  appId: "1:46302537330:web:403eac7f28d2a4868944eb",
  measurementId: "G-5474KY2MRV"
});


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        Earmark
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



const theme = createTheme();

function SignIn() {

  const auth = useAuth();
  const firebaseAuth = getAuth();
  const [userEmail, setUserEmail] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const DialogTransition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = (event) => {
    event.preventDefault();
    setOpenDialog(true);
  };

  const PasswordResetDialog = () => {
    const [setEmail, setSetEmail] = useState('');
    return (
        <Dialog
        open={openDialog}
        TransitionComponent={DialogTransition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        >
        <DialogTitle>Request password reset email</DialogTitle>
        <DialogContent>
            <DialogContentText id="delete-account-dialog-info">
            Please enter your account email.
            </DialogContentText>
            <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            required
            value={setEmail}
            onChange={(e) => setSetEmail(e.target.value)}
            variant="standard"
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={() => handlePasswordReset(setEmail)}>Send password reset email</Button>
        </DialogActions>
        </Dialog>
    )
};

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    // @ts-ignore
    signInWithEmailAndPassword(firebaseAuth, email, password)
    .then((userCredential) => {
      console.log(userCredential);
      Router.push('/account');
    }).catch((error) => {
      if (error == 'FirebaseError: Firebase: Error (auth/wrong-password).') {
        console.log(error);
        setPasswordError(true);
      } else if (error == 'FirebaseError: Firebase: Error (auth/user-not-found).') {
        console.log(error)
        setLoginError(true);
      }
    })
  };

  const handlePasswordReset = async (setEmail) => {
    console.log(setEmail);
    sendPasswordResetEmail(firebaseAuth, setEmail)
    .then(() => {
      console.log("Password reset email sent");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <PasswordResetDialog />
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              value={userEmail}
              onChange={(event) => setUserEmail(event.target.value)}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {loginError ? <Alert severity="error">Email/password is incorrect, please try again</Alert> : null}
            {passwordError ? <Alert severity="error">Incorrect password, please try again</Alert> : null}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="" onClick={(event) => handleOpenDialog(event)} variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/auth/signUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;