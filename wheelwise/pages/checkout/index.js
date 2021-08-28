import Head from 'next/head';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import Checkout from '../../components/Checkout/Checkout';
import Footer from '../../components/HeaderFooter/Footer';
import Header from '../../components/HeaderFooter/Header';
import { selectCartItems } from '../../slices/cartSlice';
import styles from '../../styles/checkout.module.css';
import ContactSection from '../../components/ContactSection';

function index() {
  const items = useSelector(selectCartItems);

  const truncate = (input) => {
    input?.length > 100
      ? setTruncateDescription(`${input.substring(0, 100)}...`)
      : setTruncateDescription(input);
  };

  return (
    <div className={styles.checkoutPage}>
      <Head>
        <title>Checkout - 3 Piece Cult</title>
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
        <div className={styles.checkoutContainer}>
          <h1 className={styles.title}>
            {items.length === 0 ? 'Your Cart is Empty.' : 'Shopping Cart'}
          </h1>
          {items.length > 0 && (
            <div className={styles.cartItemsContainer}>
              {items?.map((item, i) => (
                <div className={styles.cartItems}>
                  <div className={styles.cartItem}>
                    <h1>Item</h1>
                    <p>{item.name}</p>
                    <img src={item.pictures[0]} alt='' />
                    <h1>Price</h1>
                    <h1>
                      {new Intl.NumberFormat('en-us', {
                        style: 'currency',
                        currency: 'USD',
                      }).format(item?.price / 100)}
                    </h1>
                    <h1>Description</h1>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {items.length > 0 ? (
            <Checkout />
          ) : (
            <Image
              src='/car9.png'
              objectFit='contain'
              height={1000}
              width={1000}
            />
          )}
        </div>
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default index;
