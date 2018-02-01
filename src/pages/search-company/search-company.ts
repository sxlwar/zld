import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/withLatestFrom';

import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { Company } from '../../interfaces/response-interface';
import { SearchService } from '../../services/business/search-service';
import { SearchCompanyOptions } from './../../interfaces/request-interface';

@IonicPage()
@Component({
    selector: 'page-search-company',
    templateUrl: 'search-company.html',
})
export class SearchCompanyPage {

    selectType = 'radio';

    companies$: Observable<Company[]>;

    loading$: Observable<boolean>;

    searchQuery$: Observable<string>;

    searchTarget: Subject<SearchCompanyOptions> = new Subject();

    subscriptions: Subscription[] = [];

    constructor(
        private viewCtrl: ViewController,
        private search: SearchService
    ) {
    }

    ionViewDidLoad() {
        this.initialModel();

        this.launch();
    }

    initialModel(): void {
        this.searchQuery$ = this.search.getSearchTargetOfCompany();

        this.companies$ = this.search.getSearchResultOfCompany();

        this.loading$ = this.search.getLoadingState();
    }

    launch(): void {
        this.subscriptions = [
            this.search.searchCompany(this.searchTarget),

            this.search.handleCompanyError(),
        ];
    }

    dismiss() {
        this.viewCtrl.dismiss().then(() => { });
    }

    getSearch(name: string): void {
        !!name && this.searchTarget.next({ name });
    }

    selectCompany(id: string): void {
        this.search.setSelectedCompany(Number(id));
    }

    ionViewWillUnload() {
        this.subscriptions.forEach(item => item.unsubscribe());
    }
}
