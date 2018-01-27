import { ResetSidAction, UpdateAccountAction } from './../../actions/action/login-action';
import { Injectable } from '@angular/core';
import { AppState, selectLoginForm, selectUserInfo } from '../../reducers/index-reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { LoginResponse } from '../../interfaces/response-interface';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class UserService {
    constructor(
        private store: Store<AppState>
    ) { }

    getUserInfo(): Observable<LoginResponse> {
        return this.store.select(selectUserInfo);
    }

    getAccount(): Observable<string> {
        return this.store.select(selectLoginForm).map(data => data.username);
    }

    getUserCharacter(): Observable<string> {
        return this.getUserInfo().mergeMap(data => Observable.from(data.groups_list).first());
    }

    getUserId(): Observable<number> {
        return this.getUserInfo().map(data => data.user_id);
    }

    getRealName(): Observable<string> {
        return this.getUserInfo().map(data => data.realname);
    }

    getFaceImage(): Observable<string> {
        return this.getUserInfo().map(data => data.face_image);
    }

    getSid(): Observable<string> {
        return this.getUserInfo().map(data => data.sid);
    }

    getAuthPass(): Observable<boolean> {
        return this.getUserInfo().map(data => data.auth_pass);
    }

    resetSid(): void {
        this.store.dispatch(new ResetSidAction());
    }

    updateAccount(account: string): void {
        this.store.dispatch(new UpdateAccountAction(account));
    }
}
