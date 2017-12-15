export interface LocationBasicOptions {
    date: string;
    startTime: string; //yyy-MM-dd hh:mm:ss
    endTime: string;  //yyy-MM-dd hh:mm:ss
    userIds: number[];
}

export interface LocationOptions extends LocationBasicOptions{
    isTimeSlot: boolean;
    devIds: number[];
    time: string;
    teamIds: number[];
    workTypeIds: number[];
}

export interface TrajectoryOptions extends LocationBasicOptions{
}

export interface PlayOptions {
    userIds: number[];
}