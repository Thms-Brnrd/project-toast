import React from 'react';

import Button from '../Button';

import styles from './ToastPlayground.module.css';
import Toast from "../Toast";
import ToastShelf from "../ToastShelf";

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {
  const [message, setMessage] = React.useState('');
  const [variant, setVariant] = React.useState(VARIANT_OPTIONS[0]);
  const [toasts, setToasts] = React.useState([]);

  const popToast = () => {
    setToasts(toasts => [...toasts, { message, variant, id: Math.random() }])
    setMessage('');
    setVariant(VARIANT_OPTIONS[0]);
  }

  const dismissToast = (toastId) => {
    setToasts(toasts.filter(toast => toast.id !== toastId));
  }

  const onSubmit = (event) => {
    event.preventDefault();
    popToast();
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf toasts={toasts} onDismiss={toastId => dismissToast(toastId)} />

      <form className={styles.controlsWrapper} onSubmit={onSubmit}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: 'baseline' }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea id="message" className={styles.messageInput} value={message} onChange={(event) => setMessage(event.target.value)} />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            {/* TODO Other Variant radio buttons here */}
            {VARIANT_OPTIONS.map(option => (
                <label htmlFor={`variant-${option}`}>
                  <input
                      id={`variant-${option}`}
                      type="radio"
                      name="variant"
                      value={option}
                      checked={option === variant}
                      onChange={event => {
                        setVariant(event.target.value);
                      }}
                  />
                  {option}
                </label>
            ))}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            <Button>Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
