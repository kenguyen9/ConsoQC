import { GraphModel } from './../../model/GraphModel';
import { Component, Input, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {


  @Input('ChartModel') model: EChartsOption;

  constructor() { }

  ngOnInit(): void {
  }



}
