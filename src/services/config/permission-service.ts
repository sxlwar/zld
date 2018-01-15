import { ApiUnit } from '../../interfaces/api-interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { selectIcon, AppState, selectGroupList } from '../../reducers/index-reducer';
import { Store } from '@ngrx/store';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/first';
import { ComprehensivePermissionResult, Permission, PermissionResult } from '../../interfaces/permission-interface';
import { Command } from '../api/command';


@Injectable()
export class PermissionService {

    // project_teamList_view = [PME, EME, MM, PM, LM, TL, CW, QW];
    // project_timeContract_view = [PME, EME, MM, PM, LM, TL];
    // project_pieceContract_view = [PME, EME, MM, PM, LM, TL, QW];
    // project_area_view = [PME, EME, MM, PM, LM, TL];

    constructor(
        public store: Store<AppState>,
        public command: Command
    ) {
    }

    functionalPermissionValidate(target: Observable<Permission>): Observable<PermissionResult> {
        return target
            .withLatestFrom(this.character)
            .map(item => this.generatePermission(item))

    }

    apiPermissionValidate(arg: ApiUnit): Observable<PermissionResult> {
        return this.character.map(char => {

            if (!arg.permission) return { view: true, opt: true };

            const view = arg.permission.view.indexOf(char) !== -1;

            const opt = arg.permission.opt.indexOf(char) !== -1;

            return { view, opt };
        });
    }

    getOperatePermission(iconName: string, rootName: string): Observable<boolean> {
        return this.store.select(selectIcon([rootName, iconName])).map(icon => icon.permission.opt);
    }

    specialOptionValidate(arg: ApiUnit): Observable<object> {
        return this.character.map(char => {
            if (!arg.specialCharacter) return {};

            const option = arg.specialCharacter.get(char);

            if (option) {
                return option.value;
            } else {
                return {};
            }
        });
    }

    comprehensiveValidate(arg: ApiUnit): Observable<ComprehensivePermissionResult> {
        return this.apiPermissionValidate(arg)
            .zip(this.specialOptionValidate(arg), (permission, option) => ({ permission, option }));
    }

    private get character() {
        return this.store
            .select(selectGroupList)
            .mergeMap(res => Observable.from(res).first())
    }

    private generatePermission([permission, character]): PermissionResult {
        const { view, opt } = permission;

        return {
            view: view.indexOf(character) !== -1,
            opt: opt.indexOf(character) !== -1
        }
    }

}
