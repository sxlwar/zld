export interface Permission {
  view: string[];
  opt: string[];
}

export interface PermissionResult {
  view: boolean;
  opt: boolean;
}
