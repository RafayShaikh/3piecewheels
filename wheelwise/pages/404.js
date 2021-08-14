import Facebook from '@material-ui/icons/Facebook';
import Link from 'next/link';
import ContactSection from '../components/ContactSection';
import styles from '../styles/notfound.module.css';

function Custom404() {
  return (
    <div className={styles.container}>
      <h1>Page Not Found</h1>
      <p>Since you're here, why not join our group </p>
      <Link href='https://www.facebook.com/groups/4232301490157059/'>
        <a>
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
      <ContactSection />
    </div>
  );
}

export default Custom404;
