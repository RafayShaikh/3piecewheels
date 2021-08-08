import Image from 'next/image';
import styles from '../../styles/Home/TopSection.module.css';
import { ArrowCircleDownIcon } from '@heroicons/react/solid';

function TopSection() {
  return (
    <div className={styles.topSection}>
      <div className={styles.subHead}>
        <img src='/car1.jpg' className={styles.image} />
        <div className={styles.text}>
          <h1>RIDING LOW IS A RITUAL .</h1>
          <p>
            Upgrade your car with the wheels, accessories, and parts that it
            deserve. Let us have a chance to make your ride represent YOU.
          </p>
          <button className={styles.button}>
            Find Mods Below <ArrowCircleDownIcon className={styles.arrow} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TopSection;
