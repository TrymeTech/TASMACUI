import { Component, OnInit,ViewChild } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';
import { RestAPIService } from '../../services/restAPI.service';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { MasterDataService } from '../../masters-services/master-data.service';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { PathConstants } from '../../helper/PathConstants';
import { HttpErrorResponse } from '@angular/common/http';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-region-master-entry',
  templateUrl: './region-master-entry.component.html',
  styleUrls: ['./region-master-entry.component.css']
})
export class RegionMasterEntryComponent implements OnInit {
  regioncode:any;
  regionname:any;
  Address:any;
  roleid:any;
  regionmasterentryCols:any =[];
  isSaved: boolean;
  data:any = [];
  regionmasterentryData: any; 
  regmaster_Id:any;
  items:any;
  @ViewChild('dt', { static: false }) table: Table;
  // exportCSV: () => void;

  constructor(private restApiService: RestAPIService, private datepipe: DatePipe,
    private messageService: MessageService, private masterDataService: MasterDataService,
    private authService: AuthService) { }
    
  ngOnInit() {
    this.onView();
    this.onsrno();
  //  this.items = [
  //     {
  //       label: 'Excel', icon: 'pi pi-file-excel', command: () => {
  //         this.table.exportCSV();
  //       }
  //     }
  //   ];    
    
    this.regionmasterentryCols = [
      { field: 'REGNCODE', header: 'Regioncode' },
      { field: 'REGNNAME', header: 'Region Name' },
      { field: 'Address' , header: 'Address' },
      // { field: 'role_id', header: 'Role'},
    ]
  }

  exportCSV(){
    this.table.exportCSV();
  }
  
  onRowSelect(row, index, form: NgForm) {
    if (row !== undefined && row !== null) {
      this.regioncode=row.REGNCODE,
      this.regionname=row.REGNNAME,
      this.Address=row.Address;
      // this.roleid=row.role_id;
    }
  }
 
  assignDefaultValues() {
    this.isSaved = false;
    this.data = [];  
    
   
     }
     
  onSave(form: NgForm) {
    this.isSaved = true;
    const params = {
      'regncode' : this.regioncode,
      'regnname': this.regionname,
      'Address'  : this.Address,
    }
           
       this.restApiService.post(PathConstants.regionmasterentrypost, params).subscribe(res => {
        console.log('item1',res.item1)
         if (res.item1) {
          this.onView();
           this.messageService.clear();
           
           this.messageService.add({
             key: 't-err', severity: 'success',
             summary: 'Success Message', detail: 'Ticket Saved Successfully !'
           });
         } else {
          this.isSaved = false;
           this.messageService.clear();
           this.messageService.add({
            key: 't-err', severity: 'error',
            summary: 'Error Message', detail: res.item2
          });
        }
      }, (err: HttpErrorResponse) => {
        this.isSaved = false;
        if (err.status === 0 || err.status === 400) {
          this.messageService.clear();
          this.messageService.add({
            key: 't-err', severity: 'error',
            summary: 'Error Message', detail: 'Please Contact Administrator!'
          });
        }
      });
   this.onClear;
  }

  onView() {
    this.data = [];
    
    this.restApiService.get(PathConstants.RegionMasterURL).subscribe(res => {
      if (res.length !== 0) {
          this.data = res
          console.log("Length",res)
          console.log(this.data)
      } else {
      
        this.messageService.clear();
        this.messageService.add({
          key: 't-err', severity: 'warn',
          summary: 'Warning Message', detail: 'No records been found'
        });
      }
    }, (err: HttpErrorResponse) => {
      if (err.status === 0 || err.status === 400) {
        this.messageService.clear();
        this.messageService.add({
          key: 't-err', severity: 'error',
          summary: 'Error Message', detail: 'Please Contact Administrator!'
        });
      }
    })
  }

onsrno() {
    this.data = [];
console.log('Entered in to srno');    
    this.restApiService.get(PathConstants.regionmastersrnoget).subscribe(res => {
      if (res.length !== 0) {
          this.data = res;
          console.log("DATA",res);
          this.regioncode= 'R' + '0'+ this.data[0].NewRegioncode;
          console.log("DATA1",res[0].NewRegioncode);
         } else {
    
        this.messageService.clear();
        this.messageService.add({
          key: 't-err', severity: 'warn',
          summary: 'Warning Message', detail: 'No records been found'
        });
      }
    }, (err: HttpErrorResponse) => {
      if (err.status === 0 || err.status === 400) {
        this.messageService.clear();
        this.messageService.add({
          key: 't-err', severity: 'error',
          summary: 'Error Message', detail: 'Please Contact Administrator!'
        });
      }
    })
  }


 

  onClear(form: NgForm) {
    form.reset();
    form.form.markAsUntouched();
    form.form.markAsPristine();
    this.data = [];
  }
}
