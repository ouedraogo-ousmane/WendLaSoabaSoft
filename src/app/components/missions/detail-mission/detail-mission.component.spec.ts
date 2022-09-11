import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMissionComponent } from './detail-mission.component';

describe('DetailMissionComponent', () => {
  let component: DetailMissionComponent;
  let fixture: ComponentFixture<DetailMissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailMissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
