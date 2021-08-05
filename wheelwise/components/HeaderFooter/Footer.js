import styles from '../../styles/HeaderFooter/Footer.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';

function Footer() {
  const router = useRouter();
  const handleRoute = (params) => {
    router.push('/faq');
  };
  return (
    <div className={styles.footerContainer}>
      <Image
        className={styles.header_logo}
        src='/logoCropped.png'
        width={400}
        height={100}
        objectFit='contain'
        onClick={handleRoute}
      />
      <p>Copyright, Wise Wheels LLC, {new Date().getFullYear()}</p>
    </div>
  );
}

export default Footer;
