import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import styles from '../../styles/Wheels/WheelsSelection.module.css';
import { SearchIcon } from '@heroicons/react/solid';
import { useSelector } from 'react-redux';
import { selectWheels } from '../../slices/webStateSlice';

function WheelsSelection({ bolts, diameter, setSelectedSize }) {
  const image = useSelector(selectWheels);
  const ref = useRef();

  const handleBoltChange = (e) => {
    e.preventDefault();
    if (e.target.value !== '') {
      setSelectedSize({ selection: e.target.value, function: 'bolt' });
    }
  };
  const handleDiameterChange = (e) => {
    e.preventDefault();
    ref.current.value = '';
    if (e.target.value !== '') {
      setSelectedSize({ selection: e.target.value, function: 'diameter' });
    }
  };

  return (
    <div className={styles.wheelsContainer}>
      <img src={image[0]?.picture} className={styles.image} />
      <div className={styles.formContainer}>
        <h1>Find Wheels That Fit Your Style</h1>
        <h4>Select A Wheel Diameter</h4>
        <select onChange={handleDiameterChange}>
          <option selected value=''>
            Wheel Diameter
          </option>
          {diameter.map((d) => (
            <option value={d}>{d}</option>
          ))}
        </select>
        <h1>AND</h1>
        <h4>Select A Bolt Pattern</h4>
        <select ref={ref} onChange={handleBoltChange}>
          <option selected value=''>
            Bolt Pattern
          </option>
          {bolts.map((b) => (
            <option value={b}>{b}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default WheelsSelection;
