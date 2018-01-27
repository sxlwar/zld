import { BasicInformation, PersonalId } from './../../interfaces/response-interface';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'basic-information',
    templateUrl: 'basic-information.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicInformationComponent {

    @Input() basic: BasicInformation;

    @Input() personalId: PersonalId;

    constructor(
    ) {

    }

    call(): void {
        window.open(`tel:${this.basic.phone}`);
    }
}
