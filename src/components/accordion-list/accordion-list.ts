import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
    selector: 'accordion-list',
    templateUrl: 'accordion-list.html',
})
export class AccordionListComponent {
    @Input() headerColor: string = '#00c1DE';

    @Input() textColor: string = '#FFF';

    @Input() contentColor: string = '#F9F9F9';

    @Input() title: string;

    @Input() hasMargin: boolean = true;

    @ViewChild('accordionContent') elementView: ElementRef;

    @Output() create: EventEmitter<null> = new EventEmitter();

    @Output() trash: EventEmitter<null> = new EventEmitter();

    expanded: boolean = false;

    viewHeight: number;

    constructor(
        private renderer: Renderer2
    ) {
    }

    ngAfterViewInit() {
        this.viewHeight = this.elementView.nativeElement.offsetHeight;

        this.renderer.setStyle(this.elementView.nativeElement, 'height', 0 + 'px');
    }

    toggleAccordion() {
        this.expanded = !this.expanded;

        const newHeight = this.expanded ? '100%' : '0px';

        this.renderer.setStyle(this.elementView.nativeElement, 'height', newHeight);
    }

    createClicked($event: Event) {
        $event.stopPropagation();

        this.create.next();
    }

    trashClicked($event: Event) {
        $event.stopPropagation();

        this.trash.next();
    }

}
