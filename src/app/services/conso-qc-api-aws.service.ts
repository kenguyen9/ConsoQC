import { ConsommationROW } from './../model/ConsommationROW';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class ConsoQCApiAWSService {

  private AWS_ENDPOINT = "https://0irt29jt8b.execute-api.us-east-2.amazonaws.com/RDSQuery_CONSOQC_GetAVGConso"
  constructor(private httpClient: HttpClient) { }

  getAVGConso(): Observable<ConsommationROW[]>{
    return this.httpClient.get<ConsommationAVGResult[]>(this.AWS_ENDPOINT).pipe(
      map((res) => {
        const retValue: ConsommationROW[] = [];
        for (const r of res){
          const keys = Object.keys(r);
          let consoRow = new ConsommationROW(0,0,0,0,0,new Date());
          for(const key of keys){
            switch (key){
              case 'date':
                consoRow[key] = new Date(r[key]);
                break;
              default:
                consoRow[key] = Number(r[key]);
            }
          }
          retValue.push(consoRow);
        }
        return retValue;
      })
    );
  }
}

export interface ConsommationAVGResult{
  electromenager: string;
  chauffageLocaux: string;
  chauffageEaux: string;
  climatisation: string;
  eclairage: string;
  date: string;
}
