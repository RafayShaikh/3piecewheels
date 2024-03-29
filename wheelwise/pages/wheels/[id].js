import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Footer from '../../components/HeaderFooter/Footer';
import Header from '../../components/HeaderFooter/Header';
import styles from '../../styles/Wheels/wheelDetail.module.css';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { db } from '../../firebase/firebase';
import { loadCart, selectBolt, selectDiameter } from '../../slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import ContactSection from '../../components/ContactSection';

function wheels() {
  const bolt = useSelector(selectBolt);
  const diameter = useSelector(selectDiameter);

  const dispatch = useDispatch();
  const router = useRouter();
  const query = router.query;
  const [data, setData] = useState(null);
  const [picNum, setPicNum] = useState(1);
  const pictureCount = (num, max) => {
    if (num < 0 && picNum > 1) {
      setPicNum(picNum - 1);
    }
    if (num > 0 && picNum < max) {
      setPicNum(picNum + 1);
    }
  };
  const addToCart = (e) => {
    e.preventDefault();
    dispatch(loadCart(data));
  };
  useEffect(async () => {
    if (router.isReady) {
      if (query.id && query.description && query.name && query.pictures) {
        await setData({
          id: JSON.parse(query.id),
          description: JSON.parse(query.description),
          name: JSON.parse(query.name),
          bolt: bolt,
          diameter: diameter,
          price: JSON.parse(query.price),
          pictures: JSON.parse(query.pictures),
        });
      } else {
        const doc = await JSON.parse(query.id);
        const dataTemp = await db.collection('wheels').doc(doc).get().data();
        setData(dataTemp);
      }
    }
  }, [router.isReady]);
  return (
    <div className={styles.container}>
      <Head>
        <title>{data?.name} - Wise Wheels</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <div className={styles.wheelContainer}>
        <div className={styles.imageSection}>
          {data?.pictures.length > 0 && (
            <div className={styles.image}>
              <Image
                src={data.pictures[picNum - 1]}
                height={1000}
                width={1000}
                objectFit='contain'
                blurDataURL='/car9.png'
                placeholder='blur'
                loading='eager'
                quality={100}
                alt='3 Piece Wheels'
              />
            </div>
          )}
          <div className={styles.arrows}>
            <ChevronLeftIcon
              style={{ fontSize: '50' }}
              onClick={() => pictureCount(-1, data?.pictures.length)}
              className={styles.icons}
            />
            <p>
              {picNum} of {data?.pictures.length}
            </p>
            <ChevronRightIcon
              style={{ fontSize: '50' }}
              onClick={() => pictureCount(1, data?.pictures.length)}
              className={styles.icons}
            />
          </div>
        </div>
        <div className={styles.infoSection}>
          <h1>{data?.name}</h1>
          <h2>
            {data?.price &&
              new Intl.NumberFormat('en-us', {
                style: 'currency',
                currency: 'USD',
              }).format(data?.price / 100)}
          </h2>
          <p>{data?.description}</p>

          {diameter ? (
            <p>
              <h3>Selected Diameter</h3>
              {diameter}
            </p>
          ) : (
            <h3>Please Select Diameter on Wheels Page</h3>
          )}

          {bolt ? (
            <p>
              <h3>Selected Bolt Pattern</h3>
              {bolt}
            </p>
          ) : (
            <h3>Please Select Bolth Pattern On Wheels Page</h3>
          )}
          {bolt && diameter && (
            <div className={styles.buttonSection}>
              <button onClick={addToCart} className={styles.button}>
                Add to cart
              </button>
              <button className={styles.button2}>Share</button>
            </div>
          )}
        </div>
      </div>

      <ContactSection />

      <Footer />
    </div>
  );
}

export default wheels;
