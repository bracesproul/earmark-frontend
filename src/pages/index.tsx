/* eslint-disable */
import React, { useState, useEffect, useCallback } from 'react';
import MainNav from '../components/Nav/MainNav';
import HeadTemplate from '../components/Head';
import styles from '../styles/Home.module.css';

const Home = () => {
  return (
    <div className={styles.page}>
    <HeadTemplate title="Earmark" description="Earmark Homepage" iconPath="/favicon.ico" />
    <main className={styles.main}>
      <section className={styles.navBar}>
        <MainNav />
      </section>
      <section className={styles.body}>
        <span id="services">
          <h1>Services</h1>
        </span>
        <span id="pricing">
          <h1>Pricing</h1>
        </span>
        <span id="about">
          <h1>About</h1>
        </span>
      </section>
    </main>
    <footer></footer>
    </div>
  )
};

export default Home;