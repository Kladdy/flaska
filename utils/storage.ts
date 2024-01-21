import { UserProfile } from "@auth0/nextjs-auth0/client";

export enum StorageKeys {
  SEARCH,
  FILTER_CATEGORY,
  FILTER_LOCATION,
  FILTER_PRICE,
  FILTER_ORIGIN,
  SORT_BY,
  SORT_DIRECTION,
}

export const setLocalStorage = (key: StorageKeys, value: string, user: UserProfile) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(`${user.sub}-${key}`, value);
  } else {
    console.log('setLocalStorage: window is undefined. key:', key)
  }
}

export const getLocalStorage = (key: StorageKeys, user: UserProfile) => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(`${user.sub}-${key}`);
  } else {
    console.log('getLocalStorage: window is undefined. key:', key)
  }
}