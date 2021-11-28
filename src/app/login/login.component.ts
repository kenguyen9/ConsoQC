import { User } from './../model/User';
import { Component, OnInit } from '@angular/core';
import { ConsoQCApiAWSService } from './../services/conso-qc-api-aws.service';
import { Router } from '@angular/router';
import { DataModelService } from '../services/data-model.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private apiConsoQC: ConsoQCApiAWSService,
    private router: Router,
    private dataModel: DataModelService) { }

  identifiant: string;
  mdp: string;
  message = "L'identifiant ou le mot de passe n'est pas valide.";
  isError = false;

  ngOnInit(): void {
  }

  connexionFunction() {

    this.apiConsoQC.connexion(this.identifiant, this.mdp).subscribe(
      (res) => {
        if (res) {
          this.dataModel.user = res as User;
          this.router.navigate(["Tableau de bord"]);
        } else {
          this.isError = true;
        }
      }
    );
  }
}
