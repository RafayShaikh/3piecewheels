import { useRouter } from 'next/router';
import styles from '../styles/ContactSection.module.css';

function ContactSection() {
  const router = useRouter();
  const handleRoute = (params) => {
    router.push('/faq');
  };

  return (
    <div className={styles.bottomSection}>
      <h3>Haven't found what you're looking for?</h3>
      <p>Feel Free to contact us for more information </p>
      <button onClick={handleRoute} className={styles.button}>
        Contact Us
      </button>
    </div>
  );
}

export default ContactSection;
