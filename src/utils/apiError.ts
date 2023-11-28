/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type IErrorApi } from "@/services/api";
import { TOAST_TYPE, showToast } from "./toast";

export const handleApiError = (response: IErrorApi, message = "") => {
    if (response?.status !== 401) {
        showToast(response?.data.error || message, TOAST_TYPE.ERROR);
    }
};
