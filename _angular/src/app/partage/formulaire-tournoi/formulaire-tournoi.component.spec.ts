import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireTournoiComponent } from './formulaire-tournoi.component';

describe('FormulaireTournoiComponent', () => {
  let component: FormulaireTournoiComponent;
  let fixture: ComponentFixture<FormulaireTournoiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulaireTournoiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaireTournoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
