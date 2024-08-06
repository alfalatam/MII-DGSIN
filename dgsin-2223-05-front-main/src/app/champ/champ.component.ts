import { Component, OnInit } from '@angular/core';
import {Champ} from '../champ';
import {ChampService} from '../champ.service';
import { HttpErrorResponse, HttpHeaderResponse, HttpHeaders, HttpResponse, HttpResponseBase, HttpStatusCode } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { Observable, of } from 'rxjs';


import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { error } from 'highcharts';

@Component({
  selector: 'app-champ',
  templateUrl: './champ.component.html',
  styleUrls: ['./champ.component.css']
})
export class ChampComponent implements OnInit{

  champs : Champ[];

  isAlert=false;
  alertMessage="";
  closeResult: string;
  alertClass: string = ''; // Valor por defecto
  pageSize = 10;
  page = 1;
  sortedChamps: Champ[];


  // Aqui se inyecta el servicio
  constructor(private champService: ChampService,private modalService: NgbModal) {

    this.champs = [];
  }


  ngOnInit(): void {
    this.getChamps();
  }

  getChamps(): void {

    this.champService.getChamps().subscribe(champs => {
      this.champs = champs;
      this.sortChamps();
    });
  }

  sortChamps(): void {
    this.sortedChamps = this.champs.sort((a, b) => {
      const nameA = a.Name.toLowerCase();
      const nameB = b.Name.toLowerCase();
      return nameA.localeCompare(nameB);
    });
  }
  


  
  addChamp(Name: string, Class: string, Role: string, Tier: string, Score: number, Trend: number, WinP: number, RoleP: number, PickP: number, BanP: number, KDA: number): void {
    // Name = Name.trim();
    Name = Name.charAt(0).toUpperCase() + Name.slice(1).toLowerCase().trim();
    Class = Class.trim();
    Role = Role.trim();


    // Estos valores se los meto por defecto en la creacion y los cambiare en la edicion
    Tier = "D";
    Score = 0;
    Trend = 0;
    WinP = 0;
    RoleP = 0;
    PickP = 0;
    BanP = 0;
    KDA = 0;

    if (!Name && !Role) {
      return;
    }


    this.champService.addChamp({ Name, Class, Role, Tier, Score, Trend, WinP, RoleP, PickP, BanP, KDA }).subscribe(
      () => {

        this.handleSuccess(" added");
        this.getChamps();
      },
      error => {
        this.handleError(error);
        this.getChamps();


      }
    );
  }

  deleteChamps(): void {
    this.champService.deleteChamps().subscribe(
      () => {

        this.handleSuccess("s deleted");
        this.getChamps();
      },
      error => {
        this.handleError(error);
      }
    );
  }


  deleteChamp(name: String,role: String): void { 
    this.champService.deleteChamp(name,role).subscribe(
      () => {
        this.handleSuccess(" deleted");
        this.getChamps();
      },
      error => {
        this.handleError(error);
        this.getChamps();

      }
      );
  }


// Modal
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
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
  } else if (error.status === 404) {
      this.isAlert = true;
      this.alertMessage = "Error with champion! Not found.";
      this.alertClass = 'alert alert-danger';
      this.hideAlertAfterDelay();
  }  else if (error.status === 409) {
        this.isAlert = true;
        this.alertMessage = "This Champion already exists!";
        this.alertClass = 'alert alert-danger';
        this.hideAlertAfterDelay();
  } else if (error.status === 422) {
    this.isAlert = true;
    this.alertMessage = "Error! Check the data entered and try again.";
    this.alertClass = 'alert alert-danger';
    this.hideAlertAfterDelay();
  } else if (error.status >= 200 && error.status < 400) {
    this.isAlert = true;
    this.alertMessage = "Champion added successfully!";
    this.alertClass = 'alert alert-success';
    this.hideAlertAfterDelay();
  } else {
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















