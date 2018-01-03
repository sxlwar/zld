import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { TakePhotoService } from './take-photo-service';
import 'rxjs/add/operator/partition';
import { Subject } from 'rxjs/Subject';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'take-photo',
  templateUrl: 'take-photo.html',
})
export class TakePhotoComponent implements OnDestroy {

  @Input() placeholder: string;

  @Output() fileUrl: Subject<string> = new EventEmitter();

  subscription: Subscription;

  constructor(
    public photo: TakePhotoService,
    public translate: TranslateService
  ) {
  }

  showActionSheet() {

    this.subscription && this.subscription.unsubscribe();

    const text$ = this.translate.get(['TAKE_PHOTO', 'PICK_PHOTO', 'CANCEL_BUTTON']);

    this.subscription = text$.subscribe(res => this.photo.showActionSheet(this.fileUrl, res));
  }

  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe();
  }

}
