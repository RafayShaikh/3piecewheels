import styles from '../../styles/Apparels/ApparelsList.module.css';
import Apparel from './Apparel';
import ContactSection from '../ContactSection';

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
      <ContactSection />
    </div>
  );
}

export default ApparelsList;
