import {Box, Card, CardContent, Slide, Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import React from "react";

export default function SettingsFaq() {
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
                        FAQ
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Slide direction="left" in={true} mountOnEnter unmountOnExit>
                                <Typography>
                                    Frequently asked questions will be added as they are asked.
                                </Typography>
                            </Slide>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    )
}