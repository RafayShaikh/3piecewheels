import styles from '../../styles/Wheels/WheelsList.module.css';
import ContactSection from '../ContactSection';
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
      <ContactSection />;
    </div>
  );
}

export default WheelsList;
