/* eslint-disable */
/*
import React, {
    useEffect,
    useState,
} from 'react';
import VisualizeData from "../../src/components/DataVisuals/Charts"
import Head from "next/head";
import { useAuth } from "../../src/lib/hooks/useAuth";
import NotSignedIn from '../../src/components/Auth/NotSignedIn';
import styles from '../../styles/Visualize/Visualize.module.css';

const TREEMAP_DATA = [
	{
		name: 'axis',
		children: [
			{ name: 'January', size: 100000, fill: "black" },
			{ name: 'Febuary', size: 100000, fill: "Red" },
			{ name: 'March', size: 100000, fill: "Orange" },
			{ name: 'April', size: 100000, fill: "Yellow" },
			{ name: 'May', size: 100000, fill: "Green" },
      { name: 'June', size: 100000, fill: "Blue" },
			{ name: 'July', size: 100000, fill: "Indigo" },
			{ name: 'August', size: 100000, fill: "Violet" },
			{ name: 'September', size: 100000, fill: "grey" },
			{ name: 'October', size: 100000, fill: "pink" },
			{ name: 'November', size: 100000, fill: "purple" },
			{ name: 'December', size: 100000, fill: "brown" },
		],
	},
];

const BAR_CHART_DATA = [
  { name: 'January', food: 250, transportation: 300, utilities: 350, leasure: 400 },
  { name: 'February', food: 250, transportation: 300, utilities: 350, leasure: 400 },
  { name: 'March', food: 250, transportation: 300, utilities: 350, leasure: 400 },
  { name: 'April', food: 250, transportation: 300, utilities: 350, leasure: 400 },
  { name: 'May', food: 250, transportation: 300, utilities: 350, leasure: 400 },
  { name: 'June', food: 250, transportation: 300, utilities: 350, leasure: 400 },
  { name: 'July', food: 250, transportation: 300, utilities: 350, leasure: 400 },
  { name: 'August', food: 250, transportation: 300, utilities: 350, leasure: 400 },
  { name: 'September', food: 250, transportation: 300, utilities: 350, leasure: 400 },
  { name: 'October', food: 250, transportation: 300, utilities: 350, leasure: 400 },
  { name: 'November', food: 250, transportation: 300, utilities: 350, leasure: 400 },
  { name: 'December', food: 250, transportation: 300, utilities: 350, leasure: 400 },
];

const PIE_CHART_DATA = [
  { name: "Food", value: 100, fill: "purple" },
  { name: "Transportation", value: 200, fill: "blue" },
  { name: "Utilities", value: 300, fill: "red" },
  { name: "Leasure", value: 400, fill: "green" },
];

export default function Home() {
    const auth = useAuth();

    return (
        <div className="">
        <Head>
        <title>Visualize Data</title>
        <meta name="description" content="Visualize data for Earmark" />
        <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
            <SideNav />
            <div className="visualize-container">
                <div className="visualize">
                    { !auth.user ? <NotSignedIn /> : <VisualizeData bar_chart={BAR_CHART_DATA} tree_map={TREEMAP_DATA} pie_chart={PIE_CHART_DATA} /> }
                </div>
            </div>
        </main>
        <footer></footer>
        </div>
    )
};
*/

/* eslint-disable */
import React, {
  useEffect,
  useState,
} from 'react';
import SideNav from '../../src/components/Nav/SideNav';
import NotSignedIn from '../../src/components/Auth/NotSignedIn';
import styles from '../../styles/Dashboard/Visualize.module.css';
import { useAuth } from '../../src/lib/hooks/useAuth';
import HeadTemplate from '../../src/components/Head';

export default function Home() {
  const auth = useAuth();

  return (
      <div className={styles.page}>
      <HeadTemplate title="Visualize" description="Visualize data for Earmark" iconPath="/favicon.ico" />
      <main className={styles.main}>
          <section className={styles.sidenavContainer}>
              <SideNav />
          </section>
          <section className={styles.body}>
              {/* @ts-ignore */}
              { !auth.user ? <NotSignedIn /> : <h1>Visualize</h1> }
          </section>
      </main>
      <footer></footer>
      </div>
  )
};