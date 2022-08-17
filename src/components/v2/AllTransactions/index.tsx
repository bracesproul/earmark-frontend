import {
    Box, Divider,
    Typography
} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import React, {
    useState
} from "react";
import LoadingSkeleton from "../../LoadingSkeleton";

type IPageSizeState = {
    index: number;
    pageSize: number;
}

const TransactionsComponent = (props) => {
    const [pageSize, setPageSize] = useState<IPageSizeState[]>([]);

    const handleSetNewPageSize = (index, newPageSize) => {
        console.log('handle new page size running', index, newPageSize);
        setPageSize([...pageSize, { index, pageSize: newPageSize}]);
    }

    return (
        <>
            { !props.loading ? (
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    margin: 'auto',
                }}>
                    {props.transactions.map((transaction) => {
                        return transaction.data.transactions.map((data, index:number) => {
                            return (
                                <>
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
                                                maxWidth: props.width,
                                                boxShadow: 1,
                                                '& .MuiDataGrid-row:hover': {
                                                    color: 'primary.main',
                                                },
                                            }}
                                            density={'compact'}
                                            autoHeight={true}
                                            rows={data.transactions}
                                            columns={props.columns}
                                            loading={props.loading}
                                            rowsPerPageOptions={[25, 50, 100]}
                                            onPageSizeChange={(newPageSize) => handleSetNewPageSize(index, newPageSize)}
                                            checkboxSelection={false}
                                            components={{
                                                LoadingOverlay: LoadingSkeleton
                                            }}
                                        />
                                    </Box>
                                    <Divider sx={{ width: '100%', margin: 'auto' }} />
                                </>
                            )
                        })
                    })}
                </Box>
            ) : (
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    margin: 'auto',
                    padding: '1rem',
                    width: props.width,
                }}>
                    <DataGrid
                        autoHeight={true}
                        rows={null}
                        columns={props.columns}
                        loading={props.loading}
                        checkboxSelection={false}
                        components={{
                            LoadingOverlay: LoadingSkeleton
                        }}
                    />
                </Box>
            )}
        </>

    )
}

export default TransactionsComponent;