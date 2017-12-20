import { RequestOption } from './../../interfaces/request-interface';
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


export function projectRequestOptions(option1: RequestOption, option2: RequestOption, ...options: RequestOption[]): RequestOption {
  if(options) return { ...option1, ...option2, ...options.reduce((acc, cur) => ({...acc, ...cur}))}
  
  return { ...option1, ...option2 };
}