import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AppState, selectGroupList} from '../../reducers/index-reducer';
import {Store} from '@ngrx/store';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/first';

export interface Permission {
  view: string[];
  opt: string[];
}

export interface PermissionResult {
  view: boolean;
  opt: boolean;
}

const platformMaintenance = "平台运维";
const enterpriseMaintenance = "企业运维";
const managementManager = "管理层";
const projectManager = "项目经理";
const labourManager = "劳务经理";
const teamLeader = "班组长";
const constructionWorker = "施工员";
const qualityWorker = "质量员";
const signedWorker = "签约工人";
const unsignedWorker = "未签约工人";
const pendingAccount = "待审核职员帐号";
const rejectedAccount = "拒绝职员帐号";

export {platformMaintenance as PME}
export {enterpriseMaintenance as EME}
export {managementManager as MM}
export {projectManager as PM}
export {labourManager as LM}
export {teamLeader as TL}
export {constructionWorker as CW}
export {qualityWorker as QW}
export {signedWorker as SW}
export {unsignedWorker as UW}
export {pendingAccount as PA}
export {rejectedAccount as RA}


export const CHARACTER = {
  1: platformMaintenance,
  2: enterpriseMaintenance,
  3: managementManager,
  4: projectManager,
  5: labourManager,
  6: teamLeader,
  7: constructionWorker,
  8: qualityWorker,
  9: signedWorker,
  10: unsignedWorker,
  11: pendingAccount,
  12: rejectedAccount
};

@Injectable()
export class PermissionService {

  // project_projectList_view = [PME, EME, MM, PM, LM, TL, CW, QW, SW];
  // project_teamList_view = [PME, EME, MM, PM, LM, TL, CW, QW];
  // project_timeContract_view = [PME, EME, MM, PM, LM, TL];
  // project_pieceContract_view = [PME, EME, MM, PM, LM, TL, QW];
  // project_area_view = [PME, EME, MM, PM, LM, TL];

  constructor(public store: Store<AppState>) {
  }

  permissionValidate(target: Observable<Permission>): Observable<PermissionResult>{
    return this.store
      .select(selectGroupList)
      .mergeMap(res => Observable.from(res).first())
      .combineLatest(target)
      .map(item => this.generatePermission(item));
  }

  private generatePermission([character, permission]): PermissionResult {
    const {view, opt} = permission;

    return {
      view: view.indexOf(character) !== -1,
      opt: opt.indexOf(character) !== -1
    }
  }

}
