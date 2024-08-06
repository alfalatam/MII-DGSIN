import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Lo que me devuelve lox https son observables
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Champ } from './champ';
import { CHAMPS } from './mock-champs';


import { throwError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ChampService {

  //TODO Cambiar por la online
  // private champsUrl = 'http://localhost:8080/api/v1/champs';  // URL to web api
  // private BaseUrl = 'http://localhost:8080/';

  private champsUrl = 'https://dgsin-2223-05.ew.r.appspot.com/api/v1/champs';  // URL to web api
  private BaseUrl = 'https://dgsin-2223-05.ew.r.appspot.com/'; 

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    resposeType: 'text' as 'text',
    

  };

  constructor(private http: HttpClient) { 

    
  }


  // Proxy
  private apiServerHostURL = 'https://ddragon.leagueoflegends.com/cdn/13.12.1/data/en_US/champion.json';
  getChampsInfo(): Observable<any[]> {
    return this.http.get<any[]>(this.apiServerHostURL).pipe(
      catchError(this.handleError<any[]>('getChamps proxy', []))
    );
  }  

  getChamps(): Observable<Champ[]>{
    return this.http.get<Champ[]>(this.champsUrl)
      .pipe(
        catchError(this.handleError<Champ[]>('getChamps', []))
      );
  }

  getChamp(champName: string, champRole:string): Observable<Champ> {
    return this.http.get<Champ>(`${this.champsUrl}/${champName}/${champRole}`)
      .pipe(
        // catchError(this.handleError<Champ>(`getChamp name=${champName}`))
        catchError(error => {
          console.log(error);

          return throwError(error);
        })
      )
  }

 

  updateChamp(updatedChamp: Champ): Observable<Champ> {

    return this.http.put<Champ>(`${this.champsUrl}/${updatedChamp.Name}/${updatedChamp.Role}`, updatedChamp)
      .pipe(
        catchError(error => {
          // console.log(error);
          return throwError(error);
        })
      );
  }
  

  


  // ADD champ
  addChamp(newChamp: Champ): Observable<Champ> {
    return this.http.post<Champ>(this.champsUrl, newChamp, this.httpOptions).pipe(
      catchError(error => {
        console.log(error);

        return throwError(error);
      })
    );
  }
  


  deleteChamps(): Observable<Champ> {

    return this.http.delete<any>(this.champsUrl, this.httpOptions).pipe(
        catchError(error => {
          console.log(error);
          return throwError(error);
        })
      );
  }

  deleteChamp(ChampName: String, champRole: String): Observable<any> {

    return this.http.delete<any>(this.champsUrl + '/' + ChampName + '/'+champRole, this.httpOptions).
      pipe(
        catchError(error => {
          console.log(error);

          return throwError(error);
        })
        );

  }



  getChampionInfo(url: string) {
    return this.http.get(url);
  }


  getChampionInfoProxy(url: string): Observable<any> {
     const proxyUrl =  this.BaseUrl+'proxyXX'+'/lol/spells?token=1kh6pyhk3I2w4ulvwCHu3Bnvi7XvmztWQXflj8Ipr53rTG9yUrM';
    return this.http.get<any>(proxyUrl).pipe(
      catchError(this.handleError<any>('getChampionInfo proxy'))
    );
  }
  

 




  public handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);

    }
  }



}
