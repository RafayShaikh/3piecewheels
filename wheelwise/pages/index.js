import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import BottomSection from '../components/Home/BottomSection';
import Header from '../components/HeaderFooter/Header';
import MidSection from '../components/Home/MidSection';
import TopSection from '../components/Home/TopSection';
import styles from '../styles/Home.module.css';
import Footer from '../components/HeaderFooter/Footer';
import ContactSection from '../components/ContactSection';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>3 Piece Cult </title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <Header />
        <div className={styles.Body}>
          <TopSection />
          <MidSection />
          <BottomSection />
          <ContactSection />;
        </div>
        <Footer />
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
