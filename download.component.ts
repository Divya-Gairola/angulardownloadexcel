import { Component } from '@angular/core';
//import { ExcelService } from '../../service/excel.service';
import { Observable } from 'rxjs';
//import { saveAs } from 'filesaver';
import { Http, Request } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { DownloadExcelService } from '../../service/download.excel.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css'],
  providers: [DownloadExcelService]
})

export class DownloadComponent{

constructor( private _DownloadExcelService: DownloadExcelService) {
   

        this._DownloadExcelService.downloadExcel()
            .subscribe(blob => 
            {
                if (navigator.appVersion.toString().indexOf('.NET') > 0) { // for IE browser
                    window.navigator.msSaveBlob(blob, "Report.xlsx");
                }
                else { // for chrome and firfox
                    var link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.download = "Report.xlsx";
                    link.click();
                }
            }
        ), error => console.log("Error downloading the file."),
            () => console.log('Completed file download.');

    }
}


    //data: any = [{
    //    eid: 'e101',
    //    ename: 'ravi',
     //   esal: 1000
       // }];
     //   constructor(private excelService:ExcelService){
     //   }
       // exportAsXLSX():void {
       //    this.excelService.exportAsExcelFile(this.data, 'sample');
      //  }


