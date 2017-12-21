import { omit, has, reduce, values } from 'lodash';
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
  if (options) return { ...option1, ...option2, ...options.reduce((acc, cur) => ({ ...acc, ...cur })) }

  return { ...option1, ...option2 };
}

/**
 * 
 * @param obj key-value, general object;
 * @param nameMapObj Object that the key is may be in the origin object witch is passed in as the first arguments,
 * and the value is the new key name need to map;
 */
export function rename(originObj: object, nameMapObj: { [key: string]: string }, reverse = false): object {
  const initial = reverse ? omit(originObj, values(nameMapObj)) : omit(originObj, Object.keys(nameMapObj));

  return reduce(nameMapObj, (result: Object, value: string, key: string) => {
    if (!reverse && has(result, key)) result[value] = originObj[key];
    if (reverse && has(result, value)) result[key] = originObj[value];
    return result;
  }, initial); 

};