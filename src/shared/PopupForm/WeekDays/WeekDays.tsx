import { useEffect, useState } from 'react';
import styles from './weekdays.module.scss';
import { clearWeek, daysText } from '../PopupForm';
interface IWeekDays {
  valueArray: boolean[];
  setWeek: (a: boolean[]) => void;
}

export function WeekDays({valueArray, setWeek}: IWeekDays) {
  const [valueArr, setValueArr] = useState(clearWeek);

  useEffect(() => {
    setValueArr(valueArray)
  }, [valueArray])

  const handleCheck = (index: number)=> {
    const result: boolean[] = [];
    for (let i = 0; i < 7; i++) {
      if (i === index) {
        result.push(!valueArr[i])
      } else {
        result.push(valueArr[i])
      }
    }
    
    setWeek(result);
    setValueArr(result)
  }

  return (
    <ul className={styles.week}>

      {daysText.map((day, index) => (
        <li className={styles.item} key={(()=> Math.random())()}>
          <label className={styles.dayWrapper}>
            <input
              className={`visually-hidden ${styles.checkbox}`}
              type="checkbox"
              name="weekDay"
              onChange={() => handleCheck(index)}
              checked={valueArr.length > 0 ? valueArr[index] : false}
            />

            <span className={styles.day}>
              {day}
            </span>
          </label>
        </li>
      ))}

    </ul>
  );
}
