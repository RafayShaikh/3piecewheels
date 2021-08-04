import styles from '../../styles/HeaderFooter/Footer.module.css';
import Image from 'next/image';

function Footer() {
  return (
    <div className={styles.footerContainer}>
      <Image
        src='/logoTemp.png'
        width={100}
        height={100}
        objectFit='contain'
        className={styles.image}
      />
      <p>Copyright, Wise Wheels, {new Date().getFullYear()}</p>
    </div>
  );
}

export default Footer;
