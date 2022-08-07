import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TotalSpendingDetails from "../TotalSpendingDetails";
import React from "react";

function TotalSpendingAccordion({ item, index }) {
    return (
        <Accordion key={index}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography sx={{ fontWeight: 'bold' }}>
                    {item.account_name}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <TotalSpendingDetails secondary={item.total_spending.total1Day} />
                <TotalSpendingDetails secondary={item.total_spending.total7Days} />
                <TotalSpendingDetails secondary={item.total_spending.total30Days} />
            </AccordionDetails>
        </Accordion>
    )
}

export default TotalSpendingAccordion;