/* eslint-disable */
import Head from "next/head";
import styles from '../../../styles/Dashboard/Transfers.module.css';
import SideNav from "../Nav/SideNav";
import { useAuth } from "../../lib/hooks/useAuth";
import NotSignedIn from "../Auth/NotSignedIn";
import newStyles from './style.module.css'
import { Box } from "@mui/material"
const icon = "/favicon.ico";

const PageTemplate = (props) => {
    const auth = useAuth();
    return (
        <div className={styles.page}>
        <Head>
            <title>{props.title}</title>
            <meta name="description" content={props.description} />
            <link rel="icon" href={icon} />
        </Head>
        <main className={styles.main}>
            <SideNav />
            <section className={styles.body}>
                { !auth.user ? <NotSignedIn /> : props.children }
            </section>
        </main>
        <footer></footer>
        </div>
    )
}


const PageTemplateMobile = (props) => {
    const auth = useAuth();
    return (
        <div className={styles.page}>
        <Head>
            <title>{props.title}</title>
            <meta name="description" content={props.description} />
            <link rel="icon" href={icon} />
        </Head>
        <main className={styles.main}>
            <SideNav />
            <section className={styles.body}>
                { !auth.user ? <NotSignedIn /> : props.children }
            </section>
        </main>
        <footer></footer>
        </div>
    )
}

export const PageTemplateResponsive = (props) => {
    const auth = useAuth();
    return (
        <div className={newStyles.page}>
        <Head>
            <title>{props.title}</title>
            <meta name="description" content={props.description} />
            <link rel="icon" href={icon} />
        </Head>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        <main className={newStyles.mainDesktop}>
            <SideNav />
            <section className={newStyles.bodyDesktop}>
                { !auth.user ? <NotSignedIn /> : props.children }
            </section>
        </main>
        </Box>
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
        <main className={newStyles.mainMobile}>
            <SideNav />
            <section className={newStyles.bodyMobile}>
                { !auth.user ? <NotSignedIn /> : props.children }
            </section>
        </main>
        </Box>
        <footer></footer>
        </div>
    )
}


export default PageTemplate;