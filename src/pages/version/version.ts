import { Observable } from 'rxjs/Observable';
import { HttpService } from './../../services/api/http-service';
import { AppVersion } from '@ionic-native/app-version';
import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Version } from '../../interfaces/response-interface';
import { putInArray } from '../../services/utils/util';


@IonicPage()
@Component({
  selector: 'page-version',
  templateUrl: 'version.html',
})
export class VersionPage {
  version: Promise<string>;

  versions: Observable<Version[]>;

  constructor(
    public appVersion: AppVersion,
    public httpService: HttpService
  ) {
  }

  ionViewDidLoad() {
    this.version = this.appVersion.getVersionNumber();

    //TODO:此处绕过了store，需要重构
    this.versions = Observable.fromPromise(this.version)
      .mergeMap(version => this.httpService.getServerVersion(version)
        .mergeMap(response => Observable.from(response).map(item => {
          item.intro = item.text.split('\r\n');

          return item;
        }).reduce(putInArray,[]))
    );
  }

}