import { ObjectType } from '@/types/common.types';

import { CONTENT_URL } from './constKey';

export const usernameRegex = /^[a-zA-Z][\w.-]+$/;
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

export function getListApiDefaultValue() {
  return {
    after: null,
    results: [],
    errorMessage: null
  };
}

export function getDetailsApiDefaultValue() {
  return {
    data: null,
    errorMessage: null
  };
}

export function objectToQueryParams(obj: ObjectType): string {
  const queryParams = new URLSearchParams();

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];

      if (Array.isArray(value)) {
        value.forEach((item) => {
          if (item) {
            queryParams.append(key, encodeURIComponent(item));
          }
        });
      } else {
        if (value) {
          queryParams.append(key, encodeURIComponent(value));
        }
      }
    }
  }

  return queryParams.toString();
}

export function toLocaleDateString(
  dateString: string | unknown,
  locales: string = 'en-US'
): string {
  if (!dateString || typeof dateString !== 'string') return '';
  const date = new Date(dateString);
  return date.toLocaleDateString(locales, dateTimeFormatOptions);
}

export function getFileUrl(url: string | null): string {
  if (!url) return '';
  return CONTENT_URL + url;
}

export function margeList(baseList: any[], otherList: any[], key: string = 'id') {
  const uniqueKeys: Set<string> = new Set();
  const newList = [...baseList];
  newList.forEach((obj) => {
    uniqueKeys.add(obj[key]);
  });

  otherList.forEach((obj: any) => {
    if (uniqueKeys.has(obj[key]) === false) {
      newList.push(obj);
    }
  });
  return newList;
}
