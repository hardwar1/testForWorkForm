import { HTMLInputTypeAttribute, useEffect, useState } from 'react';
import styles from './doubleinput.module.scss';

interface IDoubleInput {
  ariaLabelLeft: string;
  ariaLabelRight: string;
  name: string;
  defaultValue: string;
  inputType?: HTMLInputTypeAttribute;
  hourTime?: boolean;
  hoursInDay: number;
  hoursAll: number;
  weekDaysOn: boolean[];
  changeWeekDaysOn: (a: boolean) => void;
  getFinalDate: (date: Date) => void;
  getStartDate: (date: Date) => void;
}

export function DoubleDateInput({
  name,
  ariaLabelLeft,
  ariaLabelRight,
  defaultValue,
  hoursInDay,
  hoursAll,
  weekDaysOn,
  getFinalDate,
  getStartDate,
  changeWeekDaysOn,
  inputType = "text" }: IDoubleInput) {
  const [startValue, setStartValue] = useState(defaultValue);
  const [endValue, setEndValue] = useState('выберите дни');

  useEffect(() => {
    const studyDaysWeekArray: number[] = [];
    if (weekDaysOn[6]) studyDaysWeekArray.push(0);
    for (let i = 0; i < weekDaysOn.length - 1; i++) {
      if (weekDaysOn[i]) studyDaysWeekArray.push(i + 1);
    }

    if (studyDaysWeekArray.length < 1) {
      setEndValue('выберите дни');
      changeWeekDaysOn(false);
      return
    }
    changeWeekDaysOn(true);
    const calcStudyDays = Math.ceil(hoursAll / hoursInDay);

    const [YYYY, MM, DD] = startValue.split('-').map(Number);

    const startDay = new Date(YYYY, (MM - 1), DD);
    getStartDate(startDay);

    const studyDaysOfThisWeek = studyDaysWeekArray.filter(item => item >= startDay.getDay()).length;

    let endWeekDay: number;

    if (calcStudyDays <= studyDaysOfThisWeek) {

      endWeekDay = studyDaysWeekArray[studyDaysWeekArray.length - studyDaysOfThisWeek + calcStudyDays - 1];

      endWeekDay - startDay.getDay();
      const endDate = new Date(YYYY, (MM - 1), DD + endWeekDay - startDay.getDay());
      getFinalDate(endDate);
      setEndValue(`${('0' + endDate.getDate()).slice(-2)}.${('0' + (endDate.getMonth() + 1)).slice(-2)}.${endDate.getFullYear()}`);

      return;
    }

    let studyDaysAtLastWeek: number;

    let calcStudyWeeks = Math.floor((calcStudyDays - studyDaysOfThisWeek) / studyDaysWeekArray.length)
    if (calcStudyWeeks > 0 && calcStudyWeeks === (calcStudyDays - studyDaysOfThisWeek) / studyDaysWeekArray.length) {
      calcStudyWeeks--;  
      studyDaysAtLastWeek = studyDaysWeekArray.length
    } else {
      studyDaysAtLastWeek = calcStudyDays - calcStudyWeeks * studyDaysWeekArray.length - studyDaysOfThisWeek;
    }
    
    const calendarDays = 6 - startDay.getDay() + 1
      + studyDaysWeekArray[studyDaysAtLastWeek - 1]
      + calcStudyWeeks * 7;

    const finalDate = new Date(startDay.getTime() + 24 * 60 * 60 * 1000 * calendarDays)
    
    setEndValue(`${('0' + finalDate.getDate()).slice(-2)}.${('0' + (finalDate.getMonth() + 1)).slice(-2)}.${finalDate.getFullYear()}`);
    getFinalDate(finalDate);

  }, [hoursInDay, hoursAll, weekDaysOn, startValue]);

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
        type="string"
        name={`${name}End`}
        aria-label={ariaLabelRight}
        value={endValue}
        onChange={(e) => setEndValue(e.target.value)}
        disabled
      />

    </div>
  );
}
