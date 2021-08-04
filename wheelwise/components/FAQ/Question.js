import { useState } from 'react';
import styles from '../../styles/FAQ/Question.module.css';

const Question = ({ title, info }) => {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <article className={styles.question}>
      <header>
        <h4>{title}</h4>
        <button className={styles.btn} onClick={() => setShowInfo(!showInfo)}>
          {showInfo ? '-' : '+'}
        </button>
      </header>
      {showInfo && <p>{info}</p>}
    </article>
  );
};

export default Question;
