import { NavParams, ViewController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'face-image',
    templateUrl: 'face-image.html'
})
export class FaceImageComponent implements OnInit {
    similarity: number;

    screen: string;

    capture: string;

    constructor(
        private navParams: NavParams,
        private viewCtrl: ViewController
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
