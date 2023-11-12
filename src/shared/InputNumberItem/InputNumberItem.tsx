import styles from './inputnumberitem.module.scss';

interface IInputNumberItem {
  text: string;
  name: string;
}

export function InputNumberItem({text, name}: IInputNumberItem) {

  return (
    <div className={styles.inputNumberItem}>
      <button
        className={styles.inputNumberButton}
        type="button" aria-label="прибавить">
      </button>

      <label className={styles.inputNumberLabel}>
        <input className={styles.inputNumberInput}
          type="number"
          name={name}
          aria-label="количество часов"
          placeholder=""
          inputMode="numeric"
          defaultValue={1}
          required
        />

        <span className={styles.inputNumberText}>
          {text}
        </span>
      </label>

      <button
        className={`${styles.inputNumberButton} ${styles.inputNumberButtonPlus}`}
        type="button"
        aria-label="уменьшить">
      </button>
    </div>
  );
}
