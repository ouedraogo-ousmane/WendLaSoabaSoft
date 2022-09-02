import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BilanDepenseComponent } from './bilan-depense.component';

describe('BilanDepenseComponent', () => {
  let component: BilanDepenseComponent;
  let fixture: ComponentFixture<BilanDepenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BilanDepenseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BilanDepenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
