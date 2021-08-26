import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectItems } from '../../slices/wheelsSlice';
import styles from '../../styles/Wheels/WheelsList.module.css';
import Wheel from './Wheel';

function ApparelsList() {
  var slice = useSelector(selectItems);
  const [items, setitems] = useState([]);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    setitems(slice);
    setFetched(true);
  }, [useSelector(selectItems)]);
  return (
    <div className={styles.wheelsListContainer}>
      <div className={styles.topSection}>
        <h1>Wheels</h1>
      </div>
      <div className={styles.midSection}>
        {fetched && items?.length > 0 ? (
          items?.map((item) => (
            <Wheel
              fetched={fetched}
              key={item.id}
              id={item.id}
              item={item.data}
            />
          ))
        ) : (
          <div>
            <h1>It Looks Like We Ran Out Of Selected Size.</h1>
            <p>
              Please contact us below, so we can discuss about the desired size.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ApparelsList;
