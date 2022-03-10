import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCombatComponent } from './detail-combat.component';

describe('DetailCombatComponent', () => {
  let component: DetailCombatComponent;
  let fixture: ComponentFixture<DetailCombatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailCombatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailCombatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
