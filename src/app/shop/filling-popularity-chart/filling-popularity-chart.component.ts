import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-filling-popularity-chart',
  templateUrl: './filling-popularity-chart.component.html',
  styleUrls: ['./filling-popularity-chart.component.scss']
})
export class FillingPopularityChartComponent implements OnChanges {
  @Input() fillingData: {[key: string]: number} = {};

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        min: 0
      }
    },
    plugins: {
      legend: {
        display: true,
      }
    }
  };
  public barChartLabels: string[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Filling Popularity' }
    ]
  };

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['fillingData'] && this.fillingData) {
      this.barChartLabels = Object.keys(this.fillingData);
      this.barChartData.labels = this.barChartLabels;
      this.barChartData.datasets[0].data = Object.values(this.fillingData);
    }
  }
}
