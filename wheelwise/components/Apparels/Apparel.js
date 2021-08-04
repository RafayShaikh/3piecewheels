import Image from 'next/image';
import styles from '../../styles/Apparels/Apparel.module.css';

function Apparel({ apparel }) {
  return (
    <div className={styles.apparelThumbnail}>
      <Image
        src={apparel.thumbnail}
        width={100}
        height={100}
        className={styles.image}
      />
      <h2>{apparel.name}</h2>
    </div>
  );
}

export default Apparel;
