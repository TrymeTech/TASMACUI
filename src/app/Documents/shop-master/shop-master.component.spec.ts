import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { shopmasterComponent } from './shop-master.component';

describe('ShopMasterComponent', () => {
  let component: shopmasterComponent;
  let fixture: ComponentFixture<shopmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ shopmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(shopmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
