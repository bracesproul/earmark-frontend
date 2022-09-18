import React, {
    useEffect,
    useState
} from "react";
import { useCookies } from "react-cookie";
import {Alert, AlertTitle, Box, IconButton, Collapse, Link} from "@mui/material";
import { useRouter } from "next/router";
import CloseIcon from '@mui/icons-material/Close';

export default function NewUserPopup() {
    const router = useRouter();
    const [cookie, setCookie, removeCookie] = useCookies(["newUser"]);
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (cookie['newUser'] === 'true') {
            setOpen(true);
            console.log('opening modal')
        } else console.log('not opening modal', cookie['newUser'])
    }, [cookie])

    useEffect(() => {
        if (router.query.newUser === 'false') {
            setCookie("newUser", 'false', {path: '/'})
            console.log('removed cookie')
        }
    }, [router.query])

    function handleClose() {
        router.push('?newUser=false')
        setOpen(false);
    }
    return (
        <Box sx={{
            display: 'flex',
            top: '10px',
            right: '10px',
            position: 'absolute',
            maxWidth: {xs: '80%', sm: '800%', md: '30%', lg: '30%', xl: '30%'},
            zIndex: 999,
        }}>
            <Collapse in={open}>
                <Alert
                    severity="info"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                handleClose();
                                setOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    <AlertTitle><strong>Looks like you're new here.</strong></AlertTitle>
                    Check out <strong><Link
                    onClick={() => {
                        handleClose()
                    }}
                    target="_blank"
                    rel="noopener"
                    sx={{
                        cursor: 'pointer',
                        textDecoration: 'underline',
                        textUnderlineOffset: '5px',
                        transition: 'all 0.2s ease-in-out',
                        letterSpacing: '-0.3px',
                        '&:hover': {
                            color: '#18ab02',
                            letterSpacing: '0px',
                        }
                    }}
                    href='https://www.youtube.com/watch?v=-2vtGSIGURo'
                > this demo video</Link> </strong> to get started!
                </Alert>
            </Collapse>
        </Box>

    )
}