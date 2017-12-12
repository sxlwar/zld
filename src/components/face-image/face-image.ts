import { NavParams, ViewController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';

/**
 * Generated class for the FaceImageComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'face-image',
  templateUrl: 'face-image.html'
})
export class FaceImageComponent implements OnInit {
  similarity: number;

  screen: string;

  capture: string;

  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {

  }

  ngOnInit() {
    this.similarity = this.navParams.get('similarity') * 100;

    this.screen = this.navParams.get('screen');

    this.capture = this.navParams.get('capture');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}