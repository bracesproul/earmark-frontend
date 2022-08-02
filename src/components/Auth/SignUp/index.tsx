/* eslint-disable */
import React, { 
  useState, 
  useEffect 
} from 'react';
import Router from 'next/router';
import { useFirestore } from '../../../lib/hooks/useFirestore'
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
import StarIcon from '@mui/icons-material/StarBorder';
import { useAuth } from '../../../lib/hooks/useAuth';
import { GlobalStyles,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Stepper,
  StepLabel,
  Step,
  InputLabel,
  MenuItem,
  Select,
  Alert,
  FormControl
} from '@mui/material';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { PlaidLinkInstitution } from '../../PlaidLink';

const steps = [
  'Sign up', 
  'Finish account setup', 
  'Select your billing plan',
  'Connect your first bank'
];

const STATE_ARRAY = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming']

const tiers = [
  {
    title: 'Free',
    price: '0',
    description: [
      '3 linked accounts',
      'Help center access',
      'Email support',
    ],
    buttonText: 'Sign up for free',
    buttonVariant: 'outlined',
  },
  {
    title: 'Pro',
    subheader: 'Most popular',
    price: '14',
    description: [
      '15 linked accounts',
      '24/7 support',
      'Help center access',
    ],
    buttonText: 'Get started',
    buttonVariant: 'contained',
  },
  {
    title: 'Enterprise',
    price: '49',
    description: [
      '100 linked accounts',
      'Custom data analysis',
      '24/7 support',
      'Help center access',
      'Priority email support',
    ],
    buttonText: 'Contact us',
    buttonVariant: 'outlined',
  },
  {
    title: 'Startup',
    price: 'Contact us',
    description: [
        'Unlimited accounts',
        'All features',
        'Industry leading visualizations',
        'Machine learning'
    ],
    buttonText: 'Contact us',
    buttonVariant: 'outlined',
  },
];

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

export default function App() {
  const auth = useAuth();
  const firestore = useFirestore();
  const firebaseAuth = getAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [email, setEmail] = useState(null);
  const [canFinish, setCanFinish] = useState(false);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  



  const handleBillingSelect = async (tier) => {
    // @ts-ignore
    await firestore.addBillingPlan(auth.user.uid, tier);
    handleNext();
    // Router.push('/account')
  };

  function HorizontalLinearStepper() {
    return (
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            //const stepProps: { completed? } = {};
            return (
              <Step key={index} /*{...stepProps}*/>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === 1 && <FinishSetup />}
        {activeStep === 2 && <PricingContent />}
        {activeStep === 3 && <ConnectFirstBank />}
        {activeStep === steps.length ? (
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </>
        ) : (
          <>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              {activeStep === 2 ? <></> : 
              <>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button  onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
              </>}

            </Box>
          </>
        )}
      </Box>
    );
  }

  function SignUp() {
    const [createPassword, setCreatePassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [allowNext, setAllowNext] = useState(false);
    const [emailUsed, setEmailUsed] = useState(false);
    const [unexpectedError, setUnexpectedError] = useState(false);

    const handleSubmitNotState = async (e) => {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      const email = data.get('email');
      const password = data.get('password');
      const phoneNumber = data.get('phone');
      const firstName = data.get('firstName');
      const lastName = data.get('lastName');
      // @ts-ignore
      const response = await auth.signup(email, password, phoneNumber, firstName, lastName);
      if (response == 'FirebaseError: Firebase: Error (auth/email-already-in-use).') {
        setEmailUsed(true)
      } else if (response == 'unexpected error') {
        setUnexpectedError(true)
      } else if (response.uid) {
        setFirstName(firstName);
        setLastName(lastName);
        setPhoneNumber(phoneNumber);
        setEmail(email);
        handleNext();
      }
    };

    useEffect(() => {
      if ((createPassword.length < 6) && (createPassword.length >= 1)) {
        setShowAlert(true)
        setShowInfo(false)
      }
      if (createPassword.length < 6) {
        console.error('bad pw')
        setShowAlert(true)
        setAllowNext(false)
      } else {
        setShowInfo(false)
        setShowAlert(false)
        setAllowNext(true)
      }
    }, [createPassword]);

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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmitNotState} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  autoComplete="tel"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={createPassword}
                  onChange={(e) => setCreatePassword(e.target.value)}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                { showAlert ? <Alert severity="warning">Password does not meet requirements</Alert> : null}
                { showInfo ? <Alert severity="info">Password must be at least 6 characters</Alert> : null}
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!allowNext}
            >
              Sign Up
            </Button>
            <Grid item xs={12}>
                { emailUsed ? <Alert severity="error">Email already in use, please sign in</Alert> : null}
                { unexpectedError ? <Alert severity="error">Unexpected error, please try again</Alert> : null}
              </Grid>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
    )
  }

  function FinishSetup() {
    const [username, setUsername] = useState('');
    const [birthday, setBirthday] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
      // const data = new FormData(e.currentTarget);
      // const username = data.get('userId');
      // const birthday = data.get('birthday');
      // const address1 = data.get('street1');
      // const address2 = data.get('street2');
      // const city = data.get('city');
      // const state = data.get('state');
      // const zip = data.get('zip');
      await firestore.createUserEntry(auth.user.uid, phoneNumber, email, firstName, lastName)
      await firestore.setupUserAccount(auth.user.uid, birthday, address1, address2, city, state, zip, username)
      handleNext();
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
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            Finish setup
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                <TextField
                    autoComplete="userId"
                    name="userId"
                    required
                    fullWidth
                    id="userId"
                    label="Username"
                    autoFocus
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    type="date"
                    id="birthday"
                    name="birthday"
                    autoComplete="birthday"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                />
                </Grid>
  
                <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    name="street1"
                    label="Address Line 1"
                    type="street1"
                    id="street1"
                    autoComplete="street"
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    fullWidth
                    name="street2"
                    label="Address Line 2"
                    type="street2"
                    id="street2"
                    autoComplete="street"
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    name="city"
                    label="City"
                    type="city"
                    id="city"
                    autoComplete="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                <InputLabel id="selectStateLabel">State</InputLabel>
                <Select
                    labelId="selectStateLabel"
                    fullWidth
                    id="state"
                    name='state'
                    label="State"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                >
                    { STATE_ARRAY.map((state, index) => (
                        <MenuItem key={index} value={state}>{state}</MenuItem>
                    ))}
                </Select>
                </FormControl>

                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                    required
                    fullWidth
                    id="zip"
                    label="Zip Code"
                    name="zip"
                    autoComplete="zip"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                />
                </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={(e) => handleSubmit(e)}
            >
                Continue
            </Button>
            <Grid container justifyContent="flex">
                <Grid item>
                <Link href="/auth/signIn" variant="body2">
                    Already have an account? Sign in
                </Link>
                </Grid>
            </Grid>
            </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
        </Container>
    </ThemeProvider>
    );
  }

  function PricingContent() {
    return (
      <>
        <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
        <CssBaseline />
        <Container maxWidth="md" component="main">
          <Grid container spacing={5} alignItems="flex-end">
            {tiers.map((tier) => (
              // Enterprise card is full width at sm breakpoint
              <Grid
                item
                key={tier.title}
                xs={12}
                sm={tier.title === 'Enterprise' ? 12 : 6}
                md={6}
              >
                <Card>
                  <CardHeader
                    title={tier.title}
                    subheader={tier.subheader}
                    titleTypographyProps={{ align: 'center' }}
                    action={tier.title === 'Pro' ? <StarIcon /> : null}
                    subheaderTypographyProps={{
                      align: 'center',
                    }}
                    sx={{
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                          ? theme.palette.grey[200]
                          : theme.palette.grey[700],
                    }}
                  />
                  <CardContent>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'baseline',
                        mb: 2,
                      }}
                    >
                        {tier.price === 'Contact us' ? 
                          <Typography component="h3" variant="h4" color="text.primary">
                              {tier.price}
                          </Typography>
                          : 
                          <>
                          <Typography component="h2" variant="h3" color="text.primary">
                              ${tier.price}
                          </Typography>
                          <Typography variant="h6" color="text.secondary">
                              /mo
                          </Typography>
                          </>
                        }
  
                    </Box>
                    <ul>
                      {tier.description.map((line) => (
                        <Typography
                          component="li"
                          variant="subtitle1"
                          align="center"
                          key={line}
                        >
                          {line}
                        </Typography>
                      ))}
                    </ul>
                  </CardContent>
                  <CardActions>
                    {/* @ts-ignore */}
                    <Button fullWidth variant={tier.buttonVariant}
                    onClick={(e) => handleBillingSelect(tier.title)}
                    >
                      {tier.buttonText}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        <Copyright sx={{ mt: 5 }} />
      </>
    );
  }

  const ConnectFirstBank = () => {
    const auth = useAuth();
    return (
      <>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end" sx={{ margin: '0 auto', padding: '25%'}}>
          <Card sx={{ margin: 'auto', paddingTop: '25px', paddingBottom: '25px'}}>
            <CardHeader>
              <Typography component="h1" variant="h5">
                Connect your first bank
              </Typography>
            </CardHeader>
            <CardContent>
                <PlaidLinkInstitution user_id={auth.user.uid} />
              <Button onClick={() => Router.push('/dashboard')}>Finish</Button>
            </CardContent>
          </Card>
        </Grid>
      </Container>
      <Copyright sx={{ mt: 5 }} />
    </>
    )
  };

  return (
    <>
      { activeStep === 0 ? <SignUp /> : 
      <>
      <HorizontalLinearStepper />
      </>
      }
    </>
  )
};