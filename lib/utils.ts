import { type ClassValue, clsx } from "clsx";
import { get } from "lodash";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isServer = () => {
  return typeof window === "undefined";
};

export function queryBuilder(queryParams: any) {
  if (!queryParams) {
    return "";
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

export const getCookieValue = (name: string) => {
  if (isServer()) return null;

  const cookies = document.cookie.split("; ");
  const cookie = cookies.find((c) => c.startsWith(`${name}=`));

  return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
};

export const humanizeDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return formattedDate;
};

export const humanizeDateTime = (dateStr: string) => {
  const date = new Date(dateStr);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${formattedDate} ${formattedTime}`;
};

export const getNameInitials = (name?: string | null) => {
  const fullName = name ? name.trim() : "";
  if (!fullName) return "";

  const nameInitials = fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
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

export function localTimeToUTC(localTimeString: string | null): string | null {
  if (!localTimeString) {
    return null;
  }

  const localDate = new Date(localTimeString);
  const utcTimeString = localDate.toISOString().slice(0, 16).replace("T", " "); // Format to "YYYY-MM-DD HH:MM"

  return utcTimeString;
}
