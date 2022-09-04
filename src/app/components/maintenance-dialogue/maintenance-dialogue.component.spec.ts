import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceDialogueComponent } from './maintenance-dialogue.component';

describe('MaintenanceDialogueComponent', () => {
  let component: MaintenanceDialogueComponent;
  let fixture: ComponentFixture<MaintenanceDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintenanceDialogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
