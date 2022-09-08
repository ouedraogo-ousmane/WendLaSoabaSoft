import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeExerciceComponent } from './liste-exercice.component';

describe('ListeExerciceComponent', () => {
  let component: ListeExerciceComponent;
  let fixture: ComponentFixture<ListeExerciceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeExerciceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeExerciceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
