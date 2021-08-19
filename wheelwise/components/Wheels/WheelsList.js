import styles from '../../styles/Wheels/WheelsList.module.css';
import Wheel from './Wheel';

function ApparelsList({ items }) {
  return (
    <div className={styles.wheelsListContainer}>
      <div className={styles.topSection}>
        <h1>Wheels</h1>
      </div>
      <div className={styles.midSection}>
        {items?.map(
          (item) =>
            item && <Wheel key={item.id} id={item.id} item={item.data} />
        )}
      </div>
    </div>
  );
}

export default ApparelsList;
