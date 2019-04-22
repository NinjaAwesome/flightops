import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHandlerComponent } from './new-handler.component';

describe('NewHandlerComponent', () => {
  let component: NewHandlerComponent;
  let fixture: ComponentFixture<NewHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewHandlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
