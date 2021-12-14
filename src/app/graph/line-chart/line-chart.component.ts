import { ConsommationROW } from './../../model/ConsommationROW';
import { GraphModel } from './../../model/GraphModel';
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { Subject } from 'rxjs';
import { AppEvent, DataModelService } from 'src/app/services/data-model.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit, OnDestroy {


  _key: string;
  @Input() set key(value: string) {
    this._key = value
    this.buildChart();
  }

  get key() {
    return this._key;
  }

  chartOption: EChartsOption = {};

  private destroySubject = new Subject<void>();

  private avgConso: ConsommationROW[] = [];
  private selfConso: ConsommationROW[] = [];

  constructor(private dataModel: DataModelService) { }

  ngOnInit(): void {
    this.dataModel.getEvent().pipe(
      takeUntil(this.destroySubject)
    ).subscribe(
      (event: AppEvent) => {
        this.avgConso = this.dataModel.getAvgConso();
        this.selfConso = this.dataModel.getSelfConso();
        this.buildChart();
      }
    );
    this.avgConso = this.dataModel.getAvgConso();
    this.selfConso = this.dataModel.getSelfConso();
    if (this.avgConso && this.selfConso) {
      this.buildChart();
    }
  }

  ngOnDestroy() {
    this.destroySubject.next();
    this.destroySubject.complete();
  }





  buildChart() {
    if (this.avgConso?.length > 0 && this.selfConso?.length > 0) {
      let dataX = [];

      for (let day of this.avgConso) {
        dataX.push(day.date.toLocaleDateString());
      }


      let dataYAVG = []
      let dataYClient = [];

      for (let day of this.avgConso) {
        dataYAVG.push(day.property[this._key]);
      }
      for (let day of this.selfConso) {
        dataYClient.push(day.property[this._key]);
      }
      this.chartOption = {
        tooltip: {
          trigger: 'axis'
        },
        darkMode: true,
        xAxis: {
          type: 'category',
          data: dataX
        },
        yAxis: { type: 'value' },
        series: [
          {
            type: 'line',
            name: 'Moyenne région',
            data: dataYAVG,
            color: '#c23531'
          },
          {
            type: 'line',
            name: 'Ma consommation',
            data: dataYClient,
            color: '#91c7ae'
          }
        ]
      };
    }
  }



}
