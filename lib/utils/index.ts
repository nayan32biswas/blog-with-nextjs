import { type ClassValue, clsx } from 'clsx';
import { get } from 'lodash';
import { twMerge } from 'tailwind-merge';

import { publicEnv } from '../config';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isServer = () => {
  return typeof window === 'undefined';
};

export function queryBuilder(queryParams: any) {
  if (!queryParams) {
    return '';
  }
  const params = new URLSearchParams(queryParams);
  return params.toString();
}

export const buildUrl = (urlTemplate: string, params: any = null, queryParams: any = null) => {
  let url = urlTemplate.replace(/:([a-zA-Z]+)/g, (_, key) => {
    return params[key] || `:${key}`;
  });

  if (queryParams) {
    const queryParamsStr = queryBuilder(queryParams);
    url = `${url}?${queryParamsStr}`;
  }

  return url;
};

export function generateId() {
  const uuid = crypto.randomUUID().replace(/-/g, '');
  return uuid;
}

export const getNameInitials = (name?: string | null) => {
  const fullName = name ? name.trim() : '';
  if (!fullName) return '';

  const nameInitials = fullName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return nameInitials;
};

export function removeDuplicatesByKey<T, K extends keyof T>(array: T[], key: K): T[] {
  const seen = new Set<T[K]>();

  return array.filter((item) => {
    const value = get(item, [key]);
    if (seen.has(value)) {
      return false;
    }
    seen.add(value);
    return true;
  });
}

export function parseDomainFromUrl(url: string | null): string | null {
  if (!url) {
    return null;
  }

  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch (error) {
    console.error('Invalid URL:', error);
    return null;
  }
}

export function getMediaFullPath(mediaPath: string | null): string {
  if (!mediaPath) {
    return '';
  }

  if (mediaPath.startsWith('http')) {
    return mediaPath;
  }

  return `${publicEnv.MEDIA_URL}${mediaPath}`;
}

export function getUrlSearchParams(): string {
  const urlSearchParams = window?.location?.search;
  return urlSearchParams || '';
}
