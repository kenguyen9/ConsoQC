import { DataModelService } from './../services/data-model.service';
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



  tabsGroup: {key: string, name: string}[] = [];

  private destroySubject = new Subject<void>();

  ngOnInit(): void {

    this.buildTabs();
    this.dataModel.refreshData();
  }

  ngOnDestroy(){
    this.destroySubject.next();
    this.destroySubject.complete();
  }

  buildTabs(){
    this.tabsGroup = [];
    const dataTabsGroup = this.dataModel.tabsGroup;
    const keys = Object.keys(dataTabsGroup);
    for (const key of keys){
      this.tabsGroup.push({key, name: dataTabsGroup[key]})
    }
  }



}
