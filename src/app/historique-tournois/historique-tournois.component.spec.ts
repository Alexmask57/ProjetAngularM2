import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueTournoisComponent } from './historique-tournois.component';

describe('HistoriqueTournoisComponent', () => {
  let component: HistoriqueTournoisComponent;
  let fixture: ComponentFixture<HistoriqueTournoisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriqueTournoisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueTournoisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
