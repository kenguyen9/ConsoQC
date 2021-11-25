import { ConsommationROW } from './../../model/ConsommationROW';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { DataModelService } from 'src/app/services/data-model.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-metrics-compare',
  templateUrl: './metrics-compare.component.html',
  styleUrls: ['./metrics-compare.component.scss']
})
export class MetricsCompareComponent implements OnInit, OnDestroy {

  constructor(private dataModel: DataModelService) { }


  _key: string;



  @Input() set key(value: any) {
    this._key = value
    this.updateComponent();
  }

  get key() {
    return this._key;
  }

  private avgConso: ConsommationROW[] = [];
  private selfConso: ConsommationROW[] = [];

  private destroySubject = new Subject<void>();

  tabsGroup: { [key: string]: string } = {}

  diffConsoRate: {[key: string]: number} = {};

  ngOnInit(): void {
    this.tabsGroup = this.dataModel.tabsGroup;

    this.dataModel.getEvent().pipe(
      takeUntil(this.destroySubject)
    ).subscribe(
      () => {
        this.tabsGroup = this.dataModel.tabsGroup;
        this.refreshData();
        this.updateComponent();
      }
    )
  }

  ngOnDestroy() {
    this.destroySubject.next();
    this.destroySubject.complete();
  }

  refreshData() {
    this.avgConso = this.dataModel.getAvgConso();
    this.selfConso = this.dataModel.getSelfConso();
  }

  updateComponent() {
    let keys = Object.keys(this.tabsGroup)
    for (const key of keys){
      let totAVG = 0;
      for (const day of this.avgConso){
        totAVG += day.property[key];
      }

      let totSELF = 0;
      for (const day of this.selfConso){
        totSELF += day.property[key];
      }

      const diff = (totSELF-totAVG)/100;
      this.diffConsoRate[key] = diff;
    }

  }

}
