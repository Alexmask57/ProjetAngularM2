import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPersonnageComponent } from './card-personnage.component';

describe('CardPersonnageComponent', () => {
  let component: CardPersonnageComponent;
  let fixture: ComponentFixture<CardPersonnageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardPersonnageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPersonnageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
