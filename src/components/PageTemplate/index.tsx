/* eslint-disable */
import Head from "next/head";
import styles from '../../styles/Dashboard/Transfers.module.css';
import { useAuth } from "../../lib/hooks/useAuth";
import NotSignedIn from "../Auth/NotSignedIn";
import newStyles from './style.module.css'
import { Box } from "@mui/material"
const icon = "/favicon.ico";
import SideNavCopy from '../Nav/SideNavCopy';
//fafafa
const PageTemplate = (props) => {
    return (
        <Box>
            <Head>
            <title>
                    {props.title}
                </title>
                <meta name="description" content={props.description} /> 
            </Head>
            <Box sx={{
                minWidth: '100vh',
                minHeight: '100vh',
            }}>
                <Box sx={{
                    display: 'flex',
                }}>
                    <SideNavCopy />
                </Box>
                <Box sx={{
                    display: 'flex',
                    width: { md: '80%', xl: '90%' },
                    marginLeft: 'auto',
                    minHeight: '100vh'
                }}>
                    {props.children}
                </Box>
            </Box>
        </Box>
    )
}

export default PageTemplate;