import {Accordion, AccordionDetails, AccordionSummary, Divider, Grid, Tooltip, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {formatAmounts} from "../../../lib/parseAmounts";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import React from "react";

function TotalSpendingDetails({ secondary }) {
    return (
        <AccordionDetails>
            <Typography sx={{ fontSize: '18px' }} variant="h6" component="div">
                {secondary.title}
            </Typography>
            <Grid container direction='row' alignItems='center'>
                <Grid item>
                    <Typography variant="body1" component="div">
                        Total spending in the past 24 hours {formatAmounts(secondary.totalSpent)}
                    </Typography>
                </Grid>
                <Grid item alignItems='right' sx={{ paddingLeft: '5px'}}>
                    { secondary.spendingChange == 'more' && (
                        <Tooltip title={`Spent more than ${secondary.title} ago`}>
                            <ArrowCircleUpIcon color='secondary' />
                        </Tooltip>
                    ) }
                    { secondary.spendingChange == 'less' && (
                        <Tooltip title={`Spent less than ${secondary.title} ago`}>
                            <ArrowCircleDownIcon color='primary' />
                        </Tooltip>
                    ) }
                    { secondary.spendingChange == 'no_change' && (
                        <Tooltip title="No change in spending">
                            <RemoveCircleOutlineIcon color='primary' />
                        </Tooltip>
                    )  }
                </Grid>
            </Grid>
            <Divider />
        </AccordionDetails>
    )
}

export default TotalSpendingDetails;