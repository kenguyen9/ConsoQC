import { GraphModel } from './../../model/GraphModel';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {


  @Input('ChartModel') model: GraphModel;

  constructor() { }

  ngOnInit(): void {
  }

}
