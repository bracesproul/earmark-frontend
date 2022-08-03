import {Box, Typography} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import React from "react";
import LoadingSkeleton from "../../LoadingSkeleton";

const TransactionsComponent = (props) => {
    return (
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                margin: 'auto',
                padding: '3rem'
            }}>
                {props.transactions.map((transaction) => {
                    return transaction.data.transactions.map((data, index) => {
                        return (
                            <Box
                                key={index}
                                sx={{
                                    display: 'flex',
                                    margin: 'auto',
                                    flexDirection: 'column',
                                    minWidth: props.width,
                                    padding: '1rem',
                                }}
                            >
                                <Typography sx={{
                                    fontSize: '1.5rem',
                                    fontWeight: 600,
                                    margin: 'auto',
                                }}>
                                    {data.account_official_name}
                                </Typography>
                                <DataGrid
                                    sx={{
                                        maxWidth: props.width
                                    }}
                                    autoHeight={true}
                                    rows={data.transactions}
                                    columns={props.columns}
                                    loading={props.loading}
                                    checkboxSelection={false}
                                    components={{
                                        LoadingOverlay: LoadingSkeleton
                                    }}
                                />
                            </Box>
                        )
                    })
                })}
            </Box>
    )
}

export default TransactionsComponent;