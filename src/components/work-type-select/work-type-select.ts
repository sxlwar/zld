import { Subject } from 'rxjs/Subject';
import { CraftService } from './../../services/business/craft-service';
import { NavParams, ViewController } from 'ionic-angular';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReplaySubject, Subscription } from 'rxjs';

interface WorkTypeItem {
    id: number;
    name: string;
    checked: boolean;
}

@Component({
    selector: 'work-type-select',
    templateUrl: 'work-type-select.html'
})
export class WorkTypeSelectComponent implements OnInit, OnDestroy {

    types: Subject<WorkTypeItem[]> = new ReplaySubject();

    subscriptions: Subscription[] = [];

    constructor(
        private viewCtrl: ViewController,
        private craft: CraftService,
        private navParams: NavParams
    ) {
    }

    ngOnInit() {
        const selectedTypes: number[] = this.navParams.get('types');

        const subscription = this.craft.getWorkTypeList()
            .map(types => types.map(item => ({ id: item.id, name: item.name, checked: selectedTypes.indexOf(item.id) !== -1 })))
            .subscribe(this.types);

        this.subscriptions.push(subscription);
    }

    execute() {
        const subscription = this.types.subscribe(types => {
            this.craft.updateSelectedTypes(types.filter(item => item.checked).map(item => item.id));

            this.dismiss();
        });

        this.subscriptions.push(subscription);
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(item => item.unsubscribe());
    }
}
