import { ConsommationROW } from './../model/ConsommationROW';
import { Injectable } from '@angular/core';
import { forkJoin, Subject } from 'rxjs';
import { ConsoQCApiAWSService } from './conso-qc-api-aws.service';

export interface TabGroup {
  title: string;
  key: string;
}

export enum EventType {
  DATE_CHANGED = 'DATE_CHANGED',
  DATA_CHANGED = 'DATA_CHANGED'
}
export interface AppEvent {
  data: any,
  event: EventType
}
@Injectable({
  providedIn: 'root'
})
export class DataModelService {

  tabsGroup: { [key: string]: string } = {
    'global': 'Global',
    'electromenager': 'Electroménager',
    'chauffageLocaux': 'Chauffage des pièces',
    'chauffageEaux': 'Chauffage de l\'eau',
    'climatisation': 'Climatisation',
    'eclairage': 'Eclairage'
  }

  constructor(private apiConsoQC: ConsoQCApiAWSService) { }

  private _avgConso: ConsommationROW[];
  private _selfConso: ConsommationROW[];

  private _dateStart: Date = new Date();
  private _dateEnd: Date = new Date();

  private eventEmitter = new Subject<any>();

  refreshData() {
    forkJoin([this.apiConsoQC.getAVGConso(), this.apiConsoQC.getClientConso()]).subscribe(
      (res) => {
        this.setAvgConso(res[0]);
        this.setSelfConso(res[1]);
        this.computeStartEndDate();
        this.fireEvent({
          event: EventType.DATA_CHANGED,
          data: {
            avg: this.getAvgConso(),
            self: this.getSelfConso()
          }
        });
      }
    )
  }

  public getEvent() {
    return this.eventEmitter.asObservable();
  }

  private fireEvent(event: AppEvent) {
    this.eventEmitter.next(event);
  }

  setAvgConso(values: ConsommationROW[]) {
    this._avgConso = values;
  }
  setSelfConso(values: ConsommationROW[]) {
    this._selfConso = values;
  }

  setDate(dateStart?: Date, dateEnd?: Date) {
    if (dateStart) {
      this._dateStart = dateStart;
    }
    if (dateEnd) {
      this._dateEnd = dateEnd;
    }
    this.fireEvent({
      event: EventType.DATE_CHANGED,
      data: {
        dateStart: this._dateStart,
        dateEnd: this._dateEnd
      }
    })
  }
  getDate() {
    return { dateStart: this._dateStart, dateEnd: this._dateEnd };
  }
  computeStartEndDate() {
    const rows = this._avgConso;
    if (rows.length > 0) {
      let dateStart: Date = rows[0].date;
      let dateEnd: Date = rows[0].date;
      for (const day of rows) {
        if (day.date.valueOf() > dateEnd.valueOf()) {
          dateEnd = day.date;
        }
        if (day.date.valueOf() < dateStart.valueOf()) {
          dateStart = day.date;
        }
      }
      this.setDate(dateStart, dateEnd);
    }
  }
  getAvgConso() {
    let retValue: ConsommationROW[] = [];
    retValue = this._avgConso.filter(day => {
      return (day.date.valueOf() >= this._dateStart.valueOf()) && (day.date.valueOf() <= this._dateEnd.valueOf())
    })
    return retValue;
  }
  getSelfConso() {
    let retValue: ConsommationROW[] = [];
    retValue = this._selfConso.filter(day => {
      return (day.date.valueOf() >= this._dateStart.valueOf()) && (day.date.valueOf() <= this._dateEnd.valueOf())
    })
    return retValue;
  }

}
