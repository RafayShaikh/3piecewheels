import { useRouter } from 'next/router';
import styles from '../../styles/Wheels/WheelsList.module.css';
import Wheel from './Wheel';

function WheelsList() {
  const wheels = [
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
    <div className={styles.wheelsListContainer}>
      <div className={styles.topSection}>
        <h1>Wheels</h1>
        <p>Wheels Available For The Size Entered</p>
      </div>
      <div className={styles.midSection}>
        {wheels.map((wheel) => (
          <Wheel wheel={wheel} />
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

export default WheelsList;
