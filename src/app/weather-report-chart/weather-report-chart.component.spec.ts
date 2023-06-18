import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherReportChartComponent } from './weather-report-chart.component';

describe('WeatherReportChartComponent', () => {
  let component: WeatherReportChartComponent;
  let fixture: ComponentFixture<WeatherReportChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherReportChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherReportChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
