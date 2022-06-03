/* eslint-disable */
import Head from "next/head";
import styles from '../../../styles/Dashboard/Transfers.module.css';
import SideNav from "../Nav/SideNav";
import { useAuth } from "../../lib/hooks/useAuth";
import NotSignedIn from "../Auth/NotSignedIn";
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

export default PageTemplate;