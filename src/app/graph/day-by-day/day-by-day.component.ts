import { Component, Input, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConsommationROW } from 'src/app/model/ConsommationROW';
import { AppEvent, DataModelService } from 'src/app/services/data-model.service';

@Component({
  selector: 'app-day-by-day',
  templateUrl: './day-by-day.component.html',
  styleUrls: ['./day-by-day.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class DayByDayComponent implements OnInit {

  _key: string;
  @Input() set key(value: string) {
    this._key = value
  }

  get key() {
    return this._key;
  }



  private destroySubject = new Subject<void>();

  private avgConso: ConsommationROW[] = [];
  private selfConso: ConsommationROW[] = [];

  consoTotal: number;
  avgConsoTotal: number
  diffRate: number;


  currentDate: Date;
  dateStart: Date;
  dateEnd: Date;

  firstInstance = true;

  constructor(private dataModel: DataModelService,
    private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.dataModel.getEvent().pipe(
      takeUntil(this.destroySubject)
    ).subscribe(
      (event: AppEvent) => {
        this.avgConso = this.dataModel.getAvgConso();
        this.selfConso = this.dataModel.getSelfConso();

        this.updateComponent();
      }
    )
    this.avgConso = this.dataModel.getAvgConso();
    this.selfConso = this.dataModel.getSelfConso();
    if (this.avgConso && this.selfConso){
      this.updateComponent();
    }
  }

  updateComponent() {
    if (this.firstInstance) {
      const date = this.dataModel.getDate();
      if (date) {
        this.currentDate = new Date(date.dateEnd.valueOf());
        this.dateStart = date.dateStart;
        this.dateEnd = date.dateEnd;
        this.firstInstance = false;
      }
    }
    let totAVG = 0;
    const avgConso = this.avgConso.find(day => day.date.valueOf() == this.currentDate.valueOf());
    if (avgConso){
      totAVG += avgConso.property[this._key];
    }

    let totSELF = 0;
    const selfConso = this.selfConso.find(day => day.date.valueOf() == this.currentDate.valueOf());
    if(selfConso){
      totSELF += selfConso.property[this._key];
    }

    const diff = (totSELF - totAVG) / 100;
    this.diffRate = diff;
    this.consoTotal = totSELF;
    this.avgConsoTotal = totAVG;
    this.changeDetector.detectChanges();
  }

  minusDay(){
    const newDate = new Date(this.currentDate.valueOf());
    newDate.setDate(newDate.getDate()-1);
    this.dateChanged(newDate);
  }
  plusDay(){
    const newDate = new Date(this.currentDate.valueOf());
    newDate.setDate(newDate.getDate()+1);
    this.dateChanged(newDate);
  }
  dateChanged($event){
    if($event.value){
      this.currentDate = $event.value;
      this.currentDate.setHours(this.avgConso[0].date.getHours());
    }else{
      this.currentDate = $event;
    }
    this.updateComponent();
    this.changeDetector.detectChanges();
  }
  isLastDay(){
    return this.currentDate?.valueOf() == this.dataModel.getDate()?.dateEnd?.valueOf();
  }

  isFirstDay(){
    return this.currentDate?.valueOf() == this.dataModel.getDate()?.dateStart?.valueOf();
  }
}
