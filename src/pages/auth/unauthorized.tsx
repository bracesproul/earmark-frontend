import { Box,
    Card,
    CardContent,
    Typography
} from '@mui/material';

export default function Home() {
    return (
        <Box>
            <Card>
                <CardContent>
                    <Typography>
                        Not authorized. Please sign in to view this page
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    )
}