import Image from 'next/image';
import styles from '../../styles/Wheels/Wheel.module.css';

function Wheel({ wheel }) {
  return (
    <div className={styles.wheelThumbnail}>
      <Image
        src={wheel.thumbnail}
        width={100}
        height={100}
        className={styles.image}
      />
      <h2>{wheel.name}</h2>
    </div>
  );
}

export default Wheel;
