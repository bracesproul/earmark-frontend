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

function TotalSpending() {
    const auth = useAuth();
    const callApi = useBackgroundFetch();
    const [mounted, setMounted] = useState(false);
    const [loading, setLoading] = useState(true);
    const totalSpending = useRef(null);

    function fetchData() {
        return callApi.fetchTotalSpending(false);
    }

    useEffect(() => !mounted ? setMounted(true) : null, [mounted]);

    useEffect(() => {
        if (!mounted) return;
        if (!auth.user) return;
        fetchData().then((res) => {
            totalSpending.current = res.totalSpending;
            console.log('done');
            console.log(totalSpending.current);
            setLoading(false);
        })
    }, [mounted, auth.user]);


    const skeleton = (
        <>
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
        </>
    )

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
