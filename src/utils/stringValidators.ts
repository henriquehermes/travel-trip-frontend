/* eslint-disable no-useless-escape */

export const hasNumeric = (str: string): boolean => {
    return /[0-9]/.test(str);
};

export const hasUppercase = (str: string): boolean => {
    return /[A-Z]/.test(str);
};

export const hasSymbol = (str: string): boolean => {
    return /[!@#$%^&*]/.test(str);
};

export const hasMinimumLength = (str: string): boolean => {
    return str.length >= 8;
};

export const cleanStringSpaces = (str: string): string => {
    return str.replace(/\s+/g, "");
};

export const isValidEmail = (email: string): boolean => {
    const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
};

export const isValidPassword = (password: string): boolean =>
    hasNumeric(password) &&
    hasUppercase(password) &&
    hasMinimumLength(password) &&
    hasSymbol(password);
