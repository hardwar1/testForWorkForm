import styles from './overlay.module.scss';

export function Overlay({handleClick}: {handleClick: () => void}) {

  return (
    <div className={styles.overlay}
    onClick={handleClick}
    ></div>
  );
}
