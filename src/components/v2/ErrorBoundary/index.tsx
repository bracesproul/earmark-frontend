import React, { ErrorInfo, ReactElement } from "react";
import {Box, Button, Typography} from "@mui/material";
interface ErrorBoundaryState {
    hasError: boolean
    errorMessage: string
    fullError: any
}
interface ErrorboundaryProps {
    children: ReactElement
}
export default class ErrorBoundaries extends React.Component<ErrorboundaryProps, ErrorBoundaryState>{
    constructor(props: ErrorboundaryProps){
        super(props)
        // @ts-ignore
        this.state = {
            hasError : false,
            errorMessage: ""
        }
    }
    componentDidCatch(error: Error, errorInfo: ErrorInfo){
        this.setState({hasError: true})
        this.setState({errorMessage: error.message})
        this.setState({fullError: error})
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
                    <Typography sx={{
                        fontSize: '16px',
                    }}>
                        Developer: {this.state.fullError}
                    </Typography>
                    <Button href={'/dashboard'}>
                        Go home
                    </Button>
                </Box>
            )
        }
        return(this.props.children)
    }
}