import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'attach-list',
    templateUrl: 'attach-list.html'
})
export class AttachListComponent {

    attach: string[] = [''];

    @Output() file: EventEmitter<string[]> = new EventEmitter();

    constructor() {
    }

    addAttach(): void {
        this.attach.push('');
    }

    deleteAttach($event: Event, index: number): void {
        $event.stopPropagation();

        this.attach.splice(index, 1);

        this.file.next(this.attach.filter(item => !!item));
    }

    getAttach(url: string, index: number): void {
        this.attach[index] = url;

        this.file.next(this.attach.filter(item => !!item));
    }

}
