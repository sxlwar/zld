import { Subscription } from 'rxjs/Subscription';
import { Message } from './../../interfaces/response-interface';
import { MessageService } from './../../services/business/message-service';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-message-content',
    templateUrl: 'message-content.html',
})
export class MessageContentPage {
    subscriptions: Subscription[] = [];

    content: Observable<string>;

    msg: Message;

    constructor(
        private navParams: NavParams,
        private message: MessageService
    ) {
        this.msg = <Message>this.navParams.get('message');
    }

    ionViewDidLoad() {
        this.initialModel();

        this.sendRequest();

        this.setUnreadCount();
    }

    initialModel() {
        this.content = this.message.getContent();
    }

    sendRequest(): void {
        this.subscriptions = [
            this.message.getMessageContent(Observable.of(this.msg.id))
        ];
    }

    setUnreadCount() {
        if (!this.msg.is_read) {
            this.message.decreaseUnreadCount();
            this.message.setMessageReadTypeAtLocal(this.msg.id);
        }
    }
}
