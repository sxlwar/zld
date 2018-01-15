import { SearchCompanyOptions } from './../../interfaces/request-interface';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Company } from '../../interfaces/response-interface';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/map';
import { SearchService } from '../../services/business/search-service';


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
        public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController,
        public search: SearchService
    ) {
    }

    ionViewDidLoad() {
        this.initialModel();

        this.launch();
    }

    initialModel() {
        this.searchQuery$ = this.search.getSearchTargetOfCompany();

        this.companies$ = this.search.getSearchResultOfCompany();

        this.loading$ = this.search.getLoadingState();
    }

    launch(): void {
        this.subscriptions = [
            this.search.searchCompany(this.searchTarget),
            this.search.handleCompanyError()
        ];
    }

    dismiss() {
        this.viewCtrl.dismiss().then(() => { });
    }

    getSearch(name: string) {
        !!name && this.searchTarget.next({ name });
    }

    selectCompany(id) {
        this.search.setSelectedCompany(Number(id));
    }

    ionViewWillUnload() {
        this.subscriptions.forEach(item => item.unsubscribe());
    }
}
