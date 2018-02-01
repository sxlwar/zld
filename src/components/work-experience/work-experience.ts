import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Item, ItemSliding } from 'ionic-angular';

import { LayoutService } from '../../services/utils/layout-service';
import { CustomWorkExperience } from './../../interfaces/personal-interface';

@Component({
    selector: 'work-experience',
    templateUrl: 'work-experience.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkExperienceComponent implements OnDestroy {

    @Input() experience: CustomWorkExperience[];

    @Input() canEditor = false;

    @Output() updateExperience: EventEmitter<CustomWorkExperience> = new EventEmitter();

    @Output() deleteExperience: EventEmitter<CustomWorkExperience> = new EventEmitter();

    constructor(
        private layout: LayoutService
    ) {
    }

    openOption(itemSlide: ItemSliding, item: Item, event) {
        this.layout.openOption(itemSlide, item, event);
    }

    ngOnDestroy() {
        this.layout.activeItemSliding = null;
    }
}
