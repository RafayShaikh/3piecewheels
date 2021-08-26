import Head from 'next/head';
import { useEffect, useState } from 'react';
import BottomSection from '../components/Home/BottomSection';
import Header from '../components/HeaderFooter/Header';
import MidSection from '../components/Home/MidSection';
import TopSection from '../components/Home/TopSection';
import styles from '../styles/Home.module.css';
import Footer from '../components/HeaderFooter/Footer';
import ContactSection from '../components/ContactSection';
import Welcome from '../components/Home/Welcome';

export default function Home() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    let timer1 = setTimeout(() => setShow(false), 2000);

    return () => {
      clearTimeout(timer1);
    };
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>3 Piece Cult </title>
        <meta
          name='keywords'
          content='Wheels, 3 Piece Wheels, Junction Produce, Rims, Modification, Car Community, South Texas, Corpus Christi, Texas, Lowered Car, Buy Car, Sell Parts, '
        />
        <meta
          name='description'
          content='3 Piece Cult is not only an e-commerce bussiness, but it is a community of car guys and girls. You can find 3 Piece Wheels, Car Parts, Car Accessories, and more.'
        />

        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/site.webmanifest' />
        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
        <meta name='msapplication-TileColor' content='#b91d47' />
        <meta name='theme-color' content='#ffffff' />
      </Head>
      {show ? (
        <Welcome />
      ) : (
        <main className={styles.main}>
          <Header />
          <div className={styles.Body}>
            <TopSection />
            <MidSection />
            <BottomSection />
            <ContactSection />;
          </div>
          <Footer />)
        </main>
      )}

      <footer className={styles.footer}></footer>
    </div>
  );
}
