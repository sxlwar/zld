import { has, omit, random, reduce, values } from 'lodash';
import { Observable } from 'rxjs/Observable';

import { RequestOption } from './../../interfaces/request-interface';

export interface ReduceFn<T> {
    (acc: T[], cur: T): T[]
}

export function curry2Right(fn) {
    return value1 => value2 => fn.call(fn, value1, value2);
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
 * @function rename
 * @param obj key-value, general object;
 * @param nameMapObj Object that the key is may be in the origin object witch is passed in as the first arguments,
 * and the value is the new key name need to map;
 * @param reverse Indicate direction.
 * @description By default, when the key on the origin object is the same as the key on the target object, the key name on
 * the source object will be converted to the key corresponding value on the target object. If the reverse parameter is true, it will use the value 
 * as key on target object and rename the key on the origin target to the corresponding key on target object.
 * @returns object Object that values shouldn't be modified, and the conditional key had been renamed.
 */
export function rename(originObj: object, nameMapObj: { [key: string]: string }, reverse = false): object {
    const initial = reverse ? omit(originObj, values(nameMapObj)) : omit(originObj, Object.keys(nameMapObj));

    return reduce(nameMapObj, (result: Object, value: string, key: string) => {
        if (!reverse && has(originObj, key)) result[value] = originObj[key];
        if (reverse && has(originObj, value)) result[key] = originObj[value];
        return result;
    }, initial);
};


export function createRandomCode(): Observable<string> {
    return Observable.range(1, 5)
        .map(_ => random(1, 26).toString(36))
        .reduce((acc, cur) => acc + cur)
}
