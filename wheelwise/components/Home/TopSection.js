import Image from 'next/image';
import styles from '../../styles/Home/TopSection.module.css';
import { ArrowCircleRightIcon } from '@heroicons/react/solid';

function TopSection() {
  return (
    <div className={styles.topSection}>
      <div className={styles.subHead}>
        <Image
          src='/car1.jpg'
          objectFit='cover'
          layout='fill'
          className={styles.image}
        />
        <div className={styles.text}>
          <h1>Your Car Is Not Just A Tool</h1>
          <p>
            Upgrade your car with the wheels, accessories, and parts that it
            deserve. Let us have a chance to make your ride represent YOU.
          </p>
          <button className={styles.button}>
            Find Mods <ArrowCircleRightIcon className={styles.arrow} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TopSection;
