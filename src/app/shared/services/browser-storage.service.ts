import {Injectable} from '@angular/core';
import {Observable, Subscriber} from 'rxjs';
import {StorageKeys} from '../enums/storage-keys';
import * as localforage from 'localforage'

@Injectable()
export class BrowserStorageService {

  constructor(
  ) { }

  /**
   * Try not to use this method.
   * @param key
   */
  public static getItem<T = string>(key: StorageKeys): T | null {
    return localStorage.getItem(key) as unknown as T;
  }

  public static setItem(key: StorageKeys, value: string): void {
    localStorage.setItem(key, value);
  }

  public getItem<T = string>(key: StorageKeys): T | null {
    return localStorage.getItem(key) as unknown as T;
  }

  public setItem(key: StorageKeys, value: string): void {
    localStorage.setItem(key, value);
  }

  public setItemDB<T>(key: StorageKeys, value: T): Observable<T> {
    return new Observable((subscriber: Subscriber<T>) => {
      subscriber.next('init' as unknown as T)
      localforage.setItem(key, value)
        .then((promiseResult: T) => {
          subscriber.next(promiseResult);
        })
        .catch((error) => {
          console.error('localforage error', error);
          subscriber.error(error);
        })
        .finally(() => {
          subscriber.complete();
        })
    })
  }

  public getItemDB<T>(key: StorageKeys): Observable<T | null> {
    return new Observable((subscriber: Subscriber<T | null>) => {
      localforage.getItem<T>(key)
        .then((promiseResult: T | null) => {
          subscriber.next(promiseResult);
        })
        .catch((error) => {
          subscriber.error(error);
        })
        .finally(() => {
          subscriber.complete();
        })
    })
  }
}
