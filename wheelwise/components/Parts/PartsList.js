import styles from '../../styles/Parts/PartsList.module.css';
import Part from './Part';

function ApparelsList({ items }) {
  return (
    <div className={styles.partsListContainer}>
      <div className={styles.topSection}>
        <h1>Parts</h1>
      </div>
      <div className={styles.midSection}>
        {items?.map(
          (item) => item && <Part key={item.id} id={item.id} item={item.data} />
        )}
      </div>
    </div>
  );
}

export default ApparelsList;
