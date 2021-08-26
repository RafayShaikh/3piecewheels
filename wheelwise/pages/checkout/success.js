import Facebook from '@material-ui/icons/Facebook';
import Footer from '../../components/HeaderFooter/Footer';
import Header from '../../components/HeaderFooter/Header';
import styles from '../../styles/checkout.module.css';
import Head from 'next/head';
import Link from 'next/link';
import { selectCheckout } from '../../slices/webStateSlice';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function success() {
  const isCheckout = useSelector(selectCheckout);
  const router = useRouter();
  useEffect(() => {
    if (!isCheckout) {
      router.replace('/');
    }
  }, []);
  return (
    <div className={styles.mainC}>
      <Head>
        <title>Success - 3 Piece Cult</title>
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
        <div className={styles.successContainer}>
          <h1 className={styles.title}>You Order Is Successfully Queued.</h1>
          <p className={styles.info}>
            We'll get back to you with more information about your shippment and
            payment details.
          </p>
          <h1 className={styles.greet}>
            In the meantime, you can join our facebook community.
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

export default success;
