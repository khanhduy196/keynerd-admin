import { toast, ToastOptions } from "react-toastify";

const AUTO_CLOSE_TOAST_MILISECONDS = 1000 * 3;
const SETTINGS_DEFAULT_TOAST: ToastOptions<object> | undefined = {
  position: "top-right",
  autoClose: AUTO_CLOSE_TOAST_MILISECONDS,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  progress: undefined,
  theme: "light",
};
export const toastError = (message: string) => {
  toast.error(message, SETTINGS_DEFAULT_TOAST);
};
export const toastSuccess = (message: string) => {
  toast.success(message, SETTINGS_DEFAULT_TOAST);
};
