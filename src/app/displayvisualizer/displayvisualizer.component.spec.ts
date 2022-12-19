import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayvisualizerComponent } from './displayvisualizer.component';

describe('DisplayvisualizerComponent', () => {
  let component: DisplayvisualizerComponent;
  let fixture: ComponentFixture<DisplayvisualizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayvisualizerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayvisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
