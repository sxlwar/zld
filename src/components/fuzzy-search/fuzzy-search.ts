import 'rxjs/add/operator/scan';

import { Component, EventEmitter, Input, Output } from '@angular/core';

import { SearchItem } from '../../interfaces/search-interface';

@Component({
    selector: 'fuzzy-search',
    templateUrl: 'fuzzy-search.html',
})
export class FuzzySearchComponent {

    @Input() selectType: string;

    @Input() items: SearchItem[];

    @Input() type = 'text';

    @Input() placeholder = '';

    @Output() confirm = new EventEmitter();

    @Output() search: EventEmitter<string> = new EventEmitter();

    @Output() select: EventEmitter<SearchItem> = new EventEmitter();

    constructor() {
    }
}
