import { Permission } from './permission-interface';

export interface IconItem {
  text: string;
  icon: string;
  color: string;
  permission: Permission;
  page: string;
  badge?: number;
}

export interface Badge {
    path:  string [];
    count: number; 
}