import { Component, OnInit } from '@angular/core';
import { ConsoQCApiAWSService } from './../services/conso-qc-api-aws.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private apiConsoQC: ConsoQCApiAWSService,private router: Router) { }
  identifiant:string;
  mdp:string;
  message="L'identifiant ou le mot de passe n'est pas valide.";
  isError=false;

  ngOnInit(): void {
  }

  connexionFunction(){

    let data = this.apiConsoQC.connexion(this.identifiant,this.mdp).subscribe(
      (res) => {
        console.log(res);
        if(this.isError!=true)
      {
        this.router.navigate(['/Tableau de bord']);
      }
      }
      
      
    );
  }
}
