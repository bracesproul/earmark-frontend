/* eslint-disable */
import Head from "next/head";
const HeadTemplate = ({ title, description, iconPath }) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="icon" href={iconPath} />
        </Head>
    )
};

export default HeadTemplate;