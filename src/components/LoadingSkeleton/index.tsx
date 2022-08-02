import {Box, Skeleton} from "@mui/material";
import React from "react";

const LoadingSkeleton = () => (
    <Box
        sx={{
            height: "max-content"
        }}
    >
        {[...Array(5)].map((_, index) => (
            <Skeleton key={index} variant="rectangular" sx={{ my: 4, mx: 1 }} />
        ))}
    </Box>
)

export default LoadingSkeleton;