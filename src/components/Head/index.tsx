/* eslint-disable */
import Head from "next/head";
import styles from '../../styles/Dashboard/Transfers.module.css';
import { useAuth } from "../../lib/hooks/useAuth";
import NotSignedIn from "../Auth/NotSignedIn";
const icon = "/favicon.ico";

const HeadTemplate = ({ title, description, iconPath }) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
        </Head>
    )
};

export default HeadTemplate;