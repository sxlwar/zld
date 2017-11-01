import {Injectable} from '@angular/core';
import {FileTransfer, FileTransferObject, FileUploadOptions, FileUploadResult} from '@ionic-native/file-transfer';
import {ENV} from '@app/env';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

interface UploadOption {
  sid: string;
  command: string;
  type: string;
  file: string;
}

@Injectable()
export class HttpService {

  constructor(private fileTransfer: FileTransfer) {
  }

  upload(source$: Observable<UploadOption>): Observable<FileUploadResult> {
    return source$.mergeMap(option => Observable.fromPromise(this.transferFile(option)))
  }

  transferFile(option: UploadOption): Promise<FileUploadResult> {
    const url = encodeURI(`http://${ENV.DOMAIN}/upload_file/`);

    const {sid, command, type, file} = option;

    const options: FileUploadOptions = {
      fileKey: 'file',
      fileName: option.file.substr(option.file.lastIndexOf("/") + 1),
      params: {sid, command, type}
    };

    const fileTransfer: FileTransferObject = this.fileTransfer.create();

    return fileTransfer.upload(file, url, options)
  }
}
