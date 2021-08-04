import styles from '../../styles/Home/MidSection.module.css';
import { ArrowCircleRightIcon } from '@heroicons/react/solid';

function MidSection() {
  const items = [
    { name: 'Accessories' },
    { name: 'Apparels' },
    { name: 'Parts' },
    { name: 'Wheels' },
  ];

  return (
    <div className={styles.Container}>
      <h1>Let's Begin with a Category</h1>
      <div className={styles.midContainer}>
        {items.map((item) => (
          <div className={styles.midItems}>
            <h1>{item.name}</h1>
            <ArrowCircleRightIcon />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MidSection;
