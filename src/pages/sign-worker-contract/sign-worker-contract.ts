import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, ModalController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { LaunchResponse } from '../../reducers/reducer/launch-reducer';
import { Team, WorkType } from './../../interfaces/response-interface';
import { WorkerContractFormModel } from './../../services/api/mapper-service';
import { CraftService } from './../../services/business/craft-service';
import { LaunchService } from './../../services/business/launch-service';
import { SearchService } from './../../services/business/search-service';
import { TeamService } from './../../services/business/team-service';
import { ConfigService } from './../../services/config/config-service';
import { searchWorkerPage } from './../pages';


@IonicPage()
@Component({
    selector: 'page-sign-worker-contract',
    templateUrl: 'sign-worker-contract.html',
})
export class SignWorkerContractPage {
    contractType: number;

    selectedTeam: Observable<Team>;

    contract: FormGroup;

    timePayContract: FormGroup;

    piecePayContracts: FormGroup[] = [];

    teams: Observable<Team[]>;

    workTypes: Observable<WorkType[]>;

    subscriptions: Subscription[] = [];

    workers: Observable<string>;

    formInvalid: boolean;

    isPieceWiseAttendance = false;

    attendanceTimeSettingText = 'PIECE_WISE_SETTING';

    contract$: Subject<WorkerContractFormModel> = new Subject();

    attachList: string[] = [];

    constructor(
        private navParams: NavParams,
        private fb: FormBuilder,
        private teamService: TeamService,
        private craft: CraftService,
        private modalCtrl: ModalController,
        private config: ConfigService,
        private searchService: SearchService,
        private launchService: LaunchService
    ) {
        this.initialForm();
    }

    ionViewCanEnter() {
        const { view, opt } = this.navParams.get('permission');

        return opt || view;
    }

    ionViewDidLoad() {
        this.config.hideTabBar();

        this.teams = this.teamService.getOwnTeams();

        this.workTypes = this.craft.getWorkTypeList();

        this.workers = this.searchService.getSelectedWorkers().map(source => source.map(item => item.realname).join(' '));

        this.launch();
    }

    launch() {
        this.subscriptions = [
            this.searchService.getSelectedWorkers().subscribe(source => this.contract.patchValue({ workerIds: source.map(item => item.user_id) })),

            this.launchService.createWorkerContract(this.contract$.map(_ => ({ ...this.contract.value, ...this.timePayContract.value, pieces: this.piecePayContracts.map(item => item.value), attach: this.attachList }))),

            this.launchService.uploadWorkerContractAttach(),

            this.launchService.getSignWorkerContractResponse().subscribe(_ => this.resetForm()),

            this.launchService.handleWorkerContractError(),
        ];
    }

    initialForm(): void {
        this.contract = this.fb.group({
            formType: '',
            teamId: '',
            workTypeId: '',
            payDay: ['', [Validators.max(31), Validators.min(1)]],
            startDay: '',
            endDay: '',
            morningOnDuty: '',
            morningOffDuty: '',
            comment: '',
            afternoonOnDuty: '',
            afternoonOffDuty: '',
            workerIds: [],
        });

        this.timePayContract = this.fb.group({
            hourlyWage: '',
            content: '',
        });

        this.piecePayContracts = [this.createPieceForm()];
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

    showPartyAInfo(id: number): void {
        this.selectedTeam = this.teams.map(teams => teams.find(item => item.id === id));
    }

    searchWorker(ev: Event): void {
        this.modalCtrl.create(searchWorkerPage).present();
    }

    updateExpireDate(start: string): void {
        this.contract.patchValue({ endDay: '' });
    }

    resetMorningOffDuty(): void {
        this.contract.patchValue({ morningOffDuty: '' });
    }

    resetAfternoonOffDuty(): void {
        this.contract.patchValue({ afternoonOffDuty: '' });
    }

    addPiece(): void {
        this.piecePayContracts.push(this.createPieceForm());
    }

    deletePieceForm(index: number): void {
        this.piecePayContracts.splice(index, 1);
    }

    isInvalid(): boolean {
        if (this.contract.invalid) {
            return true;
        } else {
            return this.contract.get('formType').value === '1' ? this.timePayContract.invalid : this.piecePayContracts.some(form => form.invalid);
        }
    }

    ngAfterContentChecked(): void {
        this.formInvalid = this.isInvalid();
    }

    toggleAttendanceTime(): void {
        this.isPieceWiseAttendance = !this.isPieceWiseAttendance;

        !this.isPieceWiseAttendance && this.contract.patchValue({ afternoonOnDuty: '', afternoonOffDuty: '' });

        this.attendanceTimeSettingText = this.isPieceWiseAttendance ? 'CANCEL_PIECE_WISE' : 'PIECE_WISE_SETTING';
    }

    getAttach(attach: string[]): void {
        this.attachList = attach;
    }

    resetForm(): void {
        this.contract.reset();
        this.timePayContract.reset();
        this.piecePayContracts.forEach(item => item.reset());
    }

    ionViewWillUnload(): void {
        this.config.showTabBar();

        this.launchService.resetResponse(LaunchResponse.workerContract);

        this.subscriptions.forEach(item => item.unsubscribe());
    }

    get formType() {
        return this.contract.get('formType');
    }

    get teamId() {
        return this.contract.get('teamId')
    }

    get workTypeId() {
        return this.contract.get('workTypeId');
    }

    get startDay() {
        return this.contract.get('startDay');
    }

    get endDay() {
        return this.contract.get('endDay');
    }

    get morningOnDuty() {
        return this.contract.get('morningOnDuty');
    }

    get morningOffDuty() {
        return this.contract.get('morningOffDuty');
    }

    get afternoonOnDuty() {
        return this.contract.get('afternoonOnDuty');
    }

    get afternoonOffDuty() {
        return this.contract.get('afternoonOffDuty');
    }

    get payDay() {
        return this.contract.get('payDay');
    }

    get comment() {
        return this.contract.get('comment');
    }

    get workerIds() {
        return this.contract.get('workerIds');
    }

    get hourlyWage() {
        return this.timePayContract.get('hourlyWage');
    }

    get content() {
        return this.timePayContract.get('content');
    }
}
