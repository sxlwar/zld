import { Permission } from './permission-interface';

export interface IconItem {
  text: string;
  icon: string;
  color: string;
  permission: Permission;
  page: string;
  badge?: number;
}

export interface RootModuleBadge {
    rootName: string;
    count: number;
    iconName: string;
}