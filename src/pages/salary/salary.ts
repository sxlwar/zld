import { Subscription } from 'rxjs/Subscription';
import { putInArray } from '../../services/utils/util';
import { TimeService } from './../../services/utils/time-service';
import { Observable } from 'rxjs/Observable';
import { PayProcessService } from './../../services/business/pay-process-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { salaryDetailPage } from '../../pages/pages';

export interface PayProcessListItem {
    yearMonth: string;
    amount: number;
    project: string;
}
@IonicPage()
@Component({
    selector: 'page-salary',
    templateUrl: 'salary.html',
})
export class SalaryPage {
    list: Observable<PayProcessListItem[]>;

    subscriptions: Subscription[] = [];

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private time: TimeService,
        private payProcess: PayProcessService
    ) {

    }

    ionViewCanEnter() {
        const { view, opt } = this.navParams.get('permission');

        return opt || view;
    }

    ionViewDidLoad() {
        this.initialModel();

        this.launch();
    }

    initialModel(): void {
        this.list = this.getPayProcessList();
    }

    launch(): void {
        this.subscriptions = [
            this.payProcess.getPayProcessList(),
            this.payProcess.handleError(),
        ];
    }

    getPayProcessList(): Observable<PayProcessListItem[]> {
        return this.payProcess.getPayProcesses().mergeMap(processes => Observable.from(processes)
            .map(process => {
                const { amount, project_pay__project_bill__project__name, project_pay__project_bill__month } = process;

                const yearMonth = this.time.getDateInfo(new Date(project_pay__project_bill__month)).dateWithoutDay;

                const project = project_pay__project_bill__project__name;

                return { amount, yearMonth, project }
            })
            .reduce(putInArray, [])
        )
    }

    goToNextPage(item: PayProcessListItem) {
        this.navCtrl.push(salaryDetailPage, { month: item.yearMonth }).then(() => { });
    }

    ionViewWillUnload() {
        this.subscriptions.forEach(item => item.unsubscribe());
    }
}
