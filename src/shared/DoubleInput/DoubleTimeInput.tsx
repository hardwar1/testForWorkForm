import { HTMLInputTypeAttribute,  useLayoutEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import styles from './doubleinput.module.scss';

interface IDoubleInput {
  ariaLabelLeft: string;
  ariaLabelRight: string;
  name: string;
  defaultValue: string;
  inputType?: HTMLInputTypeAttribute;
  hourIs: number;
  hoursInDay: number;
  isBreaks: number;
}

export function DoubleTimeInput({
  name,
  ariaLabelLeft,
  ariaLabelRight,
  defaultValue,
  inputType = "text",
  hourIs,
  hoursInDay,
  isBreaks
}: IDoubleInput) {
  const [startValue, setStartValue] = useState(defaultValue);
  const [endValue, setEndValue] = useState(defaultValue);

  useLayoutEffect(() => {
    const startTime = startValue
      .split(':')
      .map(Number)
      .reduce((acc, item, index) =>
        (index === 0 ? acc += 60 * item : acc += item), 0);

    const totalTimeMinutes = hoursInDay * hourIs + (hoursInDay - 1) * isBreaks;
    const hours = (totalTimeMinutes + startTime - (startTime + totalTimeMinutes) % 60) / 60;
    const minutes = ('0' + (startTime + totalTimeMinutes) % 60).slice(-2);
    setEndValue(`0${hours}:${minutes}`.slice(-5));

  }, [hourIs, hoursInDay, isBreaks, startValue])

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value.split(':').map(Number);
    if (inputValue[0] > 23) inputValue[0] = 23;
    if (inputValue[1] > 59) inputValue[1] = 59;
    setStartValue(`${inputValue[0]}:${inputValue[1]}`)
  }

  return (
    <div className={styles.doubleInputBox}>
      <InputMask
        mask="99:99"
        className={styles.doubleInput}
        type={inputType}
        name={`${name}Start`}
        aria-label={ariaLabelLeft}
        value={startValue}
        maskChar="0"
        onChange={(e) => handleInput(e)}
        placeholder="HH:MM"
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
        disabled
      />

    </div>
  );
}
