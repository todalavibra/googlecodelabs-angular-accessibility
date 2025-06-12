import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgChartsModule } from 'ng2-charts';
import { FillingPopularityChartComponent } from './filling-popularity-chart.component';

describe('FillingPopularityChartComponent', () => {
  let component: FillingPopularityChartComponent;
  let fixture: ComponentFixture<FillingPopularityChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FillingPopularityChartComponent ],
      imports: [ NgChartsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FillingPopularityChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create chart when fillingData is provided', () => {
    component.fillingData = {'Test Filling 1': 5, 'Test Filling 2': 10};
    component.ngOnChanges({
      fillingData: {
        currentValue: component.fillingData,
        previousValue: {},
        firstChange: true,
        isFirstChange: () => true
      }
    });
    fixture.detectChanges();
    const chartCanvas = fixture.nativeElement.querySelector('canvas');
    expect(chartCanvas).toBeTruthy();
  });

  it('should populate barChartLabels and barChartData correctly', () => {
    const testData = {'Test Filling 1': 5, 'Test Filling 2': 10};
    component.fillingData = testData;
    component.ngOnChanges({
      fillingData: {
        currentValue: component.fillingData,
        previousValue: {},
        firstChange: true,
        isFirstChange: () => true
      }
    });
    fixture.detectChanges();

    expect(component.barChartLabels).toEqual(['Test Filling 1', 'Test Filling 2']);
    expect(component.barChartData.labels).toEqual(['Test Filling 1', 'Test Filling 2']);
    expect(component.barChartData.datasets[0].data).toEqual([5, 10]);
  });

  it('should update chart when fillingData changes', () => {
    component.fillingData = {'Test Filling 1': 5};
    component.ngOnChanges({
      fillingData: {
        currentValue: component.fillingData,
        previousValue: {},
        firstChange: true,
        isFirstChange: () => true
      }
    });
    fixture.detectChanges();

    expect(component.barChartLabels).toEqual(['Test Filling 1']);
    expect(component.barChartData.datasets[0].data).toEqual([5]);

    component.fillingData = {'Test Filling 2': 10, 'Test Filling 3': 12};
    component.ngOnChanges({
      fillingData: {
        currentValue: component.fillingData,
        previousValue: {'Test Filling 1': 5},
        firstChange: false,
        isFirstChange: () => false
      }
    });
    fixture.detectChanges();

    expect(component.barChartLabels).toEqual(['Test Filling 2', 'Test Filling 3']);
    expect(component.barChartData.datasets[0].data).toEqual([10, 12]);
  });
});
