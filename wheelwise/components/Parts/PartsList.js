import styles from '../../styles/Parts/PartsList.module.css';
import Part from './Part';

function PartsList() {
  const parts = [
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
    <div className={styles.partsListContainer}>
      <div className={styles.topSection}>
        <h1>Parts</h1>
        <p>Parts Available For The Size Entered</p>
      </div>
      <div className={styles.midSection}>
        {parts.map((part) => (
          <Part part={part} />
        ))}
      </div>
      <div className={styles.bottomSection}>
        <h3>Feel Free to contact us for more information</h3>
        <button className={styles.button}>Contact Us</button>
      </div>
    </div>
  );
}

export default PartsList;
