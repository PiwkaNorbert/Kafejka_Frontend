import { TIME_ONLINE } from "../constants";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() returns 0-11
  const year = date.getFullYear();
  
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  
  return `${day}-${month}-${year} | ${hours}:${minutes}:${seconds}`;
}


export function timeDifference(dataString: string): boolean {
  const currentDate = new Date();
  const inputDate = new Date(dataString);
  
  const differenceInMs = currentDate.getTime() - inputDate.getTime();
  
  const differenceInSeconds = differenceInMs / 1000;
  
  return differenceInSeconds <= TIME_ONLINE;
}