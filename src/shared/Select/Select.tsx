import { useEffect, useRef, useState } from 'react';
import styles from './select.module.scss';

interface ISelect {
  current?: string;
  list: string[];
  name: string;
  width?: number;
}

export function Select({ list, current = list[0], name, width }: ISelect) {
  const [openMenu, setOpenMenu] = useState(false);
  const [inputValue, setInputValue] = useState(current);
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
    setInputValue(item)
    setHeight(0);
    setTimeout(() => {
      setOpenMenu(false)
    }, 301)
  }

  return (
    <div
      className={styles.select}
      style={{ width: width }}
      ref={selectRef}
    >
      <input
        className={`visually-hidden ${styles.selectInput}`}
        type="text"
        name={name}
        aria-label=''
        required
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
        {inputValue}
      </button>

      <div
        className={styles.hideWrapper}
        style={{ height: height }}
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
