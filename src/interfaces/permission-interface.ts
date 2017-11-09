export interface Permission {
  view: string[];
  opt: string[];
}

export interface PermissionResult {
  view: boolean;
  opt: boolean;
}

export interface ComprehensivePermissionResult {
  permission: PermissionResult;
  option: {[key: string]: any}
}
