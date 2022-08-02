import {DataGrid} from "@mui/x-data-grid";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import React from "react";

function MUIDatGrid(props) {
    return (
        <DataGrid
            autoHeight={true}
            rows={props.rows}
            columns={props.columns}
            loading={props.loading}
            checkboxSelection={props.checkbox}
            components={{
                LoadingOverlay: LoadingSkeleton
            }}
        />
    )
}

export default MUIDatGrid;