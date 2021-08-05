import styles from '../../styles/HeaderFooter/Header.module.css';
import Navigation from './Navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

function Header() {
  const [header, setHeader] = useState('header');
  const listenScrollEvent = (event) => {
    if (window.scrollY < 73) {
      return setHeader('header');
    } else if (window.scrollY > 70) {
      return setHeader('2');
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent);

    return () => window.removeEventListener('scroll', listenScrollEvent);
  }, []);
  return (
    <>
      {header === 'header' ? (
        <div className={styles.header_container}>
          <div className={styles.header_left}>
            <Link href='/'>
              <a>
                <Image
                  className={styles.header_logo}
                  src='/logoCropped.png'
                  width={400}
                  height={100}
                  objectFit='contain'
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
            <Link href='/'>
              <a>
                <Image
                  className={styles.header_logo2}
                  src='/logoCropped.png'
                  width={400}
                  height={100}
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
