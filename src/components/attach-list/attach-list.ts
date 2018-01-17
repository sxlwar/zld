import { Component, Output, EventEmitter } from '@angular/core';

interface AttachItem {
    title: string;
}

@Component({
    selector: 'attach-list',
    templateUrl: 'attach-list.html',
})
export class AttachListComponent {

    attach: AttachItem[] = [];

    @Output() file: EventEmitter<string[]> = new EventEmitter();

    data: string[] = [];

    constructor(
    ) {
    }

    addAttach(): void {
        this.attach.push({ title: 'ATTACH'});

        this.data.push('');
    }

    deleteAttach(list: AttachItem[], index: number): void {
        list.splice(index, 1);

        this.data.splice(index, 1);

        this.file.next(this.data);
    }

    getAttach(url: string, index: number): void {
        this.data[index] = url;

        this.file.next(this.data);
    }

}
