import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionMasterEntryComponent } from './region-master-entry.component';

describe('RegionMasterEntryComponent', () => {
  let component: RegionMasterEntryComponent;
  let fixture: ComponentFixture<RegionMasterEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionMasterEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionMasterEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
