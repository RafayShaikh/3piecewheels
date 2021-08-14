import styles from '../../styles/Accessories/AccessoriesList.module.css';
import Accessory from './Accessory';
import ContactSection from '../ContactSection';

function AccessoriesList() {
  const accessories = [
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
    <div className={styles.accessoriesListContainer}>
      <div className={styles.topSection}>
        <h1>Accessories</h1>
      </div>
      <div className={styles.midSection}>
        {accessories.map((accessory) => (
          <Accessory accessory={accessory} />
        ))}
      </div>

      <ContactSection />
    </div>
  );
}

export default AccessoriesList;
