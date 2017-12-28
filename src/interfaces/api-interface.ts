import { Permission } from './permission-interface';

/**
 * @description These operations define the action that an interface can perform.
 * */
export enum Operate {
    querying = 'query',
    addition = 'add',
    updates = 'update',
    deletion = 'delete',
    search = 'search'
}

export interface checkFn {
    (arg: number[]): boolean
}

export interface MagicNumberMap {
    [key: string]: number | checkFn;
}

export class Iterator {
    value: MagicNumberMap;

    constructor(value: MagicNumberMap) {
        this.value = value;
    }

    next() {
        return { value: this.value, done: true }
    }
}

export interface ApiUnit {
    operates: Map<string, string[]>;
    permission?: Permission;
    noMagicNumber?: Map<string, Iterator>;
    specialCharacter?: Map<string, Iterator>;
}