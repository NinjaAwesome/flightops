import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAirportComponent } from './new-airport.component';

describe('NewAirportComponent', () => {
  let component: NewAirportComponent;
  let fixture: ComponentFixture<NewAirportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAirportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAirportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
