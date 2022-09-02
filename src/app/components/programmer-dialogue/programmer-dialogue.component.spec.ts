import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammerDialogueComponent } from './programmer-dialogue.component';

describe('ProgrammerDialogueComponent', () => {
  let component: ProgrammerDialogueComponent;
  let fixture: ComponentFixture<ProgrammerDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgrammerDialogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgrammerDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
