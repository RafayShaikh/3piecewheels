import styles from '../../styles/HeaderFooter/Footer.module.css';
import Image from 'next/image';

function Footer() {
  return (
    <div className={styles.footerContainer}>
      <Image
        className={styles.header_logo}
        onClick={() => clickHandler('/')}
        src='/logoCropped.png'
        width={400}
        height={100}
        objectFit='contain'
      />
      <p>Copyright, Wise Wheels LLC, {new Date().getFullYear()}</p>
    </div>
  );
}

export default Footer;
