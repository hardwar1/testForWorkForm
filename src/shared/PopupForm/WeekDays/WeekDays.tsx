import styles from './weekdays.module.scss';

const daysText = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];

export function WeekDays() {


  return (
    <ul className={styles.week}>

      {daysText.map(day => (
        <li className={styles.item} key={(()=> Math.random())()}>
          <label className={styles.dayWrapper}>
            <input
              className={`visually-hidden ${styles.checkbox}`}
              type="checkbox"
              name="weekDay"
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
