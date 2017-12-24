import { TimeService } from './../../services/utils/time-service';
import { MapperService } from './../../services/api/mapper-service';
import { mustBeChineseValidator } from '../../validators/validators';
import { CustomWorkExperience } from './../../interfaces/personal-interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavParams, ViewController } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
  selector: 'add-work-experience',
  templateUrl: 'add-work-experience.html'
})
export class AddWorkExperienceComponent {

  buttonText = 'ADD_BUTTON';

  title = 'ADD_WORK_EXPERIENCE';

  workExperienceForm: FormGroup;

  minEndDate: string;

  today: string;

  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public fb: FormBuilder,
    public mapper: MapperService,
    public timeService: TimeService
  ) {
    this.today = timeService.getDate(new Date(), true);

    this.initialModel();
  }

  initialModel() {
    this.workExperienceForm = this.fb.group({
      startDate: '',
      endDate: '',
      company: ['', [mustBeChineseValidator, Validators.maxLength(20)]],
      job: '',
      project: ['', [mustBeChineseValidator, Validators.maxLength(20)]],
    });

    const form: CustomWorkExperience = this.navParams.get('form');

    if (!!form) this.updateModel(form);
  }

  updateModel(origin: CustomWorkExperience): void {
    this.buttonText = 'UPDATE_BUTTON';

    this.title = 'UPDATE_WORK_EXPERIENCE';

    const [startDate, endDate] = origin.expire.split('--');

    const { company, project, job } = origin;

    this.workExperienceForm.patchValue({ startDate, endDate, company, project, job });
  }

  updateEndDate(date: string) {
    const next = this.timeService.getNextDay(new Date(date));

    this.minEndDate = this.timeService.getDate(next, true);

    this.workExperienceForm.patchValue({ endDate: '' });
  }

  execution() {
    this.viewCtrl.dismiss(this.mapper.transformWorkExperienceOptions(this.workExperienceForm.value));
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  get startDate() {
    return this.workExperienceForm.get('startDate');
  }

  get endDate() {
    return this.workExperienceForm.get('endDate');
  }

  get company() {
    return this.workExperienceForm.get('company');
  }

  get project() {
    return this.workExperienceForm.get('project');
  }

  get job() {
    return this.workExperienceForm.get('job');
  }
}
