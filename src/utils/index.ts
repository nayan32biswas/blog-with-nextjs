import { ObjectType } from '@/types/common.types';

const dateTimeFormatOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};

export const isServer = () => typeof window === 'undefined';

export const isValidArray = (arr: any): boolean => Array.isArray(arr);

export const isValidObj = (obj: any): boolean => {
  if (!obj) return false;
  if (typeof obj !== 'object') return false;
  if (Array.isArray(obj)) return false;
  return true;
};

export const usernameRegex = /^[a-zA-Z][\w.-]+$/;

export function getListApiDefaultValue() {
  return {
    count: 0,
    results: [],
    errorMessage: null
  };
}

export function objectToQueryParams(obj: ObjectType): string {
  const queryParams = new URLSearchParams();

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];

      if (Array.isArray(value)) {
        value.forEach((item) => queryParams.append(key, item.toString()));
      } else {
        queryParams.append(key, value.toString());
      }
    }
  }

  return queryParams.toString();
}

export function toLocaleDateString(dateString: string | null, locales: string = 'en-US'): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString(locales, dateTimeFormatOptions);
}
