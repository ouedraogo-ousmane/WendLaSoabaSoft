import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BilanRecetteComponent } from './bilan-recette.component';

describe('BilanRecetteComponent', () => {
  let component: BilanRecetteComponent;
  let fixture: ComponentFixture<BilanRecetteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BilanRecetteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BilanRecetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
