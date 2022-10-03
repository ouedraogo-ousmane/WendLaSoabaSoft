import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeChauffeurComponent } from './liste-chauffeur.component';

describe('ListeChauffeurComponent', () => {
  let component: ListeChauffeurComponent;
  let fixture: ComponentFixture<ListeChauffeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeChauffeurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeChauffeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
