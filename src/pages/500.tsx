import {Box, Typography, Button} from "@mui/material";

export default function Custom500() {
    return (
        <Box>
            <Typography sx={{
                fontSize: '32px',
                fontWeight: 'bold',
            }}>
                500
            </Typography>
            <Typography sx={{
                fontSize: '22px',
            }}>
                Oops! Something went wrong...
            </Typography>
            <Button href={'/dashboard'}>
                Go home
            </Button>
        </Box>
    );
}