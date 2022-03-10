import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayGateComponent } from './pay-gate.component';

describe('PayGateComponent', () => {
  let component: PayGateComponent;
  let fixture: ComponentFixture<PayGateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayGateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayGateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
