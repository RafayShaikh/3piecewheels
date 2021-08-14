import Image from 'next/image';
import { useState } from 'react';
import styles from '../../styles/Wheels/WheelsSelection.module.css';
import { SearchIcon } from '@heroicons/react/solid';
import { useSelector } from 'react-redux';
import { selectWheels } from '../../slices/webStateSlice';

function WheelsSelection() {
  const [wheelSize, setWheelSize] = useState(null);
  const image = useSelector(selectWheels);

  const handleWheelChange = (e) => {
    e.preventDefault();
    setWheelSize(e.target.value);
  };
  return (
    <div className={styles.wheelsContainer}>
      <img src={image[0]?.picture} className={styles.image} />
      <div className={styles.formContainer}>
        <h1>Find Wheels That Fit Your Style</h1>
        <h4>Select A Wheel Size</h4>
        <select onChange={handleWheelChange}>
          <option selected value=''>
            Wheel Size
          </option>
          <option value='grapefruit'>Grapefruit</option>
          <option value='lime'>Lime</option>
          <option value='coconut'>Coconut</option>
          <option value='mango'>Mango</option>
        </select>

        <button className={styles.button}>
          Search <SearchIcon className={styles.search} />
        </button>
      </div>
    </div>
  );
}

export default WheelsSelection;
