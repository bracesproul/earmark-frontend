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
    console.log(query);

    return (
        <div className={styles.bank}>
            <HeadTemplate title={query.ins_id} description="Bank overview for Earmark" iconPath="/favicon.ico" />
            <main className={styles.main}>
            <section className={styles.sidenavContainer}>
                {/*<SideNav />*/}
            </section>
            <section className={styles.bankBody}>
                <h1>on page</h1>
            </section>
            </main>
        </div>
    )
};

