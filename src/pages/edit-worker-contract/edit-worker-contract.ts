import { WorkerContract, ContractTypeOfResponse } from './../../interfaces/response-interface';
import { LaunchService } from './../../services/business/launch-service';
import { ConfigService } from './../../services/config/config-service';
import { WorkerContractEditFormModel } from './../../services/api/mapper-service';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-edit-worker-contract',
    templateUrl: 'edit-worker-contract.html',
})
export class EditWorkerContractPage {

    form: FormGroup;

    timePayContract: FormGroup;

    piecePayContracts: FormGroup[] = [];

    subscriptions: Subscription[] = [];

    contract: WorkerContract;

    formInvalid: boolean;

    isPieceWiseAttendance = false;

    attendanceTimeSettingText = 'PIECE_WISE_SETTING';

    contract$: Subject<WorkerContractEditFormModel> = new Subject();

    attachList: string[] = [];

    constructor(
        private navParams: NavParams,
        private fb: FormBuilder,
        private config: ConfigService,
        private launchService: LaunchService,
        private viewCtrl: ViewController
    ) {
        this.contract = <WorkerContract>this.navParams.get('contract');

        this.initialForm();
    }

    ionViewDidLoad() {
        this.config.hideTabBar();

        this.launch();
    }

    launch() {
        this.subscriptions = [
            this.launchService.editWorkerContract(this.contract$.map(_ => this.contract.type === ContractTypeOfResponse.timer ? { ...this.form.value, ...this.timePayContract.value, attach: this.attachList } : { ...this.form.value, pieces: this.piecePayContracts.map(item => item.value), attach: this.attachList })),
            this.launchService.uploadWorkerContractEditAttach(),
            this.launchService.getSuccessResponseOfWorkerContractEdit().subscribe(_ => this.resetForm()),
            this.launchService.handelWorkerContractEditError(),
        ];
    }

    initialForm(): void {
        this.form = this.fb.group({
            contractId: this.contract.id,
            type: this.contract.type,
            payDay: ['', [Validators.max(31), Validators.min(1)]],
            endDay: this.contract.finish_day,
            morningOnDuty: this.contract.morning_time_on_duty,
            morningOffDuty: this.contract.morning_time_off_duty,
            comment: this.contract.additional_content,
            afternoonOnDuty: this.contract.afternoon_time_on_duty,
            afternoonOffDuty: this.contract.afternoon_time_off_duty
        });

        if (this.contract.type === ContractTypeOfResponse.timer) {
            const timePay = this.contract.work_time_pay[0];

            this.timePayContract = this.fb.group({
                hourlyWage: timePay.pay_mount,
                overtimeHourlyWage: timePay.overtime_pay_mount,
                content: timePay.content,
                id: timePay.id,
            });
        } else {
            this.piecePayContracts = this.contract.work_piece_pay.map(item => this.fb.group({
                name: item.name,
                location: item.location,
                pieceWage: item.pay_mount,
                num: item.num,
                standard: item.standard,
                id: item.id
            }));
        }

    }

    createPieceForm(): FormGroup {
        return this.fb.group({
            name: '',
            location: '',
            pieceWage: '',
            num: '',
            standard: '',
        });
    }

    resetMorningOffDuty(): void {
        this.form.patchValue({ morningOffDuty: '' });
    }

    resetAfternoonOffDuty(): void {
        this.form.patchValue({ afternoonOffDuty: '' });
    }

    addPiece(): void {
        this.piecePayContracts.push(this.createPieceForm());
    }

    deletePieceForm(index: number): void {
        this.piecePayContracts.splice(index, 1);
    }

    isInvalid(): boolean {
        if (this.form.invalid) {
            return true;
        } else {
            return this.contract.type === ContractTypeOfResponse.timer ? this.timePayContract.invalid : this.piecePayContracts.some(form => form.invalid);
        }
    }

    ngAfterContentChecked(): void {
        this.formInvalid = this.isInvalid();
    }

    toggleAttendanceTime(): void {
        this.isPieceWiseAttendance = !this.isPieceWiseAttendance;

        !this.isPieceWiseAttendance && this.form.patchValue({ afternoonOnDuty: '', afternoonOffDuty: '' });

        this.attendanceTimeSettingText = this.isPieceWiseAttendance ? 'CANCEL_PIECE_WISE' : 'PIECE_WISE_SETTING';
    }

    getAttach(attach: string[]): void {
        this.attachList = attach;
    }

    resetForm(): void {
        this.form.reset();
        
        this.timePayContract && this.timePayContract.reset();
        
        this.piecePayContracts.forEach(item => item.reset());
    }

    dismiss(): void {
        this.viewCtrl.dismiss();
    }

    ionViewWillUnload(): void {
        this.config.showTabBar();

        this.launchService.resetWorkerContractEditResponse();

        this.subscriptions.forEach(item => item.unsubscribe());
    }

    get type() {
        return this.form.get('type');
    }

    get endDay() {
        return this.form.get('endDay');
    }

    get morningOnDuty() {
        return this.form.get('morningOnDuty');
    }

    get morningOffDuty() {
        return this.form.get('morningOffDuty');
    }

    get afternoonOnDuty() {
        return this.form.get('afternoonOnDuty');
    }

    get afternoonOffDuty() {
        return this.form.get('afternoonOffDuty');
    }

    get payDay() {
        return this.form.get('payDay');
    }

    get comment() {
        return this.form.get('comment');
    }

    get hourlyWage() {
        return this.timePayContract.get('hourlyWage');
    }

    get overtimeHourlyWage() {
        return this.timePayContract.get('overtimeHourlyWage');
    }

    get content() {
        return this.timePayContract.get('content');
    }

}
