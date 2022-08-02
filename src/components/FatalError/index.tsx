import {Alert, AlertTitle, Button} from "@mui/material";
import React from "react";

const FatalErrorComponent = (props) => {
  return (
    <Alert severity="error">
      <AlertTitle><strong>A Fatal Error Occurred.</strong></AlertTitle>
      <Button
        variant="contained"
        color="error"
        onClick={props.handleForceRetry}
      >Click here to force retry</Button>
    </Alert>
  )
}

export default FatalErrorComponent