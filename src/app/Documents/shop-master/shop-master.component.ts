import { Component, OnInit,ViewChild } from '@angular/core';
import { SelectItem,MenuItem, MessageService } from 'primeng/api';
import { RestAPIService } from '../../services/restAPI.service';
import { AuthService } from '../../services/auth.service';
import { DatePipe } from '@angular/common';
import { MasterDataService } from '../../masters-services/master-data.service';
import { PathConstants } from '../../helper/PathConstants';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Table } from 'primeng/table';
//import { MessageService, MenuItem } from 'primeng/api';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import * as internal from 'assert';
import { TheftFormComponent } from '../theft-form/theft-form.component';

@Component({
  selector: 'shop-master-form',
  templateUrl: './shop-master.component.html',
  styleUrls: ['./shop-master.component.css']
})
export class shopmasterComponent implements OnInit {
  
 // shopOptions: SelectItem[];
 sno:any;
  // shopno: any;
  regionOptions: SelectItem[];
  rcode: any;
  districtsData : any=[];
  districtOptions: SelectItem[];
  dcode: any;
  user: any;
  address:any;
  shopmasterCols: any;
  shopmaster:any;
  shopmasterdata: any =[];
  shopaddress:any;
  shopincharge:any;
  regionsData : any=[];
  isSaved: boolean;
  excelFileName: string;
  items: MenuItem[];
  @ViewChild('dt', { static: false }) table: Table;
  loading: boolean;
  CONTACTNO:any;
  installation_status:any;
  isActive:any;
  // installationstatus: boolean;
  SHOPADDRESS: any;
  Shopno: any;
  camstatus: boolean =false;
  slno : number=0;
  // isDuplicate: boolean = false;

  constructor(private restApiService: RestAPIService, private datepipe: DatePipe,
    private messageService: MessageService, private masterDataService: MasterDataService,
    private authService: AuthService) { }

    // onVerify() {
    //   this.shopmasterdata.forEach( i => {
    //     if(i.shopno  === this.Shopno ) {
    //       alert('This shop code already exists, please enter new code');
    //         this.Shopno = null;
    //         console.log("Duplicate shop code:", this.Shopno);
    //     }
    //   })
    // }

  
  ngOnInit() {
    this.user = JSON.parse(this.authService.getCredentials()).user;
    

   console.info(this.user);
   console.info(this.rcode);
   console.info(this.sno);
    this.regionsData = this.masterDataService.getRegions();
    this.districtsData = this.masterDataService.getDistricts();
    console.info(this.user.value);
    // this.items = [
    //   {
    //     label: 'Excel', icon: 'pi pi-file-excel', command: () => {
    //       this.table.exportCSV();
    //     }
    //   }
    // ];
    this.shopmasterCols = [
      {field :'sno', header : 'S.no'},
      {field :'regnname', header : 'Region'},
      {field :'dcode', header : 'Dcode'},
      {field :'district',header : 'District'},
      {field :'shopno',header : 'Shopcode'},
      {field :'shopaddress',header: 'Address'},
      {field :'shopincharge',header: 'Supervisor Name'},
      {field : 'contactno',header:'Supervisor Contactno'},
      {field : 'installation_status',header:'Camera Installed Status'},
      {field : 'isActive',header:'Shop Active Status'}
    ];
  }

  assignDefaultValues() {
    this.isSaved = false;
    this.shopmasterdata = [];  
    
   
     }

  onSelect(type) {
    let regionSelection = [];
    let districtSeletion = [];
    console.info(this.user);
   console.info(this.rcode);
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
          this.regionOptions.unshift({ label: 'All', value: 'All' });
          // this.regionOptions.unshift({ label: '-select-', value: null });
         
        }
        break;
      case 'DM':
        if (this.districtsData.length !== 0) {
          this.districtsData.forEach(d => {
            // if (d.code.value === this.user.code) {
              if (d.rcode===this.rcode.value) 
             // if (this.rcode.value === d.rcode) 
              {
               // console.log('rcode',1)
              districtSeletion.push({ label: d.name, value: d.code, address: d.address});
            }
          })
          this.districtOptions = districtSeletion;
          this.districtOptions.unshift({ label: 'All', value: 'All' });
          // this.districtOptions.unshift({ label: '-select-', value: null });

        }
        break;
      
    }
    
  }

   onResetFields(field) {
     if (field === 'RM') {
       this.dcode = null;
       this.address = (this.rcode !== undefined && this.rcode !== null) ? this.rcode.address : null;
     } else if (field === 'DM') {
      // this.shopNo = null;
       this.address = (this.dcode !== undefined && this.dcode !== null) ? this.dcode.address : null;
     //} else if (field === 'SH') {
       //this.address = (this.shopcode !== undefined && this.shopNo !== null) ? this.shopNo.address : null;
     }
   }

  onSave(form: NgForm) {
    
    const params = {
          
      'DCODE':this.dcode.value,
      'DISTRICT':this.dcode.label,

      'SHOPNO':this.Shopno,
      'SHOPADDRESS':this.SHOPADDRESS,
      'SHOPINCHARGE':this.shopincharge,
      'CONTACTNO':this.CONTACTNO,
      'installation_status':this.installation_status,
      'isActive':this.isActive,
     
    }
    // if (this.dcode.label==='All' && this.rcode.label==='All'){
      
    //   this.isSaved = false
    // }
    // else if (this.dcode.label==='All' || this.rcode.label==='All'){
      
    //   this.isSaved = false
    // }
    // else
    {
      if (this.dcode.value=='All' || this.rcode.value=='All'){
        this.isSaved=false
        //console.info("Wrong Data");
        alert('Please select values for both dropdowns before clicking the button.');
      }
      else {
        this.isSaved = true
      console.log('enter', params)
    this.restApiService.post(PathConstants.shopmasterdetailspost, params).subscribe(res => {
     if (res) {
    //  if (res.shopmasterdata) {
    if (res.item2){
       this.onClear(form);
        this.messageService.clear();
        this.messageService.add({
          key: 't-err', severity: 'success',
          summary: 'Success Message', detail: 'Saved Successfully !'
        });
      } else {
        this.isSaved = false;
        //this.blockScreen = false;
        this.messageService.clear();
        this.messageService.add({
          key: 't-err', severity: 'error',
          summary: 'Error Message', detail: res.item2
        });
      }
    } 
     (err: HttpErrorResponse) => {
      //this.isSaved = false;
      //this.blockScreen = false;
      if (err.status === 0 || err.status === 400) {
        this.messageService.clear();
        this.messageService.add({
          key: 't-err', severity: 'error',
          summary: 'Error Message', detail: 'Please Contact Administrator!'
        });
      }
    }
    })
  }
    }
  }
  
  
  Getshopdetails(){
    this.shopmasterdata = [];
    // this.onCheck();
    console.log('data', this.shopmasterdata)
      const params={
        rcode:this.rcode.value,
        dcode: this.dcode.value,
       
      }
      console.log(this.dcode.value)
      console.log(this.dcode);
      console.log(this.rcode.value);
      
      this.restApiService.getByParameters(PathConstants.shopmasterdetailsget, params).subscribe(res => {
      this.shopmasterdata = res;

      let sno = 1;
      this.shopmasterdata.forEach(t => {
        t.sno = sno;
        sno += 1;
      })


      // this.loading = false;
      //   this.excelFileName = this.shopmaster.label + ' TICKET_REPORT ' + this.datepipe.transform(new Date(), 'dd-MM-yyyy hh:mm a');
    }
      );
      
  }
  
  private updateButtonDisabledState() {
    // Check if both dropdowns have selected values
    if (this.rcode && this.dcode && this.rcode.value !== null && this.dcode.value !== null) {
      // Enable the button
      this.isSaved = false;
    } else {
      // Disable the button
      this.isSaved = true;
    }
  }


  onRowSelect(row, index, form: NgForm) {
    this.updateButtonDisabledState();
    if (row !== undefined && row !== null ) {
    console.log('TEsting');
       //this.rcode = { label: row.regnname, value: row.rcode };
       this.regionOptions = [{ label: row.regnname, value: row.rcode }];
       this.districtOptions = [{ label: row.district, value: row.dcode}];
       this.dcode = { label: row.district, value: row.dcode };
      this.SHOPADDRESS=row.shopaddress;
      // console.log("installation Status",row.installation_status);
       this.installation_status = (row.installation_status === 'Installed') ? 1 : 0;
      this.isActive = (row.isActive === 'Open') ? 1 : 0;
      this.CONTACTNO=row.contactno; 
      this.shopincharge=row.shopincharge;
      this.Shopno=row.shopno;
       this.slno=row.sno;
      
    }
  }

 
  onClear(form: NgForm) {
    form.reset();
    form.form.markAsUntouched();
    form.form.markAsPristine();
    this.assignDefaultValues();
    this.districtOptions = [];
    this.regionOptions = [];
  }
  // onSam(){

  // }
}
