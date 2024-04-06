import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogedinnavComponent } from './logedinnav.component';

describe('LogedinnavComponent', () => {
  let component: LogedinnavComponent;
  let fixture: ComponentFixture<LogedinnavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogedinnavComponent]
    });
    fixture = TestBed.createComponent(LogedinnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
