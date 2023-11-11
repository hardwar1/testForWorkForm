import { useState } from 'react';
import { Overlay } from '../Overlay';
import styles from './popupform.module.scss';
import { WeekDays } from './WeekDays';
import { Select } from '../Select';

const hoursListSelect = ['Академические', 'Астрономические']


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

            <button className={styles.closeButton} aria-label="закрыть"></button>
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
              <Select list={hoursListSelect} name='hoursType'/>
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
          </div>

          <div className={styles.bottom}>

          </div>

        </form>
      </div>

      <Overlay handleClick={closePopup} />
    </>
  );
}
