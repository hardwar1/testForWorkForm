import { HTMLInputTypeAttribute, useState } from 'react';
import styles from './doubleinput.module.scss';

interface IDoubleInput {
  ariaLabelLeft: string;
  ariaLabelRight: string;
  name: string;
  defaultValue: string;
  inputType?: HTMLInputTypeAttribute;
  hourTime?: boolean;
}

export function DoubleDateInput({ name, ariaLabelLeft, ariaLabelRight, defaultValue, inputType = "text"}: IDoubleInput) {
  const [startValue, setStartValue] = useState(defaultValue);
  const [endValue, setEndValue] = useState(defaultValue);

  return (
    <div className={styles.doubleInputBox}>
      <input
        className={styles.doubleInput}
        type={inputType}
        name={`${name}Start`}
        aria-label={ariaLabelLeft}
        value={startValue}
        onChange={(e) => setStartValue(e.target.value)}
        required
      />



      <span className={styles.doubleInputText}>
        до
      </span>

      <input
        className={styles.doubleInput}
        type={inputType}
        name={`${name}End`}
        aria-label={ariaLabelRight}
        value={endValue}
        onChange={(e) => setEndValue(e.target.value)}
        required
      />

    </div>
  );
}
