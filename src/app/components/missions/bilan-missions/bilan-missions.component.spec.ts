import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BilanMissionsComponent } from './bilan-missions.component';

describe('BilanMissionsComponent', () => {
  let component: BilanMissionsComponent;
  let fixture: ComponentFixture<BilanMissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BilanMissionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BilanMissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
