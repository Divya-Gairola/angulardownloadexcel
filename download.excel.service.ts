import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class DownloadExcelService {
private observableDataGet: Observable<"FAILURE" | Blob>;
constructor(private _http: Http) {
}

downloadExcel(): Observable<Object[]> {
    return Observable.create(observer => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "/employeeReport.xlsx", true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        xhr.responseType = 'blob';

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
                    var blob = new Blob([xhr.response], { type: contentType });
                    observer.next(blob);
                    observer.complete();
                } else {
                    observer.error(xhr.response);
                }
            }
        }
        //xhr.send(JSON.stringify({ email: "hello@user.com", response: { name: "Tester" } }));
       // xhr.send(json);

    });
}
}