import { Injectable } from '@angular/core';

@Injectable()
export class Base {
  constructor() { }

}

export interface ReduceFn<T> {
  (acc: T[], cur: T): T[]
}

export function putInArray<T>(acc: T[], cur: T): T[] {
  acc.push(cur);
  return acc;
}
