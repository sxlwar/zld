import { UploadOptions } from './../../interfaces/request-interface';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { FileTransfer, FileTransferObject, FileUploadOptions, FileUploadResult } from '@ionic-native/file-transfer';
import { ENV } from '@app/env';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import { Version } from '../../interfaces/response-interface';
import { ApiUnit, Operate } from '../../interfaces/api-interface';

export interface HttpApiUnit extends ApiUnit {
  url: string;
}

export const uploadPersonalIdImage: HttpApiUnit = {
  operates: new Map([
    [Operate.updates, ['personalIdUpdate']]
  ]),
  url: `http://${ENV.DOMAIN}/upload_file`
};

export const uploadCertificateImage: HttpApiUnit = {
  operates: new Map([
    [Operate.updates, ['workCertificateCreate']]
  ]),
  url: `http://${ENV.DOMAIN}/upload_file/`
}

@Injectable()
export class HttpService {

  constructor(
    private fileTransfer: FileTransfer,
    private http: Http
  ) {
  }

  upload(source$: Observable<UploadOptions>): Observable<FileUploadResult> {
    return source$.mergeMap(option => Observable.fromPromise(this.transferFile(option)))
  }

  transferFile(option: UploadOptions): Promise<FileUploadResult> {
    const url = encodeURI(`http://${ENV.DOMAIN}/upload_file/`);

    const { sid, command, type, file } = option;

    const options: FileUploadOptions = {
      fileKey: 'file',
      fileName: file.substr(file.lastIndexOf("/") + 1),
      params: { sid, command, type }
    };

    const fileTransfer: FileTransferObject = this.fileTransfer.create();

    return fileTransfer.upload(file, url, options)
  }

 transferFileObservable(option: UploadOptions): Observable<FileUploadResult> {
   return Observable.fromPromise(this.transferFile(option));
 }

  getServerVersion(version?: string): Observable<Version[]> {
    const url = `http://${ENV.DOMAIN}/check_version/`;

    const data = !!version ? this.http.get(url, { params: { version } }) : this.http.get(url);

    return data.map(res => {
      const data = res.json();

      return data.data.versions;
    }) as Observable<Version[]>;
  }
}
