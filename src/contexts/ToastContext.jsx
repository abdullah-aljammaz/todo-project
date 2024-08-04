import { createContext } from "react";
import { useState, useContext } from "react";
import MySnackBar from "../components/MySnackBar";

const ToastContext = createContext({});
export const ToastProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const showHideToast = (message) => {
    setOpen(true);
    setMessage(message);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };
  return (
    <ToastContext.Provider value={{ showHideToast }}>
      <MySnackBar open={open} message={message} />
      {children}
    </ToastContext.Provider>
  );
};

// export const useToast = () => {
//   return useContext(ToastContext);
// };

export const useToast = () => {
  return useContext(ToastContext);
};

