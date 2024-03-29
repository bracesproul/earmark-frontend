/* eslint-disable */
import React, { useState, useCallback, useEffect } from 'react';
import Router from 'next/router';
import { useRouter } from 'next/router';
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
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Alert, IconButton } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { useAuth } from '../../../lib/hooks/useAuth';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useFirestore } from '../../../lib/hooks/useFirestore';
import CloseIcon  from '@mui/icons-material/Close';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';


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

function SignIn() {
  const firestore = useFirestore();
  const auth = useAuth();
  const router = useRouter();
  const firebaseAuth = getAuth();
  const [userEmail, setUserEmail] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [providerError, setProviderError] = useState(false);
  const [providerWarning, setProviderWarning] = useState(false);

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
    const response = await auth.signin(email, password);
    if (response == 'success') {
      Router.push('/account');
    } else if (response == 'FirebaseError: Firebase: Error (auth/user-not-found).') {
      console.log(response)
      setLoginError(true);
      setPasswordError(false);
    } else if (response == 'FirebaseError: Firebase: Error (auth/wrong-password).') {
      console.log(response);
      setLoginError(false);
      setPasswordError(true);
    }
  };

  const handlePasswordReset = async (setEmail) => {
    sendPasswordResetEmail(firebaseAuth, setEmail)
    .then(() => {
      console.log("Password reset email sent");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
      setProviderError(true);
    });
  };

  const handleProviderSignin = async (provider) => {
      await auth.signInWithProvider(provider)
      await router.push('/account');
  };

  const warningAlert = (
    <Alert
    severity="warning"
    action={
      <IconButton
        aria-label="close"
        color="inherit"
        size="small"
        onClick={() => {
          setProviderWarning(false);
        }}
      >
        <CloseIcon fontSize="inherit" />
      </IconButton>
    }
    sx={{ mb: 2 }}
    >
      Something went wrong. Please try again in a few minutes.
    </Alert>
  )

  const errorAlert = (
    <Alert
    severity="error"
    action={
      <IconButton
        aria-label="close"
        color="inherit"
        size="small"
        onClick={() => {
          setProviderError(false);
        }}
      >
        <CloseIcon fontSize="inherit" />
      </IconButton>
      }
    sx={{ mb: 2 }}
    >
      An error occurred. Please try again.
    </Alert>
)

  return (
    <>
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main', zIndex: -999 }}>
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
            <Button
            sx={{ mt: 1, mb: 1 }}
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            onClick={() => handleProviderSignin('google')}
            >
              Sign in with Google
            </Button>
            { providerError && errorAlert }
            { providerWarning && warningAlert }
            <Grid container>
              <Grid item xs>
                <Link href="" onClick={(event) => handleOpenDialog(event)} variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/auth/signUp" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </>
  );
}

export default SignIn;