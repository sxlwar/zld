import { Subscription } from 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmProp, TipService } from './../../services/tip-service';
import { Observable } from 'rxjs/Observable';
import { BasicInformation, PersonalId } from './../../interfaces/response-interface';
import { Component, Input, ChangeDetectionStrategy, OnDestroy } from '@angular/core';

@Component({
    selector: 'basic-information',
    templateUrl: 'basic-information.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicInformationComponent {

    @Input() basic: BasicInformation;

    @Input() personalId: PersonalId;

    constructor(
        private tip: TipService,
        private translate: TranslateService
    ) {

    }

    call(): void {
        window.open(`tel:${this.basic.phone}`);
    }
}
