import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuBilanComponent } from './menu-bilan.component';

describe('MenuBilanComponent', () => {
  let component: MenuBilanComponent;
  let fixture: ComponentFixture<MenuBilanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuBilanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuBilanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
