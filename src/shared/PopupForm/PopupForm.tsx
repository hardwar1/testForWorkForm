import { FormEvent, useEffect, useRef, useState } from 'react';
import { Overlay } from '../Overlay';
import styles from './popupform.module.scss';
import { WeekDays } from './WeekDays';
import { Select } from '../Select';
import { InputNumberItem } from '../InputNumberItem';
import { DoubleTimeInput } from '../DoubleInput/DoubleTimeInput';
import { DoubleDateInput } from '../DoubleInput/DoubleDateInput';

const hoursListSelect = ['Академические', 'Астрономические'];
const breaksListSelect = ['Без перерыва', 'С блек джеком и дамами', 'C дремотой'];
const teachersListSelect = ['Рубенович', 'Петрович', 'Сан Саныч', 'Рукожопыч'];
const auditoriumListSelect = ['101', '202', '303', '666'];

export const daysText = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
export const clearWeek = [false, false, false, false, false, false, false];
const days1 = [true, false, true, false, true, false, false];
const days2 = [false, true, false, true, false, false, false];

export interface IWeekDays {
  'ПН'?: boolean,
  'ВТ'?: boolean,
  'СР'?: boolean,
  'ЧТ'?: boolean,
  'ПТ'?: boolean,
  'СБ'?: boolean,
  'ВС'?: boolean
}

interface ISubmitObject {
  [key: string]: string | undefined | Date | IWeekDays;
}

const today = `${(new Date).getFullYear()}-${(new Date).getMonth() + 1}-${(new Date).getDate()}`

export function PopupForm() {
  const [inputColorValue, setInputColorValue] = useState('#ffffff');
  const [weekDaysOn, setWeekDaysOn] = useState(clearWeek);
  const [hourIs, setHourIs] = useState(45);
  const [hoursInDay, setHoursInDay] = useState(1);
  const [hoursAll, setAllHours] = useState(1);
  const [isBreaks, setIsBreaks] = useState(0);
  const [startDate, setStartDate] = useState<Date>();
  const [finalDate, setFinalDate] = useState<Date>();
  const [weekObj, setWeekObj] = useState<IWeekDays>({});
  const [isWeekDaysOn, setIsWeekDaysOn] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [height, setHeight] = useState(0);

  const refForm = useRef(null);
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showMessage) {
      setTimeout(() => {
        setHeight(messageRef.current?.clientHeight || 0);
      }, 0);
    }
  }, [showMessage, isWeekDaysOn]);

  const changeWeekDaysOn = (a: boolean) => {
    setIsWeekDaysOn(a);
    if (a) {
      setShowMessage(false);
      setHeight(0)
    }
  }

  const getStartDate = (start: Date) => {
    setStartDate(start);
  }

  const getFinalDate = (final: Date) => {
    setFinalDate(final);
  }

  const closePopup = () => { }

  const changeGroupColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputColorValue(e.target.value)
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isWeekDaysOn) {
      setShowMessage(true);
      return;
    }

    const submitObject: ISubmitObject = {};

    for (const item of e.currentTarget) {
      if (item instanceof HTMLInputElement
        && item.name
        && item.name !== 'weekDay'
        && item.name !== 'dateStart'
        && item.name !== 'dateEnd'
      ) {
        submitObject[item.name] = item.value;
      }
    }
    // console.log(e.currentTarget);

    submitObject.weekDays = weekObj;
    submitObject.finalDate = finalDate;
    submitObject.startDate = startDate;
    console.log(submitObject);
  }

  function setWeek(week: boolean[]) {
    setWeekDaysOn(week);
    const obj: { [key: string]: boolean } = {}
    for (let i = 0; i < week.length; i++) {
      obj[daysText[i]] = week[i];
    }

    setWeekObj(obj);
  }

  const selectChangeHour = (str: string) => {
    if (str === 'Астрономические') {
      setHourIs(60)
    }

    if (str === 'Академические') {
      setHourIs(45)
    }
  }

  const selectChangeBreaks = (str: string) => {
    if (str === 'Без перерыва') {
      setIsBreaks(0)
    }

    if (str === 'С блек джеком и дамами') {
      setIsBreaks(10)
    }

    if (str === 'C дремотой') {
      setIsBreaks(15)
    }
  }

  const handleChangeAllHours = (hours: number) => {
    setAllHours(hours);
  }

  return (
    <>
      <div className={styles.popup}>
        <form className={styles.form} onSubmit={handleSubmit} ref={refForm}>
          <div className={styles.top}>
            <h2 className={styles.title}>
              Редактирование расписания
            </h2>

            <button className={styles.closeButton} aria-label="закрыть" type="button"></button>
          </div>

          <div className={styles.middle}>
            <div className={styles.namesRow}>
              <label className={styles.labelSchool}>
                <input className="input"
                  type="text"
                  aria-label="Онлайн школа"
                  placeholder="Онлайн школа"
                  name="school"
                  required
                />
              </label>

              <label className={styles.colorsWrapper}>
                <span className={styles.colorsText}>
                  Цвет группы:
                </span>

                <input className={styles.colorsInput}
                  type="color"
                  name="groupColor"
                  aria-label="выберите цвет группы"
                  defaultValue={inputColorValue}
                  onChange={changeGroupColor}
                />
              </label>
            </div>

            <div className={styles.hoursRow}>
              <Select list={hoursListSelect} name='hoursType' onSelectChange={selectChangeHour} />

              <InputNumberItem
                text="Всего часов"
                name="totalHours"
                min={1}
                onInputChange={handleChangeAllHours}
              />

              <DoubleDateInput
                name="date"
                ariaLabelLeft="дата начала"
                ariaLabelRight="дата окончания"
                defaultValue={today}
                inputType='date'
                hoursInDay={hoursInDay}
                hoursAll={hoursAll}
                weekDaysOn={weekDaysOn}
                getStartDate={getStartDate}
                getFinalDate={getFinalDate}
                changeWeekDaysOn={changeWeekDaysOn}
              />

            </div>

            <div className={styles.daysRow}>
              <div className={styles.daysButtons}>
                <button
                  className={styles.daysButton}
                  type='button'
                  onClick={() => setWeekDaysOn([...days1])}
                >
                  ПН/СР/ПТ
                </button>

                <button
                  className={styles.daysButton}
                  type='button'
                  onClick={() => setWeekDaysOn([...days2])}
                >
                  ВТ/ЧТ
                </button>
              </div>

              <WeekDays valueArray={weekDaysOn} setWeek={setWeek} />
            </div>

            <div className={styles.hoursRow}>
              <Select
                list={breaksListSelect}
                name='breakType'
                onSelectChange={selectChangeBreaks}
              />

              <InputNumberItem
                onInputChange={setHoursInDay}
                text="Часов в день"
                name="hoursInDay"
                min={1}
                max={10}
              />

              <DoubleTimeInput
                isBreaks={isBreaks}
                hourIs={hourIs}
                hoursInDay={hoursInDay}
                name="time"
                ariaLabelLeft="дата начала"
                ariaLabelRight="дата окончания"
                defaultValue="07:00"
                inputType='string'
              />

            </div>

            <div className={styles.selectsRow}>
              <Select
                list={teachersListSelect}
                name='teacher'
                defaultValue=""
                text='Выберите преподавателя на это время'
              />

              <Select
                list={auditoriumListSelect}
                name='auditorium'
                defaultValue=''
                text='Аудитория'
              />
            </div>

            <p className={styles.textBox}>
              Выбор <b>преподавателя</b> и <b>аудитории</b> не обязателен.
            </p>

            <div className={styles.hideWrapper} style={{ height: showMessage ? height : 0 }}>
              <p className={styles.textBox} ref={messageRef}>
                <b>
                  Вы не выбрали учебные(рабочие) дни
                </b>
              </p>
            </div>

          </div>

          <div className={styles.bottom}>
            <button className={styles.cancellation} type='button'>
              Отмена
            </button>

            <button className={styles.submit} type='submit'>
              <span>
                Добавить расписание
              </span>
            </button>
          </div>

        </form>
      </div>

      <Overlay handleClick={closePopup} />

    </>
  );
}
