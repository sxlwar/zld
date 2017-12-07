export enum OrderFlag {
    noneOrder,
    highToLow,
    lowToHigh 
}

export enum BindingStateFlag {
    noneState,
    binding,
    unbind
}

export enum DeviceStateFlag {
    noneState,
    online,
    offline
}

export interface ConditionOption {
    selected: boolean;
    text: string;
    condition: number;
}