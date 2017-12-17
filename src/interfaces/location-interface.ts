import { LngLat, SimpleMarker, Polyline } from './amap-interface';
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

export interface Trajectory {
    polyline: Polyline;
    startMarker: SimpleMarker;
    endMarker: SimpleMarker;
    moveMarker: SimpleMarker;
}

export interface PlayOptions {
    userIds: number[];
    indexes: number[];
    trajectories: Trajectory[];
    playState: number;
    rateState: number; 
}

export interface PlayUnit {
  path: LngLat[];
  moveMarker: SimpleMarker;
  rate: number;
  passedPolyline: Polyline;
}

export enum PlayState {
  stop,
  play,
  pause,
  resume
}

export interface TrajectoryInfo {
  time: string; //year month day + start time + end time;
  name: string; // names split with comma;
}

