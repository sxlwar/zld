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

export interface ConditionOption {
    selected: boolean;
    text: string;
    condition: number;
}