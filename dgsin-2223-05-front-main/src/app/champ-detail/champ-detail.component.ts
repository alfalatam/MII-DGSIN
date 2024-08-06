import { Component, OnInit } from '@angular/core';
import { Champ } from '../champ';
import { ChampService } from '../champ.service';
// Para obtener el parametro de la url
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse, HttpHeaderResponse, HttpHeaders, HttpResponse, HttpResponseBase, HttpStatusCode } from '@angular/common/http';


@Component({
  selector: 'app-champ-detail',
  templateUrl: './champ-detail.component.html',
  styleUrls: ['./champ-detail.component.css']
})
export class ChampDetailComponent implements OnInit {

   champ: Champ;
   isAlert=false;
   alertMessage="";
   alertClass: string = ''; // Valor por defecto


  constructor(private champService: ChampService,
    private route: ActivatedRoute,
    private location: Location){

      
      this.champ = { 
        Name: '',
        Class: '',
        Role: '',
        Tier: '',
        Score: 0,
        Trend: 0,
        WinP: 0,
        RoleP: 0,
        PickP: 0,
        BanP: 0,
        KDA: 0,
      }
   }

  ngOnInit(): void {
    this.getChamp();
  }



  getChamp(): void {
    this.champService.getChamp(this.route.snapshot.paramMap.get('Name') as string,this.route.snapshot.paramMap.get('Role') as string)
      .subscribe(champ => this.champ = champ);
  }
  

  


  saveChamp2(): void {

    this.champService.updateChamp(this.champ)
    .subscribe(_ => this.goBack());
    console.log("Updated");

  }

  saveChamp(): void {

    this.champService.updateChamp(this.champ).subscribe(
      () => {
        this.handleSuccess(" updated");
      },
      error => {
          this.handleError(error);
          return throwError(error);
  
  
      }
    );
  



  }


  goBack(): void {
    this.location.back();

  }


// Timeout alert
hideAlertAfterDelay(): void {
  setTimeout(() => {
    this.isAlert = false;
  }, 5000); // 5000 milisegundos = 5 segundos
}

  handleError(error: HttpErrorResponse): void {
    console.log(error.status);

     if (error.status === 409) {
        this.isAlert = true;
        this.alertMessage = "Champion already exists!";
        this.alertClass = 'alert alert-danger';
        this.hideAlertAfterDelay();
    } else if (error.status === 422) {
      this.isAlert = true;
      this.alertMessage = "Error! Check the data entered and try again. Remember that percentage values must be between 0 and 100.";
      this.alertClass = 'alert alert-danger';
      this.hideAlertAfterDelay();
    }  else {
        this.isAlert = true;
        this.alertMessage = "Error!  Please try again later.";
        this.alertClass = 'alert alert-danger';
        this.hideAlertAfterDelay();
    } 
  
  
  }
  
  handleSuccess(crud): void {
    this.isAlert = true;
    this.alertMessage = "Champion"+crud +" successfully!";
    this.alertClass = 'alert alert-success';
    this.hideAlertAfterDelay();
  }

}
