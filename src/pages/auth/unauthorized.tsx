import { Box,
    Card,
    CardContent,
    Typography
} from '@mui/material';
import CssBaseline from "@mui/material/CssBaseline";

export default function Home() {
    return (
        <>
        <CssBaseline />
            <Box sx={{
                minWidth: '100vh',
                minHeight: '100vh',
            }}>
                <Card sx={{
                    width: '33%',
                    height: '33%'
                }}>
                    <CardContent sx={{
                        display: 'flex',
                    }}>
                        <Typography sx={{
                            fontSize: '28px',
                            fontWeight: 'bold',
                        }}>
                            Unfortunately you are not authorized to access this page.
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </>
    )
}