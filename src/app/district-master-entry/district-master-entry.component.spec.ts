import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictMasterEntryComponent } from './district-master-entry.component';

describe('DistrictMasterEntryComponent', () => {
  let component: DistrictMasterEntryComponent;
  let fixture: ComponentFixture<DistrictMasterEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistrictMasterEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictMasterEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
