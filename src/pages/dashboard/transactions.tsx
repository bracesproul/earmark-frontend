import React, {
    useEffect,
    useRef, useState
} from "react";
import CssBaseline from '@mui/material/CssBaseline';
import { useBackgroundFetch } from "../../lib/hooks/useBackgroundFetch";
import { useAuth } from "../../lib/hooks/useAuth";
import TransactionsComponent from "../../components/v2/AllTransactions";
import {Box, Divider, Typography} from "@mui/material";
import {parseCookies} from "../../lib/parseCookies";
import {useRouter} from "next/router";

export async function getServerSideProps({ req, res }) {
    const cookie = parseCookies(req).user_id
    console.log('cookie', cookie)
    if (res) {
        if (!cookie) {
            return {
                props: {
                    cookie: null,
                },
            }
        }
        if (Object.keys(cookie).length === 0 && cookie.constructor === Object) {
            res.writeHead(301, { Location: "/" })
            res.end()
        }
    }
    return {
        props: {
            cookie: cookie,
        },
    }
}

function AllTransactions({ cookie }) {
    const callApi = useBackgroundFetch();
    const auth = useAuth();
    const router = useRouter();

    const transactions = useRef(null);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [windowDimensions, setWindowDimensions] = useState({ height: 492, width: 874 });

    useEffect(() => {
        if (!cookie) {
            router.push("/auth/signin")
        }
    }, [cookie])

    useEffect(() => {
        if (!mounted) {
            setMounted(true);
        }
    }, [mounted]);

    useEffect(() => {
        if (window.innerWidth < 768) {
            setWindowDimensions({ height: Math.round(window.innerHeight), width: Math.round(window.innerWidth) });
            return undefined;
        }
        setWindowDimensions({ height: Math.round(window.innerHeight * .64), width: Math.round(window.innerWidth * .64) });
    }, []);

    const fetchData = async (forceRetry:boolean) => {
        return callApi.fetchAllTransactions(forceRetry);
    }

    useEffect(() => {
        if (!auth.user) return undefined;
        if (!mounted)  return undefined;
        fetchData(false).then((res) => {
            transactions.current = res.transactions;
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
        <>
            <CssBaseline />
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                margin: 'auto',
                width: '100%',
            }}>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: "700",
                        fontSize: '39px',
                        paddingTop: "1rem",
                        margin: "auto",
                    }}
                >
                    All Transactions
                </Typography>
                <Divider sx={{ width: '85%', margin: 'auto' }} />
                <TransactionsComponent
                    transactions={transactions.current}
                    width={windowDimensions.width}
                    columns={columns}
                    loading={loading}
                />
            </Box>
        </>
    )
}

export default AllTransactions;
