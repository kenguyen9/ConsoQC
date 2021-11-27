import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricsCompareComponent } from './metrics-compare.component';

describe('MetricsCompareComponent', () => {
  let component: MetricsCompareComponent;
  let fixture: ComponentFixture<MetricsCompareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetricsCompareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricsCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
