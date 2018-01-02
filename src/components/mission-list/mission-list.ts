import { WorkFlowAuditComponent } from './../work-flow-audit/work-flow-audit';
import { ModalController } from 'ionic-angular';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MissionListItem, AuditTarget } from '../../interfaces/mission-interface';

@Component({
  selector: 'mission-list',
  templateUrl: 'mission-list.html'
})
export class MissionListComponent {

  @Input() list: MissionListItem[] = [];

  @Input() operate = false;

  @Input() total: number;

  @Input() haveMoreData: boolean = true;

  @Output() auditApply: EventEmitter<AuditTarget> = new EventEmitter();

  @Output() getNextPage: EventEmitter<null> = new EventEmitter();

  @Output() showDetail: EventEmitter<MissionListItem> = new EventEmitter();

  allSelected = false;

  constructor(
    public modalCtrl: ModalController
  ) {
  }

  showComment() {
    const list = this.list.filter(item => item.selected);

    if (list.length) {
      const modal = this.modalCtrl.create(WorkFlowAuditComponent, { list });

      modal.present();

      modal.onDidDismiss((data: AuditTarget) => data && this.auditApply.next(data));
    }
  }

  /**
   * @description We did not put this state into store at this time. 
   */
  checkAllSelectedFlag(isSelected: boolean) {
    if(!isSelected) {
      this.allSelected = false;
    }else {
      this.allSelected = this.list.every(item => item.selected);
    }
  }

  toggleAllSelected(isSelected: boolean) {
    this.list.forEach(item => item.selected = isSelected);
  }
}
