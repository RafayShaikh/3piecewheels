import Link from 'next/link';
import React from 'react';
import styles from '../../styles/HeaderFooter/Navigation.module.css';

function Navigation() {
  return (
    <div className={styles.navigation_container}>
      <div className={styles.navigation_list}>
        <Link href='/'>
          <a>
            <h4 className={styles.link}>Home</h4>
          </a>
        </Link>

        <Link href='/wheels'>
          <a>
            <h4 className={styles.link}>Wheels</h4>
          </a>
        </Link>
        <Link href='/accessories'>
          <a>
            <h4 className={styles.link}>Accessories</h4>
          </a>
        </Link>
        <Link href='/parts'>
          <a>
            <h4 className={styles.link}>Parts</h4>
          </a>
        </Link>
        <Link href='/apparels'>
          <a>
            <h4 className={styles.link}>Apparel</h4>
          </a>
        </Link>

        <Link href='/gallery'>
          <a>
            <h4 className={styles.link}>Gallery</h4>
          </a>
        </Link>
      </div>
    </div>
  );
}

export default Navigation;
