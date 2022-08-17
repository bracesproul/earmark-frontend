import React, {useState} from "react";
import {Box, Button, Card, CardContent, FormControl, Link, Slide, Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import HelpTextField from "../HelpTextField";
import SendIcon from "@mui/icons-material/Send";

export default function SettingsHelp() {
    const [email, setEmail] = useState('');
    const [questionType, setQuestionType] = useState('');
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');

    const profileOptions = [
        {
            name: 'question-type',
            label: 'Question type',
            id: 'question-type-input',
            type: 'text',
            shrink: '',
            autoComplete: 'off',
            multiline: false,
            rows: 0,
            maxRows: 0,
            value: questionType,
            onChange: (e) => setQuestionType(e.target.value),
            isSelector: true,
        },
        {
            name: 'email',
            label: 'Email',
            id: 'email-input',
            type: 'email',
            shrink: '',
            autoComplete: 'off',
            multiline: false,
            rows: 0,
            maxRows: 0,
            value: email,
            onChange: (e) => setEmail(e.target.value),
            isSelector: false,
        },
        {
            name: 'title',
            label: 'Message title',
            id: 'title-input',
            type: 'text',
            shrink: '',
            autoComplete: 'off',
            multiline: false,
            rows: 0,
            maxRows: 0,
            value: title,
            onChange: (e) => setTitle(e.target.value),
            isSelector: false,
        },
        {
            name: 'message',
            label: 'Message',
            id: 'message-input',
            type: 'text',
            shrink: '',
            autoComplete: 'off',
            multiline: true,
            rows: 4,
            maxRows: 15,
            value: message,
            onChange: (e) => setMessage(e.target.value),
            isSelector: false,
        },
    ]

    function handleSubmit(e) {
        console.log('help submit');
    }

    return (
        <Box>
            <Card sx={{
                maxWidth: '600px',
                padding: '1rem',
                marginTop: '2rem',
            }}>
                <CardContent>
                    <Typography sx={{
                        fontSize: '1.5rem',
                        paddingBottom: '15px',
                    }}>
                        Help
                    </Typography>
                    <FormControl onSubmit={(e) => handleSubmit(e)}>
                        <Slide direction="left" in={true} mountOnEnter unmountOnExit>
                            <Typography sx={{
                                paddingBottom: '15px'
                            }}>
                                Before submitting a help request, please look through our <Link href="/testing?s=faq">FAQ</Link> to see if your question has already been answered.
                            </Typography>
                        </Slide>
                        <Grid container spacing={2}>
                            <HelpTextField profileOptions={profileOptions} />
                        </Grid>
                        <Slide direction="left" in={true} mountOnEnter unmountOnExit>
                            <Button
                                variant="contained"
                                endIcon={<SendIcon />}
                                type="submit"
                                sx={{
                                    width: 'fit-content',
                                    margin: 'auto',
                                    marginTop: '1rem',
                                }}
                            >
                                Send
                            </Button>
                        </Slide>
                        <Grid container justifyContent="flex-end">
                        </Grid>
                    </FormControl>
                </CardContent>
            </Card>
        </Box>
    )
}