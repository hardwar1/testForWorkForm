import { useEffect, useRef, useState } from 'react';
import styles from './select.module.scss';

interface ISelect {
  defaultValue?: string;
  list: string[];
  name: string;
  width?: number;
  text?: string;
  onSelectChange?: (item: string) => void;
  required?: boolean;
}

export function Select({
  list,
  defaultValue = list[0],
  text = list[0],
  name,
  width,
  onSelectChange,
  required = false
}: ISelect) {
  const [openMenu, setOpenMenu] = useState(false);
  const [inputValue, setInputValue] = useState(defaultValue);
  const [height, setHeight] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (openMenu) {
      setTimeout(() => {
        setHeight(listRef.current?.clientHeight || 0);
      }, 0);
    }
  }, [openMenu, listRef]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (event.target instanceof Node &&
        !selectRef.current?.contains(event.target)) {
        closeMenu();
      }
    }

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    }
  }, []);

  function closeMenu() {
    setHeight(0);
    setTimeout(() => {
      setOpenMenu(false)
    }, 301)
  }

  const menuButtonClick = (item: string) => {
    setInputValue(item);
    if (onSelectChange) onSelectChange(item);
    setHeight(0);
    setTimeout(() => {
      setOpenMenu(false)
    }, 301)
  }

  return (
    <div
      className={`${styles.select} ${height > 0 ? styles.selectActive : ''}`}
      style={{ width: width }}
      ref={selectRef}
    >
      <input
        className={`visually-hidden ${styles.selectInput}`}
        type="text"
        name={name}
        aria-label=''
        required={required}
        defaultValue={inputValue}
      />

      <button
        className={styles.selectButton}
        type="button"
        onClick={() => {
          if (!openMenu) {
            setOpenMenu(true)
          }
          else {
            closeMenu()
          }
        }}>
        {inputValue.length > 0 ? inputValue : text}
      </button>

      <div
        className={styles.hideWrapper}
        style={height > 0 ? { height: height, zIndex: 5 } : { height: 0, zIndex: 0 }}
      >
        <ul
          className={styles.selectList}
          ref={listRef}
        >
          {openMenu && list.map(item => (

            <li className={styles.selectItem} key={(() => Math.random())()}>
              <button
                type="button"
                className={styles.selectButton}
                onClick={() => menuButtonClick(item)}
              >
                {item}
              </button>
            </li>
          ))}

        </ul>
      </div>
    </div >
  );
}
