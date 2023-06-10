export const isServer = () => typeof window === 'undefined';

export const isValidArray = (arr: any): boolean => Array.isArray(arr);

export const isValidObj = (obj: any): boolean => {
  if (!obj) return false;
  if (typeof obj !== 'object') return false;
  if (Array.isArray(obj)) return false;
  return true;
};

export const usernameRegex = /^[a-zA-Z][\w.-]+$/;

export const getListApiDefaultValue = () => {
  return {
    count: 0,
    results: [],
    errorMessage: null
  };
};
