import styles from '../../styles/Gallery/gallery.module.css';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Image from 'next/image';
import { useEffect, useState } from 'react';

function GalleryItem({ item }) {
  const [picNum, setPicNum] = useState(1);
  const style = {
    largeIcon: {
      width: 60,
      height: 60,
    },
  };

  const pictureCount = (num, max) => {
    if (num < 0 && picNum > 1) {
      setPicNum(picNum - 1);
    }
    if (num > 0 && picNum < max) {
      setPicNum(picNum + 1);
    }
  };

  useEffect(() => {}, []);
  return (
    <div className={styles.item}>
      <div className={styles.icons}>
        {item?.pictures.length > 0 && (
          <Image
            src={item.pictures[picNum - 1]}
            height={600}
            width={600}
            objectFit='contain'
            blurDataURL='/car9.png'
            placeholder='blur'
            loading='eager'
            quality={100}
          />
        )}
        <div className={styles.arrows}>
          <ChevronLeftIcon
            style={{ fontSize: '50' }}
            onClick={() => pictureCount(-1, item?.pictures.length)}
            className={styles.icons}
          />
          <p>
            {picNum} of {item?.pictures.length}
          </p>
          <ChevronRightIcon
            style={{ fontSize: '50' }}
            onClick={() => pictureCount(1, item?.pictures.length)}
            className={styles.icons}
          />
        </div>
      </div>
      <p>{item?.description}</p>
    </div>
  );
}

export default GalleryItem;
