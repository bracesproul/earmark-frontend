import React, {
    useState,
    useEffect,
    useRef,
} from 'react';
import uniqid from 'uniqid';
import TotalSpendingAccordion from '..//TotalSpendingAccordion';
import { useAuth } from '../../../lib/hooks/useAuth';
import { useBackgroundFetch } from '../../../lib/hooks/useBackgroundFetch';
import {
    Box,
    Card,
    CardContent,
    Divider,
    Grid,
    Skeleton,
    Typography
} from "@mui/material";

const skeleton = (
    <>
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
    </>
)

function TotalSpending() {
    const auth = useAuth();
    const callApi = useBackgroundFetch();
    const [mounted, setMounted] = useState(false);
    const [loading, setLoading] = useState(true);
    const totalSpending = useRef(null);

    function fetchData() {
        return callApi.fetchTotalSpending(false);
    }

    useEffect(() => {
        if (!mounted) {
            setMounted(true);
        }
    }, [mounted]);

/*    if (mounted) {
        return (
            <Box sx={{ padding: '30px', margin: 'auto' }}>
                <Card
                    sx={{
                        width: {sm: '95%', md: 'none'},
                        minWidth: {sm: 'none', md: 350},
                        maxWidth: {sm: 'none', md: 550},
                        minHeight: 'fitContent',
                    }}
                    variant="outlined"
                >
                    <CardContent>
                        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', paddingBottom: '15px'}}>
                            Total Spending
                        </Typography>
                        <Divider />
                        <Grid>
                            {skeleton}
                        </Grid>
                    </CardContent>
                </Card>
            </Box>
        )
    }*/

    useEffect(() => {
        if (!mounted) return undefined;
        if (!auth.user) return undefined;
        fetchData().then((res) => {
            totalSpending.current = res.totalSpending;
            console.log('done');
            console.log(totalSpending.current);
            setLoading(false);
        })
    }, [mounted, auth.user]);

    return (
        <Box sx={{ padding: '30px', margin: 'auto' }}>
            <Card
                sx={{
                    width: {sm: '95%', md: 'none'},
                    minWidth: {sm: 'none', md: 350},
                    maxWidth: {sm: 'none', md: 550},
                    minHeight: 'fitContent',
                }}
                variant="outlined"
            >
                <CardContent>
                    <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', paddingBottom: '15px'}}>
                        Total Spending
                    </Typography>
                    <Divider />
                    <Grid>
                        { loading ? skeleton : (
                            <>
                                {totalSpending.current.map((item, index) => (
                                    <TotalSpendingAccordion key={uniqid()} item={item} index={index} />
                                ))}
                            </>
                        ) }
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
}

export default TotalSpending;
