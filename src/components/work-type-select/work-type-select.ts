import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { ReplaySubject, Subscription } from 'rxjs';
import { Subject } from 'rxjs/Subject';

import { BusinessComponentModel } from '../../interfaces/core-interface';
import { CraftService } from './../../services/business/craft-service';

interface WorkTypeItem {
    id: number;
    name: string;
    checked: boolean;
}

@Component({
    selector: 'work-type-select',
    templateUrl: 'work-type-select.html',
})
export class WorkTypeSelectComponent implements BusinessComponentModel {

    types: Subject<WorkTypeItem[]> = new ReplaySubject();

    subscriptions: Subscription[] = [];

    execute$: Subject<boolean> = new Subject();

    constructor(
        private viewCtrl: ViewController,
        private craft: CraftService,
        private navParams: NavParams
    ) {
    }

    ngOnInit() {
        const selectedTypes: number[] = this.navParams.get('types');

        this.launch(selectedTypes);
    }

    launch(selectedTypes: number[]): void {
        this.subscriptions = [
            this.craft.getWorkTypeList()
                .map(types => types.map(item => ({ id: item.id, name: item.name, checked: selectedTypes.indexOf(item.id) !== -1 })))
                .subscribe(this.types),

            this.execute$.withLatestFrom(this.types, (_, types) => types)
                .subscribe(types => {
                    this.craft.updateSelectedTypes(types.filter(item => item.checked).map(item => item.id));

                    this.dismiss();
                }),
        ];
    }

    initialModel(): void { 

    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(item => item.unsubscribe());
    }
}
