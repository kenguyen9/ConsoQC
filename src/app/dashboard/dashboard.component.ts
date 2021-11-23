import { GraphModel } from './../model/GraphModel';
import { ConsommationROW } from './../model/ConsommationROW';
import { ConsoQCApiAWSService } from './../services/conso-qc-api-aws.service';
import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { forkJoin } from 'rxjs';

interface TabGroup {
  title: string;
  key: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private apiConsoQC: ConsoQCApiAWSService) { }


  allData: { [id: string]: EChartsOption } = {};

  tabsGroup: TabGroup[] = [
    {
      title: 'Global',
      key: 'global'
    },
    {
      title: 'Electroménager',
      key: 'electromenager'
    },
    {
      title: 'Chauffage des locaux',
      key: 'chauffageLocaux'
    },
    {
      title: 'Chauffage de l\'eau',
      key: 'chauffageEaux'
    },
    {
      title: 'Climatisation',
      key: 'climatisation'
    },
    {
      title: 'Eclairage',
      key: 'eclairage'
    }
  ]

  ngOnInit(): void {

    forkJoin([this.apiConsoQC.getAVGConso(), this.apiConsoQC.getClientConso()]).subscribe(
      (res) => {
        console.log(res[0].length, res[1].length)
        this.buildAVGConsoLineChart(res[0], res[1])
      }
    )
  }


  buildAVGConsoLineChart(resAVG: ConsommationROW[], resClient: ConsommationROW[]){
    const keys = Object.keys(resAVG[0]);
    keys.push('global');
    let dataX = [];
    for (let day of resAVG){
      dataX.push(day.toDateString());
    }
    for (const key of keys) {

      let dataYAVG = []
      let dataYClient = [];
      for (let day of resAVG) {
        if (key == 'global') {
          dataYAVG.push(day.computeTotal());
        } else {
          dataYAVG.push(day[key]);
        }
      }
      for (let day of resClient){
        if (key == 'global') {
          dataYClient.push(day.computeTotal());
        } else {
          dataYClient.push(day[key]);
        }
      }
     this.allData[key] = {
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
            name: key,
            data: dataYAVG,
            color:'#c23531'
          },
          {
            type: 'line',
            name: key,
            data: dataYClient,
            color:'#91c7ae'
          }
        ]
      };

    }
  }

}
