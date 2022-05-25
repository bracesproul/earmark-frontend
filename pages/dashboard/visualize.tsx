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
import CompileVisuals from '../../src/components/CompileVisuals';

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
              { !auth.user ? <NotSignedIn /> : <CompileVisuals /> }
          </section>
      </main>
      <footer></footer>
      </div>
  )
};