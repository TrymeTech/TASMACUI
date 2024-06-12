import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { RestAPIService } from '../services/restAPI.service';
import { MasterDataService } from '../masters-services/master-data.service';
import { PathConstants } from '../helper/PathConstants';

@Component({
  selector: 'app-district-master-entry',
  templateUrl: './district-master-entry.component.html',
  styleUrls: ['./district-master-entry.component.css']
})
export class DistrictMasterEntryComponent implements OnInit {
   dcode:any;
   districtname:any;
   rcode:any;
   rname: any;
   regionOptions: SelectItem[];
  Address:any;
  roleid:any;
  districtmasterentryCols:any =[];
  isSaved: boolean;
  data:any = [];
  districtmasterentryData: any; 
  distmaster_Id:any;
  regionsData : any=[];
  user: any;
  slno : number=0;

  constructor(private restApiService: RestAPIService, private datepipe: DatePipe,
    private messageService: MessageService, private masterDataService: MasterDataService,
    private authService: AuthService) { }
    
  ngOnInit() {
    this.ondistsrno();
    this.onView();
    
    this.user = JSON.parse(this.authService.getCredentials()).user;
  //  this.onsrno();
  
    this.regionsData = this.masterDataService.getRegions();
    this.districtmasterentryCols = [
      { field: 'dcode', header: 'District Code',},
      { field: 'Dname', header: 'District Name' },
       { field: 'Rcode', header: 'Region Code' },
       { field: 'REGNNAME', header: 'Region Name' },
      { field: 'address' , header: 'Address' },
    ]
  }

  assignDefaultValues() {
    this.isSaved = false;
    this.rcode = null;
    this.regionOptions = null;
    this.dcode = null;
    this.Address = null;
  }

    onRowSelect(row, index, form: NgForm) {
      if (row !== undefined && row !== null) {
        this.dcode=row.dcode,
        this.districtname=row.Dname,
        this.Address=row.address;
        //this.rcode = row.Rcode;
         //this.rname=row.REGNNAME;
      //console.log ('test', this.rcode, this.rname)
      this.regionOptions = [{ label: row.REGNNAME, value: row.Rcode }];
      // this.rcode = { label: row.REGNNAME, value: row.Rcode };
      this.rcode = row.Rcode;
      }
  }


  onSelect(type) {
    let regionSelection = [];
    let districtSeletion = [];
  
    switch (type) {
      case 'RM':
        if (this.regionsData.length !== 0) {
          if (this.user.RoleId === 3 || this.user.RoleId === 4) {
            this.regionsData.forEach(r => {
              if (r.code === this.user.code) {
                 regionSelection.push({ label: r.name, value: r.code, address: r.address });
              }
            })
          } else {
            this.regionsData.forEach(r => {
              regionSelection.push({ label: r.name, value: r.code, address: r.address });
            })
          }
          this.regionOptions = regionSelection;
          this.regionOptions.unshift({ label: '-select-', value: null });
         
        }
        break;
      
    }
    
  }

  onResetFields(field) {
    if (field === 'RM') {
      // this.dcode = null;
      console.log('rcode1', this.rcode)
      this.rcode = this.rname.value;
      console.log('rcode2', this.rcode)
    }
    else {
      this.rcode=null;
    }
   
  }

  onView() {
    this.data = [];
    this.restApiService.get(PathConstants.districtmasterentryGet).subscribe(res => {
      if (res.length !== 0) {
          this.data = res
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

  ondistsrno() {
    this.data = [];
console.log('Entered in to district srno');    
    this.restApiService.get(PathConstants.districtmastersrnoget).subscribe(res => {
      if (res.length !== 0) {
          this.data = res;
          console.log("DATA",res);
          this.dcode= 'D' + '00'+ this.data[0].Newdistrictcode;
          console.log("DATA1",res[0].Newdistrictcode);
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


  onSave() {
    const params = {
    
      'Dcode':this.dcode,
      //'Rcode': this.rcode.value,
      'Rcode': this.rname.value,
      'Dname': this.districtname,
      'Address'  : this.Address,
    }
    this.restApiService.post(PathConstants.Insertdistrictmasterpost, params).subscribe(res => {
      console.log('item1',res.item1)
       if (res.item1) {
        this.onView();
         this.messageService.clear();
         
         this.messageService.add({
           key: 't-err', severity: 'success',
           summary: 'Success Message', detail: 'Ticket Saved Successfully !'
         });
       } else {
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
}
  

  onClear(form: NgForm) {
    form.reset();
    form.form.markAsUntouched();
    form.form.markAsPristine();
    
    // this.regionsData=[];
    // this.data = [];
    this.assignDefaultValues();
  }
}
