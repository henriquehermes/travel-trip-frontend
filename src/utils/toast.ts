import { toast, type TypeOptions } from "react-toastify";

export const showToast = (message: string, type: TypeOptions): void => {
    toast(message, {
        type,
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
};

export const TOAST_TYPE = {
    SUCCESS: "success" as TypeOptions,
    WARN: "warn" as TypeOptions,
    ERROR: "error" as TypeOptions,
    INFO: "info" as TypeOptions,
};
