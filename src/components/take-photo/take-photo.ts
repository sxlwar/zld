import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { TakePhotoService } from './take-photo-service';
import 'rxjs/add/operator/partition';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'take-photo',
    templateUrl: 'take-photo.html',
})
export class TakePhotoComponent implements OnDestroy, OnDestroy {

    @Input() placeholder: string;

    @Output() fileUrl: EventEmitter<string> = new EventEmitter();

    subscription: Subscription;

    constructor(
        public photo: TakePhotoService,
        public translate: TranslateService
    ) {
    }

    showActionSheet() {
        this.subscription && this.subscription.unsubscribe();

        this.subscription = this.translate.get(['TAKE_PHOTO', 'PICK_PHOTO', 'CANCEL_BUTTON']).subscribe(res => this.photo.showActionSheet(this.fileUrl, res));
    }

    ngOnDestroy() {
        this.subscription && this.subscription.unsubscribe();
    }

}
