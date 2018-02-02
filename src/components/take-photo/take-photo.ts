import 'rxjs/add/operator/partition';

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { BusinessComponentModel } from '../../interfaces/core-interface';
import { TakePhotoService } from './take-photo-service';

@Component({
    selector: 'take-photo',
    templateUrl: 'take-photo.html',
})
export class TakePhotoComponent implements BusinessComponentModel {

    @Input() placeholder: string;

    @Output() fileUrl: EventEmitter<string> = new EventEmitter();

    subscriptions: Subscription[] = [];

    execute$: Subject<boolean> = new Subject();

    constructor(
        private photo: TakePhotoService,
        private translate: TranslateService
    ) {
    }

    ngOnInit() {
        this.launch();
    }

    launch(): void {
        this.subscriptions = [
            this.execute$.withLatestFrom(this.translate.get(['TAKE_PHOTO', 'PICK_PHOTO', 'CANCEL_BUTTON']), (_, text) => text)
                .subscribe(res => this.photo.showActionSheet(this.fileUrl, res)),
        ];
    }

    initialModel(): void { 

    }

    ngOnDestroy() {
        this.subscriptions.forEach(item => item.unsubscribe());
    }

}
