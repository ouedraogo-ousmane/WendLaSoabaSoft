import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdreMissionComponent } from './ordre-mission.component';

describe('OrdreMissionComponent', () => {
  let component: OrdreMissionComponent;
  let fixture: ComponentFixture<OrdreMissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdreMissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdreMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
