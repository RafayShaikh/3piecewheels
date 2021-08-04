import Image from 'next/image';
import styles from '../../styles/Accessories/Accessory.module.css';

function Accessory({ accessory }) {
  return (
    <div className={styles.accessoryThumbnail}>
      <Image
        src={accessory.thumbnail}
        width={100}
        height={100}
        className={styles.image}
      />
      <h2>{accessory.name}</h2>
    </div>
  );
}

export default Accessory;
