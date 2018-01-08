import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { SearchItem } from './../../interfaces/search-interface';
import { QueryWorkerBy } from './../../reducers/reducer/search-worker-reducer';
import { SearchService } from './../../services/business/search-service';
import { Subscription } from 'rxjs/Subscription';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { intersectionBy } from 'lodash';

interface QueryCondition {
    value: string;
    text: string;
}

const searchConditions: QueryCondition[] = [
    { text: 'NAME', value: QueryWorkerBy.name },
    { text: 'MOBILE_PHONE', value: QueryWorkerBy.userName }
]

@IonicPage()
@Component({
    selector: 'page-search-worker',
    templateUrl: 'search-worker.html',
})
export class SearchWorkerPage {

    selectType = 'checkbox';

    searchType = 'text';

    subscriptions: Subscription[] = [];

    selectedCondition: string;

    searchConditions = searchConditions;

    workers: Observable<SearchItem[]>;

    select: Subject<SearchItem> = new Subject();

    search: Subject<string> = new Subject();

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public searchService: SearchService,
        public modalCtrl: ModalController,
        public viewCtrl: ViewController,
        public translate: TranslateService
    ) {
    }

    ionViewDidLoad() {
        this.initialModel();

        this.launch();
    }

    launch(): void {
        this.subscriptions = [
            this.searchService.getSearchCondition().subscribe(condition => this.selectedCondition === condition),
            this.searchService.searchWorker(this.search.filter(value => !!value).debounceTime(500)),
            this.searchService.toggleSelectedWorker(this.select),
            this.searchService.getSearchCondition().take(1).subscribe(value => this.selectedCondition = value)
        ]
    }

    initialModel(): void {
        this.workers = this.searchService.getSelectedWorkers()
            .map(workers => workers.map(item => ({ id: item.user_id, name: item.realname, distinct: item.user__username, selected: true })))
            .combineLatest(
            this.searchService.getSearchResultOfWorker().map(workers => workers.map(item => ({ id: item.user_id, name: item.realname, distinct: item.user__username, selected: false }))),
            (selectedWorkers, workers) => {
                const ids: number[] = intersectionBy(selectedWorkers, workers, (item: SearchItem) => item.id).map((item: SearchItem) => item.id);

                workers.forEach(item => item.selected = ids.indexOf(item.id) !== -1);

                return selectedWorkers.filter(item => ids.indexOf(item.id) === -1).concat(workers);
            });
    }

    setQueryCondition(condition: string): void {
        this.searchType = condition === QueryWorkerBy.name ? 'text' : 'number';

        this.searchService.setSearchWorkerCondition(condition);
    }

    dismiss(): void {
        this.viewCtrl.dismiss();
    }

    ionViewWillUnload() {
        this.subscriptions.forEach(item => item.unsubscribe());
    }
}
