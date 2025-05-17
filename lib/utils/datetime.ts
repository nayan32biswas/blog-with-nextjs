import { nullableString } from "../features/common/types";

function getISOFormat(date = new Date()): string {
  const pad = (n: number) => `${n}`.padStart(2, "0");

  const [Y, M, D, h, m, s] = [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate()),
    pad(date.getHours()),
    pad(date.getMinutes()),
    pad(date.getSeconds()),
  ];

  return `${Y}-${M}-${D}T${h}:${m}:${s}`;
}

export function getUserLocalDatetime(): string {
  const now = new Date();
  return getISOFormat(now);
}

export function localToUtc(localString: nullableString): nullableString {
  if (!localString) {
    return null;
  }

  const localDate = new Date(localString);
  const utcDate = new Date(localDate.getTime() + localDate.getTimezoneOffset() * 60000);
  return getISOFormat(utcDate);
}

export function utcToLocal(utcString: nullableString): nullableString {
  if (!utcString) {
    return null;
  }

  const utcDate = new Date(utcString + "Z"); // Ensure it's parsed as UTC
  const localDate = new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60000);
  return getISOFormat(localDate);
}

export function removeSeconds(datetimeString: nullableString): nullableString {
  if (!datetimeString) {
    return null;
  }

  return datetimeString.slice(0, 16);
}

export function humanizeDate(dateStr: nullableString): nullableString {
  if (!dateStr) {
    return null;
  }

  const date = new Date(dateStr);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return formattedDate;
}

export function humanizeDateTime(dateStr: nullableString): nullableString {
  if (!dateStr) {
    return null;
  }

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
}
