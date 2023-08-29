import React from 'react';

export const ToastContext = React.createContext();
function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  React.useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === 'Escape') {
        setToasts([]);
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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
