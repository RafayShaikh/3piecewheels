import Image from 'next/image';
import styles from '../../styles/Wheels/Wheel.module.css';
import { useRouter } from 'next/router';

function Wheel({ wheel }) {
  const router = useRouter();
  const handleClick = (e) => {
    router.push({
      pathname: '/wheels/wheel',
      query: {
        id: wheel.id,
        picture: wheel.thumbnail,
        name: wheel.name,
      },
    });
  };
  return (
    <div onClick={handleClick} className={styles.wheelThumbnail}>
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
