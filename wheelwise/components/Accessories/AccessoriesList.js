import { useRouter } from 'next/router';
import styles from '../../styles/Accessories/AccessoriesList.module.css';
import Accessory from './Accessory';

function AccessoriesList() {
  const router = useRouter();
  const handleRoute = (params) => {
    router.push('/faq');
  };

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

      <div className={styles.bottomSection}>
        <h3>Feel Free to contact us for more information</h3>
        <button onClick={handleRoute} className={styles.button}>
          Contact Us
        </button>
      </div>
    </div>
  );
}

export default AccessoriesList;
