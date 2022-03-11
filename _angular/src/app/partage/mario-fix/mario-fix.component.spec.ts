import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarioFixComponent } from './mario-fix.component';

describe('MarioFixComponent', () => {
  let component: MarioFixComponent;
  let fixture: ComponentFixture<MarioFixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarioFixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarioFixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
