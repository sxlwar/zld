import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import {Company} from '../../interfaces/response-interface';
import * as fromRoot from '../../reducers/index-reducer';
import {AppState} from '../../reducers/index-reducer';
import {Store} from '@ngrx/store';
import {SearchCompanyAction} from '../../actions/search-action';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/map';


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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public store: Store<AppState>) {
    this.searchQuery$ = store.select(fromRoot.selectSearchQuery);
    this.companies$ = store.select(fromRoot.selectSearchCompanies);
    this.loading$ = store.select(fromRoot.selectSearchLoading);
  }

  ionViewDidLoad() {

  }

  dismiss() {
    this.viewCtrl.dismiss().then(() => {
    });
  }

  getSearch(query: string) {
    if (!query) return;
    this.store.dispatch(new SearchCompanyAction(query));
  }
}
