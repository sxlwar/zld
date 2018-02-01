import { Component } from '@angular/core';
import { InfiniteScroll, IonicPage, NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { MessageReadTag } from './../../interfaces/request-interface';
import { Message } from './../../interfaces/response-interface';
import { MessageService } from './../../services/business/message-service';
import { messageContentPage } from './../pages';

@IonicPage()
@Component({
    selector: 'page-message',
    templateUrl: 'message.html',
})
export class MessagePage {

    subscriptions: Subscription[] = [];

    messageType = 'unread';

    unreadMessages: Observable<Message[]>;

    readMessages: Observable<Message[]>;

    haveMoreUnreadMessage: Observable<boolean>;

    haveMoreReadMessage: Observable<boolean>;

    unread$$: Subscription;

    read$$: Subscription;

    launchReadQuery$$: Subscription;

    selectedUnreadTimeOrder: Observable<number>;

    selectedReadTimeOrder: Observable<number>;

    selectedUnreadType: Observable<number>;

    selectedReadType: Observable<number>;

    constructor(
        private navCtrl: NavController,
        private message: MessageService
    ) {
    }

    ionViewDidLoad() {
        this.sendRequest();

        this.initialModel();
    }

    sendRequest(): void {
        this.subscriptions = [
            this.message.getMessageListByReadState(MessageReadTag.unread),
        ];
    }

    launchReadStateListQuery() {
        if (!this.launchReadQuery$$) {
            this.launchReadQuery$$ = this.message.getMessageListByReadState(MessageReadTag.read);
        }
    }

    initialModel(): void {
        this.unreadMessages = this.message.getUnreadMessages();

        this.readMessages = this.message.getReadMessages();

        this.haveMoreUnreadMessage = this.message.haveMoreUnreadMessage();

        this.haveMoreReadMessage = this.message.haveMoreReadMessage();

        this.selectedUnreadTimeOrder = this.message.getUnreadTimeOrder();

        this.selectedReadTimeOrder = this.message.getReadTimeOrder();

        this.selectedUnreadType = this.message.getUnreadSelectedType();

        this.selectedReadType = this.message.getReadSelectedType();
    }

    getNextPageOfUnread(infiniteScroll: InfiniteScroll): void {
        this.message.increaseUnreadPage();

        this.unread$$ && this.unread$$.unsubscribe();

        this.unread$$ = this.message.getMessageListComplete().subscribe(_ => infiniteScroll.complete());
    }

    getNextPageOfRead(infiniteScroll: InfiniteScroll): void {
        this.message.increaseReadPage();

        this.read$$ && this.read$$.unsubscribe();

        this.read$$ = this.message.getMessageListComplete().subscribe(_ => infiniteScroll.complete());
    }

    goToContentPage(message: Message): void {
        this.navCtrl.push(messageContentPage, { message }).then(() => { });
    }

    updateUnreadTimeOrder(order: string): void {

        this.message.updateUnreadTimeOrder(Number(order));
    }

    updateReadTimeOrder(order: string): void {
        this.message.updateReadTimeOrder(Number(order));
    }

    updateUnreadType(type: number): void {
        this.message.updateUnreadSelectedType(type);
    }

    updateReadType(type: number): void {
        this.message.updateReadSelectedType(type);
    }

    ionViewWillUnload() {
        this.unread$$ && this.unread$$.unsubscribe();

        this.read$$ && this.read$$.unsubscribe();

        this.launchReadQuery$$ && this.launchReadQuery$$.unsubscribe();

        this.subscriptions.forEach(item => item.unsubscribe());
    }

}
