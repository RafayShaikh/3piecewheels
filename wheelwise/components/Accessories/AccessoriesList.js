import styles from '../../styles/Accessories/AccessoriesList.module.css';
import Accessory from './Accessory';

function AccessoriesList({ items }) {
  return (
    <div className={styles.accessoriesListContainer}>
      <div className={styles.topSection}>
        <h1>Accessories</h1>
      </div>
      <div className={styles.midSection}>
        {items?.map(
          (item) =>
            item && <Accessory key={item.id} id={item.id} item={item.data} />
        )}
      </div>
    </div>
  );
}

export default AccessoriesList;
