/* eslint-disable */
import React, {
    useState,
    useEffect,
} from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useAuth } from '../../src/lib/hooks/useAuth';
import { parseCookies } from '../../src/lib/parseCookies';
import HeadTemplate from '../../src/components/Head';
import styles from '../../styles/Dashboard/Bank.module.css';
import Datagridcomponent from '../../src/components/NewUIComponents/Datagrid';
import { globalVars } from '../../src/lib/globalVars';
const API_URL = globalVars().API_URL;

export default function Bank({ data }) {
    const { query } = useRouter();
    console.log(query.ins_id);

    return (
        <div className={styles.bank}>
            <HeadTemplate title={query.ins_id} description="Bank overview for Earmark" iconPath="/favicon.ico" />
            <main className={styles.main}>
            <section className={styles.sidenavContainer}>
                {/*<SideNav />*/}
            </section>
            <section className={styles.bankBody}>
                <DynamicBankBody data={data} />
            </section>
            </main>
        </div>
    )
};

export async function getServerSideProps({ req, res}) {
    const data = parseCookies(req).user_id
    console.log('COOKIE', data);

    const config = {
        method: "GET",
        url: API_URL + '/api/earmark/allTransactions',
        params: {
            // @ts-ignore
            user_id: data,
            startDate: '2021-01-01',
            endDate: '2022-01-01',
        },
        headers: {
            'Content-Type': 'application/json',
            'earmark-api-key': process.env.EARMARK_API_KEY,
        },
    };
    const axiosResponse = await axios(config);
    return {
      props: { data }, // will be passed to the page component as props
    }
}

const DynamicBankBody = ({ data }) => {
    console.log(data);
    const [selectionModel, setSelectionModel] = useState([]);
    const { query } = useRouter();
    const ins_id = query.ins_id;

    const rows = [];
    const columns = [
        { field: 'col1', headerName: 'Name', width: 150 },
        { field: 'col2', headerName: 'Date', width: 150 },
        { field: 'col3', headerName: 'Amount', width: 150 },
        { field: 'col4', headerName: 'Category', width: 150 },
    ];

    return (
        <div>
            <h1>{ins_id}</h1>
            <div className={styles.datagridContainer}>
                <Datagridcomponent message="No transactions found" rows={rows} columns={columns} selectionModel={selectionModel} setSelectionModel={setSelectionModel}/>
            </div>
        </div>
    )
};