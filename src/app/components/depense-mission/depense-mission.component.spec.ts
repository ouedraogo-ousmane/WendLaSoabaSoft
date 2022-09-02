import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepenseMissionComponent } from './depense-mission.component';

describe('DepenseMissionComponent', () => {
  let component: DepenseMissionComponent;
  let fixture: ComponentFixture<DepenseMissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepenseMissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepenseMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
