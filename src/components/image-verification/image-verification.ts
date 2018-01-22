import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'image-verification',
    templateUrl: 'image-verification.html'
})
export class ImageVerificationComponent {

    @Input() src: string;
    @Output() update = new EventEmitter();

    constructor() {
    }
}
