import { ConsommationROW } from './../model/ConsommationROW';
import { Injectable } from '@angular/core';
import { forkJoin, Subject } from 'rxjs';
import { ConsoQCApiAWSService } from './conso-qc-api-aws.service';

export interface TabGroup {
  title: string;
  key: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataModelService {

  tabsGroup: {[key: string]: string} = {
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

  private eventEmitter = new Subject<any>();

  refreshData(){
    forkJoin([this.apiConsoQC.getAVGConso(), this.apiConsoQC.getClientConso()]).subscribe(
      (res) => {
        console.log(res[0].length, res[1].length)
        this.setAvgConso(res[0]);
        this.setSelfConso(res[1]);
        this.fireEvent();
      }
    )
  }

  public getEvent(){
    return this.eventEmitter.asObservable();
  }

  private fireEvent(){
    this.eventEmitter.next();
  }

  setAvgConso(values: ConsommationROW[]){
    this._avgConso = values;
  }
  setSelfConso(values: ConsommationROW[]){
    this._selfConso = values;
  }

  getAvgConso(){
    return this._avgConso;
  }
  getSelfConso(){
    return this._selfConso;
  }

}
