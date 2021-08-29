import styles from '../../styles/HeaderFooter/Header.module.css';
import Navigation from './Navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadImages, selectTotal } from '../../slices/webStateSlice';
import { db } from '../../firebase/firebase';
import { ShoppingCartIcon } from '@heroicons/react/solid';
import router from 'next/router';
import { selectCartItems } from '../../slices/cartSlice';

function Header() {
  const items = useSelector(selectCartItems);

  const [header, setHeader] = useState('header');
  const dispatch = useDispatch();
  const totalImages = useSelector(selectTotal);
  const listenScrollEvent = (event) => {
    if (window.scrollY < 73) {
      return setHeader('header');
    } else if (window.scrollY > 70) {
      return setHeader('2');
    }
  };

  const fetchImages = async () => {
    const collection = await db.collection('images').get();
    collection.docs.map((doc) => {
      dispatch(loadImages(doc.data()));
    });
  };

  useEffect(() => {
    if (totalImages <= 5) {
      fetchImages();
    }
    window.addEventListener('scroll', listenScrollEvent);
    return () => window.removeEventListener('scroll', listenScrollEvent);
  }, []);
  return (
    <>
      {header === 'header' ? (
        <div className={styles.header_container}>
          <div className={styles.header_left}>
            <div
              onClick={() => router.push('/checkout')}
              className={styles.cart}
            >
              <span>{items.length}</span>
              <ShoppingCartIcon className={styles.carIcon} />
            </div>
            <Link href='/'>
              <a>
                <img
                  className={styles.header_logo}
                  src='/logoCropped.png'
                  alt='3 Piece Wheels'
                />
              </a>
            </Link>
            <div className={styles.header_navigation}>
              <Navigation />
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.header_container2}>
          <div className={styles.header_left2}>
            <div
              onClick={() => router.push('/checkout')}
              className={styles.cart}
            >
              <span>{items.length}</span>
              <ShoppingCartIcon />
            </div>
            <Link href='/'>
              <a>
                <img
                  className={styles.header_logo2}
                  src='/logoCropped.png'
                  alt='3 Piece Wheels'
                />
              </a>
            </Link>
            <div className={styles.header_navigation2}>
              <Navigation />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
