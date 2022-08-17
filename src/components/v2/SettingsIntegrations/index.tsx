import {useAuth} from "../../../lib/hooks/useAuth";
import {getAuth, GoogleAuthProvider, linkWithRedirect, sendEmailVerification} from "firebase/auth";
import React, {useEffect, useState} from "react";
import {Box, Card, CardContent, List, Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import VerifyEmailListItemButton from "../VerifyEmailListItemButton";
import EmailVerifiedListItem from "../EmailVerifiedListItem";
import LinkGoogleListItemButton from "../LinkGoogleListItemButton";
import GoogleLinkedListItem from "../GoogleLinkedListItem";

export default function SettingsIntegrations() {
    const auth = useAuth();
    const firebaseAuth = getAuth();
    const provider = new GoogleAuthProvider();
    const [emailVerificationSent, setEmailVerificationSent] = useState(false);
    const [emailVerificationSentError, setEmailVerificationSentError] = useState(false);
    const [googleLinked, setGoogleLinked] = useState(false);
    const [googleLinkedError, setGoogleLinkedError] = useState(false);
    const [emailVerified, setEmailVerified] = useState(false);

    const [showEmailIcon, setShowEmailIcon] = useState(true);
    const [showEmailSentIcon, setShowEmailSentIcon] = useState(false);

    function handleLinkGoogleAccount() {
        linkWithRedirect(firebaseAuth.currentUser, provider)
            .then(() => {
                console.log('success')
            })
            .catch(error => {
                console.log(error);
            });
    }

    function handleVerifyEmail() {
        console.log('verify email');
        sendEmailVerification(firebaseAuth.currentUser)
            .then(() => {
                setShowEmailIcon(false);
                setShowEmailSentIcon(true);
            })
            .catch((error) => {
                console.error('Error sending email verification');
                console.error(error)
                setEmailVerificationSentError(true);
            });

    }

    useEffect(() => {
        if (!auth.user) return undefined;
        console.log(firebaseAuth.currentUser);
        setEmailVerified(firebaseAuth.currentUser.emailVerified);
        firebaseAuth.currentUser.providerData.forEach(provider => {
            if (provider.providerId === 'google.com') {
                setGoogleLinked(true);
            }
        })
    }, [auth.user])

    return (
        <Box>
            <Card sx={{
                maxWidth: 'fit-content',
                padding: '1rem',
                marginTop: '2rem',
            }}>
                <CardContent>
                    <Typography sx={{
                        fontSize: '1.5rem',
                        paddingBottom: '20px',
                    }}>
                        Integrations
                    </Typography>
                    <Grid container spacing={2}>
                        <List sx={{ display: 'flex', flexDirection: 'column' }} component="nav" aria-label="other auth services">
                            { !googleLinked ? (
                                <LinkGoogleListItemButton
                                    handleLinkGoogleAccount={() => handleLinkGoogleAccount()}
                                />
                            ) : (
                                <GoogleLinkedListItem />
                            )}
                            { !emailVerified ? (
                                <VerifyEmailListItemButton
                                    showEmailIcon={showEmailIcon}
                                    showEmailSentIcon={showEmailSentIcon}
                                    handleVerifyEmail={() => handleVerifyEmail()}
                                />
                            ) : (
                                <EmailVerifiedListItem />
                            )}
                        </List>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    )
}