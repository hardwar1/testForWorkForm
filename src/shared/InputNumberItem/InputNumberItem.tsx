import { useEffect, useState } from 'react';
import styles from './inputnumberitem.module.scss';

interface IInputNumberItem {
  text: string;
  name: string;
  min?: number;
  max?: number;
  onInputChange?: (value: number) => void;
}

export function InputNumberItem({ text, name, min, max, onInputChange }: IInputNumberItem) {
  const [value, setValue] = useState(1);

  useEffect(() => {
    if (onInputChange) onInputChange(value);
  }, [value])

  const increment = () => {

    if (max || max === 0) {
      if (value < max) setValue(value + 1)

    } else if (!max) {
      setValue(value + 1)
    }
  }

  const decrement = () => {
    if (min || min === 0) {
      if (value > min) setValue(value - 1)
    } else if (!min) {
      setValue(value - 1)
    }
  }

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setValue(Number(newValue));
  }

  return (
    <div className={styles.inputNumberItem}>
      <button
        className={styles.inputNumberButton}
        type="button" aria-label="прибавить"
        onClick={decrement}
      >
      </button>

      <label className={styles.inputNumberLabel}>
        <input className={styles.inputNumberInput}
          type="number"
          name={name}
          aria-label="количество часов"
          placeholder=""
          inputMode="numeric"

          value={value}
          onChange={handleChange}
          min={min}
          max={max}
          required
        />

        <span className={styles.inputNumberText}>
          {text}
        </span>
      </label>

      <button
        className={`${styles.inputNumberButton} ${styles.inputNumberButtonPlus}`}
        type="button"
        aria-label="уменьшить"
        onClick={increment}
      >
      </button>
    </div>
  );
}
