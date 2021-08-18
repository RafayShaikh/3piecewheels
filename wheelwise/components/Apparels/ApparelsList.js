import styles from '../../styles/Apparels/ApparelsList.module.css';
import Apparel from './Apparel';

function ApparelsList({ items }) {
  return (
    <div className={styles.apparelsListContainer}>
      <div className={styles.topSection}>
        <h1>Apparel</h1>
      </div>
      <div className={styles.midSection}>
        {items?.map(
          (item) =>
            item && <Apparel key={item.id} id={item.id} item={item.data} />
        )}
      </div>
    </div>
  );
}

export default ApparelsList;
