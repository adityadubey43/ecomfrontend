import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmpayentComponent } from './confirmpayent.component';

describe('ConfirmpayentComponent', () => {
  let component: ConfirmpayentComponent;
  let fixture: ComponentFixture<ConfirmpayentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmpayentComponent]
    });
    fixture = TestBed.createComponent(ConfirmpayentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
