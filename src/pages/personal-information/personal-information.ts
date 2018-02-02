import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { BusinessPageModel } from '../../interfaces/core-interface';
import { addressAreaFormat } from '../../validators/validators';
import { WorkTypeSelectComponent } from './../../components/work-type-select/work-type-select';
import { RequestOption } from './../../interfaces/request-interface';
import { PersonalId, WorkerDetail, WorkType } from './../../interfaces/response-interface';
import { CraftService } from './../../services/business/craft-service';
import { PersonalService } from './../../services/business/personal-service';
import { AddressService } from './../../services/utils/address-service';

@IonicPage()
@Component({
    selector: 'page-personal-information',
    templateUrl: 'personal-information.html',
})
export class PersonalInformationPage implements BusinessPageModel {
    subscriptions: Subscription[];

    personalId: PersonalId;

    workerDetail: WorkerDetail;

    workTypes: Observable<WorkType[]>;

    selectedArea: Observable<string>;

    addressSubject: Subject<string> = new Subject();

    constructor(
        private navParams: NavParams,
        private personal: PersonalService,
        private craft: CraftService,
        private modalCtrl: ModalController,
        private addressService: AddressService
    ) { }

    ionViewCanEnter() {
        const { view, opt } = this.navParams.get('permission');

        return opt || view;
    }

    ionViewDidLoad() {
        this.initialModel();

        this.launch();
    }

    launch() {
        this.subscriptions = [
            this.personal.getPersonalId().subscribe(id => (this.personalId = id)),

            this.personal.getPersonalIdList(),

            this.personal.getWorkerDetailList(),

            this.personal.getWorkerDetail().subscribe(detail => (this.workerDetail = detail)),

            this.personal.updateWorkerDetailWorkTypeAtLocal(),

            this.monitor(),

            this.personal.handlePersonalIdError(),

            this.personal.handleWorkDetailError(),

            this.personal.handleUpdateWorkerDetailError(),
        ];
    }

    initialModel() {
        this.workTypes = this.personal.getOwnWorkTypes();

        this.selectedArea = this.addressService
            .getAddressCode(
            this.personal
                .getWorkerDetail()
                .map(item => [item.curraddr__province, item.curraddr__city, item.curraddr__dist])
            )
            .map(result => result.join(' '));
    }

	/**
     * @description Monitoring whether the values that allow users to modify are changed.
     * If the user modifies some values, the corresponding api will be adjusted, at the same time, the corresponding 
     * data in the store will be modified after the response is successful;
     */
    monitor(): Subscription {
        const typeOption = this.craft
            .getSelectedTypes()
            .skip(1)
            .distinct(value => value)
            .map(work_type_id => ({ work_type_id }));

        //基于后台的2逼逻辑，处理地址信息的时候需要把work type 的信息带上，所以加了这一行
        const workType = this.personal
            .getWorkerDetail()
            .map(item => ({ work_type_id: item.workType__id }))
            .take(1)
            .concat(typeOption);

        const area = this.monitorAddressArea(workType);

        const detail = this.monitorAddressDetail(workType);

        return this.personal.updateWorkerDetail(typeOption.merge(area, detail));
    }

	/**
     * @description To update the area, we have to pass the work type ids to the server.
     * To ensure that the stream emit value when area information changes only, it is necessary to check
     * whether the value of area has changed.
     */
    monitorAddressArea(workType: Observable<RequestOption>): Observable<RequestOption> {
        return workType
            .combineLatest(
            this.addressService
                .getAddressName(
                this.addressSubject.filter(item => addressAreaFormat.test(item))
                    .distinct(value => value)
                    .map(item => item.split(' '))
                )
                .map(([province, city, dist]) => ({ province, city, dist })),
            (workType, address) => ({ ...workType, ...address })
            )
            .distinct(value => value.province + value.city + value.dist);
    }

	/**
     * @description To update the address details, we have to get the other information of the address, e.g. province, city, country...
     * more nauseous is that we have to pass the work type ids to the server, otherwise api error occur.
     */
    monitorAddressDetail(workType: Observable<RequestOption>): Observable<RequestOption> {
        return workType
            .combineLatest(
            this.addressSubject
                .filter(item => !addressAreaFormat.test(item))
                .map(detail => ({ detail }))
                .withLatestFrom(
                this.personal.getWorkerDetail().map(item => ({
                    province: item.curraddr__province,
                    city: item.curraddr__city,
                    dist: item.curraddr__dist,
                }))
                )
                .map(([detail, other]) => ({ ...detail, ...other })),
            (workType, address) => ({ ...workType, ...address })
            )
            .distinctUntilKeyChanged('detail');
    }

    modifyWorkType() {
        this.modalCtrl.create(WorkTypeSelectComponent, { types: this.workerDetail.workType__id }).present();
    }

    ionViewWillUnload() {
        this.subscriptions.forEach(item => item.unsubscribe());
    }
}
