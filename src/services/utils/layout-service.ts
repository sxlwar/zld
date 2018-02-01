import { Injectable } from '@angular/core';
import { Item, ItemSliding } from 'ionic-angular';

@Injectable()
export class LayoutService {

    activeItemSliding: ItemSliding = null;

    constructor() {

    }

    openOption(itemSlide: ItemSliding, item: Item, event) {
        event.stopPropagation();

        this.activeItemSliding && this.closeOption();

        this.activeItemSliding = itemSlide;

        const swipeAmount = 110;

        itemSlide.startSliding(swipeAmount);

        itemSlide.moveSliding(swipeAmount);

        itemSlide.setElementClass('active-slide', true);

        itemSlide.setElementClass('active-options-right', true);

        item.setElementStyle('transition', null);

        item.setElementStyle('transform', 'translate3d(-' + swipeAmount + 'px, 0px, 0px)');
    }

    closeOption() {
        if (this.activeItemSliding) {
            this.activeItemSliding.close();
            this.activeItemSliding = null;
        }
    }
}
