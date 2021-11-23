import { GraphModel } from './../model/GraphModel';
import { ConsommationROW } from './../model/ConsommationROW';
import { ConsoQCApiAWSService } from './../services/conso-qc-api-aws.service';
import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';

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
    this.apiConsoQC.getAVGConso().subscribe(
      (res) => {
        /*
 chartOption: EChartsOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
      },
    ],
  };*/


        const keys = Object.keys(res[0]);
        keys.push('global');
        let dataX = [];
        for (const key of keys) {

          let dataY = []

          for (let day of res) {
            if (key == 'global') {
              dataY.push(day.computeTotal());
              dataX.push(day.toDateString());
            } else {
              dataY.push(day[key]);
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
                data: dataY
              }
            ]
          };

        }
      }
    )
  }

}
