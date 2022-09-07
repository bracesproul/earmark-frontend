import React, { ErrorInfo, ReactElement } from "react";
import {Box, Button, Typography} from "@mui/material";
interface ErrorBoundaryState {
    hasError: boolean
    errorMessage: string
}
interface ErrorboundaryProps {
    children: ReactElement
}
export default class ErrorBoundaries extends React.Component<ErrorboundaryProps, ErrorBoundaryState>{
    constructor(props: ErrorboundaryProps){
        super(props)
        this.state = {
            hasError : false,
            errorMessage: ""
        }
    }
    componentDidCatch(error: Error, errorInfo: ErrorInfo){
        this.setState({hasError: true})
        this.setState({errorMessage: error.message})
        //Do something with err and errorInfo
    }
    render(): React.ReactNode {
        if(this.state?.hasError){
            return(
                <Box>
                    <Typography sx={{
                        fontSize: '32px',
                        fontWeight: 'bold',
                    }}>
                        An unexpected error has occurred.
                    </Typography>
                    <Typography sx={{
                        fontSize: '22px',
                    }}>
                        Developer: {this.state.errorMessage}
                    </Typography>
                    {this.state.errorMessage}
                    <Button href={'/dashboard'}>
                        Go home
                    </Button>
                </Box>
            )
        }
        return(this.props.children)
    }
}