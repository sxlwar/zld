import { degrees } from './../../interfaces/request-interface';
import { MapperService } from './../../services/api/mapper-service';
import { TimeService } from './../../services/utils/time-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavParams, ViewController } from 'ionic-angular';
import { Component } from '@angular/core';
import { Education } from '../../interfaces/response-interface';
import { mustBeChineseValidator } from '../../validators/validators';

@Component({
  selector: 'add-education',
  templateUrl: 'add-education.html'
})
export class AddEducationComponent {

  buttonText: string = 'ADD_BUTTON';

  title: string = 'ADD_EDUCATION';

  today: string;

  educationForm: FormGroup;

  minEndDate: string;

  degrees = degrees;

  constructor(
    public navParams: NavParams,
    public fb: FormBuilder,
    public viewCtrl: ViewController,
    public timeService: TimeService,
    public mapper: MapperService
  ) {
    this.today = timeService.getDate(new Date(), true);
    this.initialModel();
  }

  initialModel() {
    const form: Education = this.navParams.get('form');

    this.educationForm = this.fb.group({
      startDate: '',
      endDate: '',
      major: ['', [mustBeChineseValidator, Validators.maxLength(10)]],
      degree: '',
      school: ['', [mustBeChineseValidator, Validators.maxLength(10)]],
    });

    if (!!form) this.updateModel(form);
  }

  updateModel(origin: Education): void {
    this.buttonText = 'UPDATE_BUTTON';
    this.title = 'UPDATE_EDUCATION';
    this.educationForm.patchValue({ startDate: origin.start_date, endDate: origin.finish_date, school: origin.school__name, major: origin.major, degree: origin.degree });
  }

  updateEndDate(date: string) {
    this.minEndDate = date;

    this.educationForm.patchValue({ endDate: '' });
  }

  execution() {
    this.viewCtrl.dismiss(this.mapper.transformEducationExperience(this.educationForm.value));
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  get startDate() {
    return this.educationForm.get('startDate');
  }

  get endDate() {
    return this.educationForm.get('endDate');
  }

  get major() {
    return this.educationForm.get('major');
  }

  get degree() {
    return this.educationForm.get('degree');
  }

  get school() {
    return this.educationForm.get('school');
  }

}