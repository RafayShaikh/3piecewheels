import Image from 'next/image';
import styles from '../../styles/Parts/Part.module.css';

function Part({ part }) {
  return (
    <div className={styles.partThumbnail}>
      <Image
        src={part.thumbnail}
        width={100}
        height={100}
        className={styles.image}
      />
      <h2>{part.name}</h2>
    </div>
  );
}

export default Part;
