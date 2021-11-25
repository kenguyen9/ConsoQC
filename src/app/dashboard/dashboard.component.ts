import { AppEvent, DataModelService, EventType } from './../services/data-model.service';
import { GraphModel } from './../model/GraphModel';
import { ConsommationROW } from './../model/ConsommationROW';
import { ConsoQCApiAWSService } from './../services/conso-qc-api-aws.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  constructor(private dataModel: DataModelService) { }



  tabsGroup: { key: string, name: string }[] = [];

  private destroySubject = new Subject<void>();


  dateStart: Date;
  dateEnd: Date;

  firstInstance = true;
  initialStart: Date;
  initialEnd: Date;

  ngOnInit(): void {

    this.buildTabs();
    this.dataModel.refreshData();

    this.dataModel.getEvent().pipe(
      takeUntil(this.destroySubject)
    ).subscribe(
      (event: AppEvent) => {
        if (event.event == EventType.DATE_CHANGED){
          const data = event.data;
          if (this.firstInstance && data.dateStart && data.dateEnd){
            this.initialStart = data.dateStart;
            this.initialEnd = data.dateEnd;
            this.firstInstance = false;
          }
          this.dateStart = data.dateStart;
          this.dateEnd = data.dateEnd;
        }
      }
    )

  }

  ngOnDestroy() {
    this.destroySubject.next();
    this.destroySubject.complete();
  }


  setDateStart($event){
    this.dataModel.setDate($event.value, null);
  }
  setDateEnd($event){
    this.dataModel.setDate(null, $event.value);
  }

  resetDate(){
    this.dataModel.setDate(this.initialStart, this.initialEnd);
  }


  buildTabs() {
    this.tabsGroup = [];
    const dataTabsGroup = this.dataModel.tabsGroup;
    const keys = Object.keys(dataTabsGroup);
    for (const key of keys) {
      this.tabsGroup.push({ key, name: dataTabsGroup[key] })
    }
  }



}
