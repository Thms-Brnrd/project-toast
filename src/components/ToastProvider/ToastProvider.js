import React from 'react';
import useEscapeKey from "../../hooks/useEscapeKey";

export const ToastContext = React.createContext();
function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  useEscapeKey(() => {
    setToasts([]);
  });

  const value = React.useMemo(() => ({
    toasts,
    popToast: ({ message, variant }) => setToasts(toasts => [...toasts, { message, variant, id: Math.random() }]),
    dismissToast: toastId => setToasts(toasts.filter(toast => toast.id !== toastId)),
  }), [toasts]);

  return (
      <ToastContext.Provider value={value}>
        {children}
      </ToastContext.Provider>
  );
}

export default ToastProvider;
