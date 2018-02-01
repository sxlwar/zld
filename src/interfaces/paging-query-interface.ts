import { InfiniteScroll } from 'ionic-angular';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';

export interface GetNextPage {
    getNextPage(notification: Observable<InfiniteScroll>, option?: any): Subscription[];

    haveMoreData(option?: any): Observable<boolean>;
}
