import { TimeService } from './../../services/utils/time-service';
import { PayProcess } from './../../interfaces/response-interface';
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
    list: Observable<PayProcessListItem[]>

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public time: TimeService,
        public payProcess: PayProcessService
    ) {

    }

    ionViewCanEnter() {
        const { view, opt } = this.navParams.get('permission');

        return opt || view;
    }

    ionViewDidLoad() {
        const process = this.payProcess.getPayProcesses();

        this.getPayProcessList(process);
    }

    getPayProcessList(source: Observable<PayProcess[]>): void {
        this.list = source.mergeMap(processes => Observable.from(processes)
            .map(process => {
                const { amount, project_pay__project_bill__project__name, project_pay__project_bill__month } = process;

                const yearMonth = this.time.getDateInfo(new Date(project_pay__project_bill__month)).dateWithoutDay;

                const project = project_pay__project_bill__project__name;

                return { amount, yearMonth, project }
            })
            .reduce((acc, cur) => {
                acc.push(cur);
                return acc;
            }, [])
        )
    }

    goToNextPage(item: PayProcessListItem) {
        this.navCtrl.push(salaryDetailPage, { month: item.yearMonth }).then(() => { });
    }

    ionViewWillUnload() {
        this.payProcess.unSubscribe();
    }
}
