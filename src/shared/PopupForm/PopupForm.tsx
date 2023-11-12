import { useState } from 'react';
import { Overlay } from '../Overlay';
import styles from './popupform.module.scss';
import { WeekDays } from './WeekDays';
import { Select } from '../Select';
import { InputNumberItem } from '../InputNumberItem';
import { DoubleInput } from '../DoubleInput';

const hoursListSelect = ['Академические', 'Астрономические'];
const breaksListSelect = ['Без перерыва', 'С блек джеком и дамами', 'C дремотой'];
const teachersListSelect = ['Рубенович', 'Петрович', 'Петрович', 'Сан Саныч', 'Рукожопыч'];
const auditoriumListSelect = ['101', '202', '303', '666'];

const today = `${(new Date).getFullYear()}-${(new Date).getMonth()}-${(new Date).getDate()}`


export function PopupForm() {
  const [inputColorValue, setInputColorValue] = useState('#ffffff');

  const closePopup = () => { }

  const changeGroupColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputColorValue(e.target.value)
  }

  return (
    <>
      <div className={styles.popup}>
        <form className={styles.form}>
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
              <Select list={hoursListSelect} name='hoursType' />

              <InputNumberItem text="Всего часов" name="totalHours" />

              <DoubleInput
                name="date"
                ariaLabelLeft="дата начала"
                ariaLabelRight="дата окончания"
                defaultValue={today}
                inputType='date'
              />

            </div>

            <div className={styles.daysRow}>
              <div className={styles.daysButtons}>
                <button
                  className={styles.daysButton}
                  type='button'
                  onClick={() => { }}
                >
                  ПН/СР/ПТ
                </button>

                <button
                  className={styles.daysButton}
                  type='button'
                  onClick={() => { }}
                >
                  ВТ/ЧТ
                </button>
              </div>

              <WeekDays />
            </div>

            <div className={styles.hoursRow}>
              <Select list={breaksListSelect} name='isBreaks' />

              <InputNumberItem text="Часов в день" name="totalHours" />

              <DoubleInput
                name="date"
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
          </div>

          <div className={styles.bottom}>
            <button className={styles.cancellation} type='button'>
              Отмена
            </button>

            <button className={styles.submit} type='submit'>
              Добавить расписание
            </button>
          </div>

        </form>
      </div>

      <Overlay handleClick={closePopup} />
    </>
  );
}
