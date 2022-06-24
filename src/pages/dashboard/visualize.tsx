/* eslint-disable */
import React, {
  useEffect,
  useState,
} from 'react';
import SideNav from '../../components/Nav/SideNav';
import NotSignedIn from '../../components/Auth/NotSignedIn';
import styles from '../../styles/Dashboard/Visualize.module.css';
import { useAuth } from '../../lib/hooks/useAuth';
import HeadTemplate from '../../components/Head';
import CompileVisuals from '../../components/CompileVisuals';
import PageTemplate from '../../components/PageTemplate';

function Home() {
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
              { !auth.user ? <NotSignedIn /> : <CompileVisuals /> }
          </section>
      </main>
      <footer></footer>
      </div>
  )
};

export default function HomeN() {
  const auth = useAuth();

  return (
    <PageTemplate title="Visualize" description="Visualize data for Earmark">
      <CompileVisuals />
    </PageTemplate>
  )
};