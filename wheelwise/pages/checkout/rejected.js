import Facebook from '@material-ui/icons/Facebook';
import Footer from '../../components/HeaderFooter/Footer';
import Header from '../../components/HeaderFooter/Header';
import styles from '../../styles/checkout.module.css';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectCheckout } from '../../slices/webStateSlice';
import { useEffect } from 'react';

function rejected() {
  const router = useRouter();
  const handleRoute = (params) => {
    router.push('/faq');
  };
  const isCheckout = useSelector(selectCheckout);
  useEffect(() => {
    if (!isCheckout) {
      router.replace('/');
    }
  }, []);
  return (
    <div className={styles.mainC}>
      <Head>
        <title>Failed - 3 Piece Cult</title>
        <meta
          name='keywords'
          content='Wheels, 3 Piece Wheels, Junction Produce, Rims, Modification, Car Community, South Texas, Corpus Christi, Texas, Lowered Car, Buy Car, Sell Parts, '
        />
        <meta
          name='description'
          content='3 Piece Cult offer a wide variety of car parts. In the gallery page you can find some examples of our customers cars. We can help you with your car needs. Join us of facebook or send us a quick message. '
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
      <main>
        <Header />
        <div className={styles.rejectedContainer}>
          <h1 className={styles.title}>Something Went Wrong.</h1>
          <p className={styles.info}>
            Something went wrong while processing your order. Please try again
            or reach us at:
          </p>
          <button onClick={handleRoute} className={styles.button}>
            Contact Us
          </button>
          <h1 className={styles.greet}>
            OR
            <Link href='https://www.facebook.com/groups/4232301490157059/'>
              <a className={styles.logoContainer}>
                <div className={styles.logo}>
                  <Facebook
                    style={{
                      fontSize: 120,
                      color: 'blue',
                      background: 'white',
                      borderRadius: 100,
                      padding: 10,
                    }}
                  ></Facebook>
                  <h1>3~PIECE CULT</h1>
                </div>
              </a>
            </Link>
          </h1>
        </div>
        <Footer />
      </main>
    </div>
  );
}

export default rejected;
