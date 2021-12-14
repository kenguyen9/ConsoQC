import { User } from './../model/User';
import { Component, OnInit } from '@angular/core';
import { DataModelService } from '../services/data-model.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {

  constructor(private dataModel: DataModelService) { }

  public user: User;

  ngOnInit(): void {
    this.user = this.dataModel.user;
    if (!this.user){
      this.dataModel.disconnect();
    }
  }

}
