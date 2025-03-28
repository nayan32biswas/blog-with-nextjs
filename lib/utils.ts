import { type ClassValue, clsx } from "clsx";
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
