import { useRouter } from 'next/router';
import styles from '../../styles/Apparels/ApparelsList.module.css';
import Apparel from './Apparel';

function ApparelsList() {
  const apparels = [
    { id: 1, name: 'Hello', thumbnail: '/logoTemp.png' },
    { id: 2, name: 'Hello', thumbnail: '/logoTemp.png' },
    { id: 3, name: 'Hello', thumbnail: '/logoTemp.png' },
    { id: 4, name: 'Hello', thumbnail: '/logoTemp.png' },
    { id: 5, name: 'Hello', thumbnail: '/logoTemp.png' },
    { id: 6, name: 'Hello', thumbnail: '/logoTemp.png' },
    { id: 7, name: 'Hello', thumbnail: '/logoTemp.png' },
    { id: 8, name: 'Hello', thumbnail: '/logoTemp.png' },
    { id: 9, name: 'Hello', thumbnail: '/logoTemp.png' },
    { id: 10, name: 'Hello', thumbnail: '/logoTemp.png' },
    { id: 11, name: 'Hello', thumbnail: '/logoTemp.png' },
  ];
  const router = useRouter();
  const handleRoute = (params) => {
    router.push('/faq');
  };
  return (
    <div className={styles.apparelsListContainer}>
      <div className={styles.topSection}>
        <h1>Apparels</h1>
        <p>Apparels Available For The Size Entered</p>
      </div>
      <div className={styles.midSection}>
        {apparels.map((apparel) => (
          <Apparel apparel={apparel} />
        ))}
      </div>
      <div className={styles.bottomSection}>
        <h3>Feel Free to contact us for more information</h3>
        <button onClick={handleRoute} className={styles.button}>
          Contact Us
        </button>
      </div>
    </div>
  );
}

export default ApparelsList;
