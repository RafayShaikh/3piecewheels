import styles from '../../styles/Home/MidSection.module.css';
import { ArrowCircleRightIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';

function MidSection() {
  const items = [
    { name: 'Accessories', link: '/accessories' },
    { name: 'Apparels', link: '/apparel' },
    { name: 'Parts', link: '/parts' },
    { name: 'Wheels', link: '/wheels' },
  ];
  const router = useRouter();
  const handleClick = (link) => {
    router.push(link);
  };

  return (
    <div className={styles.Container}>
      <h1>Let's Begin with a Category</h1>
      <div className={styles.midContainer}>
        {items.map((item) => (
          <div
            onClick={(e) => handleClick(item.link)}
            className={styles.midItems}
          >
            <h1>{item.name}</h1>
            <ArrowCircleRightIcon />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MidSection;
