import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleBoulderComponent } from './single-boulder.component';

describe('SingleBoulderComponent', () => {
  let component: SingleBoulderComponent;
  let fixture: ComponentFixture<SingleBoulderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleBoulderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleBoulderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
