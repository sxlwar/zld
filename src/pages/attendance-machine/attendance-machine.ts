import { attendanceMachineRecordPage } from './../pages';
import { AttendanceMachine } from './../../interfaces/response-interface';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { AttendanceMachineService } from './../../services/business/attendance-machine-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-attendance-machine',
    templateUrl: 'attendance-machine.html',
})
export class AttendanceMachinePage {

    subscriptions: Subscription[] = [];

    machines: Observable<AttendanceMachine[]>;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public machine: AttendanceMachineService
    ) {
    }

    ionViewDidLoad() {
        this.machines = this.machine.getMachines();

        this.launch();
    }

    launch(): void {
        this.subscriptions = [
            this.machine.getMachineList(),
            this.machine.handleError()
        ]
    }

    ionViewWillUnload() {
        this.subscriptions.forEach(item => item.unsubscribe());
    }

    goToNextPage(machine: AttendanceMachine): void {
        this.navCtrl.push(attendanceMachineRecordPage, { id: machine.id, name: machine.name }).then(_ => { });
    }

}
