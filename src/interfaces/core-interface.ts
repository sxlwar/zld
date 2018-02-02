import { Subscription } from 'rxjs';

export abstract class BusinessModel {
    abstract subscriptions: Subscription[];

    abstract launch(option?: any): void;

    abstract initialModel(option?: any): void;
}

export abstract class BusinessPageModel extends BusinessModel {
    abstract ionViewDidLoad(): void;
    
    abstract ionViewWillUnload(): void;
}

export abstract class BusinessComponentModel extends BusinessModel {
    abstract ngOnInit(): void;

    abstract ngOnDestroy(): void;
}
