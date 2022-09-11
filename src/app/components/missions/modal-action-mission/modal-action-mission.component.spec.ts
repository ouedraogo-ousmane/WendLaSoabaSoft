import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalActionMissionComponent } from './modal-action-mission.component';

describe('ModalActionMissionComponent', () => {
  let component: ModalActionMissionComponent;
  let fixture: ComponentFixture<ModalActionMissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalActionMissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalActionMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
