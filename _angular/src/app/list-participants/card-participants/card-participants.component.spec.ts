import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardParticipantsComponent } from './card-participants.component';

describe('CardParticipantsComponent', () => {
  let component: CardParticipantsComponent;
  let fixture: ComponentFixture<CardParticipantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardParticipantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
