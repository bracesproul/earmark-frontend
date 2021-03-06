import React, {
    useEffect,
    useRef, useState
} from "react";
import { DataGrid } from "@mui/x-data-grid";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import { useBackgroundFetch } from "../../lib/hooks/useBackgroundFetch";
import { useAuth } from "../../lib/hooks/useAuth";
import TransactionsComponent from "../../components/v2/AllTransactions";
import PageTemplate from "../../components/PageTemplate";
import {Box, Typography} from "@mui/material";

function AllTransactions() {
    const callApi = useBackgroundFetch();
    const auth = useAuth();
    const transactions = useRef(null);
    const [loading, setLoading] = useState(true);
    const [windowDimensions, setWindowDimensions] = useState({ height: 492, width: 874 });

    useEffect(() => {
        if (window.innerWidth < 768) {
            setWindowDimensions({ height: Math.round(window.innerHeight), width: Math.round(window.innerWidth) });
            return;
        }
        setWindowDimensions({ height: Math.round(window.innerHeight * .64), width: Math.round(window.innerWidth * .64) });
    }, []);

    const fetchData = async (forceRetry:boolean) => {
        return callApi.fetchAllTransactions(forceRetry);
    }

    useEffect(() => {
        if (!auth.user) return;
        fetchData(false).then((res) => {
            transactions.current = res.transactions;
            console.log(res.transactions)
            setLoading(false);
        })
    }, [auth.user]);

    const columns = [
        { field: 'name', headerName: 'Name', width: (windowDimensions.width / 4) },
        { field: 'date', headerName: 'Date', width: (windowDimensions.width / 4) },
        { field: 'amount', headerName: 'Amount', width: (windowDimensions.width / 4) },
        { field: 'category', headerName: 'Category', width: (windowDimensions.width / 4) },
    ];

    return (
        <PageTemplate>
            {!loading ? (
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    margin: 'auto'
                }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: "700",
                            fontSize: '39px',
                            paddingTop: "1rem",
                            paddingBottom: '1rem',
                            margin: "auto",
                        }}
                    >
                        All Transactions
                    </Typography>
                    <TransactionsComponent
                        transactions={transactions.current}
                        width={windowDimensions.width}
                        columns={columns}
                        loading={loading}
                    />
                </Box>
            ) : (
                <DataGrid
                    autoHeight={true}
                    rows={null}
                    columns={columns}
                    loading={loading}
                    checkboxSelection={false}
                    components={{
                        LoadingOverlay: LoadingSkeleton
                    }}
                />
            )}
        </PageTemplate>

    )
}

export default AllTransactions;
