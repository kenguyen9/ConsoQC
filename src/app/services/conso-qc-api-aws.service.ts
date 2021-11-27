import { ConsommationROW } from './../model/ConsommationROW';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class ConsoQCApiAWSService {

  private AWS_ENDPOINT = "https://t4mgpazwla.execute-api.us-east-2.amazonaws.com/dev/"
  constructor(private httpClient: HttpClient) { }

  getAVGConso(): Observable<ConsommationROW[]> {
    return this.httpClient.get<ConsommationAVGResult[]>(this.AWS_ENDPOINT + "conso").pipe(
      map((res) => {
        const retValue = this.parseConsommationRow(res);
        return retValue;
      })
    );
  }

  getClientConso(): Observable<ConsommationROW[]> {
    return this.httpClient.get<ConsommationROW[]>(this.AWS_ENDPOINT + "client?param=202").pipe(
      map((res) => {
        const retValue = this.parseConsommationRow(res);
        return retValue;
      })
    );
  }
  connexion(id,mdp){
  return this.httpClient.get(this.AWS_ENDPOINT+"connexion?id="+id+"&mdp="+mdp);
}

  parseConsommationRow(res){
    const retValue: ConsommationROW[] = [];
    for (const r of res) {
      const keys = Object.keys(r);
      let consoRow = {
        date: new Date(),
        property: {}
      };
      let global = 0;
      for (const key of keys) {
        switch (key) {
          case 'date':
            consoRow[key] = new Date(r[key]);
            break;
          default:
            consoRow.property[key] = Number(r[key]);
            global += consoRow.property[key];
        }
      }
      consoRow.property['global'] = global;
      retValue.push(consoRow);
    }
    return retValue;
  }



}


export interface ConsommationAVGResult {
  electromenager: string;
  chauffageLocaux: string;
  chauffageEaux: string;
  climatisation: string;
  eclairage: string;
  date: string;
}
