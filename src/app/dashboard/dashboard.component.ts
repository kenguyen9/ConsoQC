import { GraphModel } from './../model/GraphModel';
import { ConsommationROW } from './../model/ConsommationROW';
import { ConsoQCApiAWSService } from './../services/conso-qc-api-aws.service';
import { Component, OnInit } from '@angular/core';

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


  allData: { [id: string]: GraphModel } = {};

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
        let total = {
          name: "Globale",
          series: []
        }
        for (let day of res) {
          total.series.push({ value: day.computeTotal(), name: day.toDateString() })
        }
        this.allData['global'] = { data: [total], height: 250, width: 1000, xLabel: 'Journée', yLabel: 'Consommation moyenne' };
        const keys = Object.keys(res[0]);
        for (const key of keys) {
          let keyTotal = {
            name: key,
            series: []
          };
          for (let day of res) {
            keyTotal.series.push({ value: day[key], name: day.toDateString() })
          }
          this.allData[key] = { data: [keyTotal], height: 250, width: 1000, xLabel: 'Journée', yLabel: 'Consommation moyenne' };
        }
      }
    )
  }

}
