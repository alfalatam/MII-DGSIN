import { Component,OnInit } from '@angular/core';
import {ChampService} from '../champ.service';
import {Champ} from '../champ';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import * as Highcharts from 'highcharts';
import { ChampDetailComponent } from '../champ-detail/champ-detail.component';
@Component({
  selector: 'app-champ-chart',
  templateUrl: './champ-chart.component.html',
  styleUrls: ['./champ-chart.component.css']
})
export class ChampChartComponent implements OnInit{

  champs: Champ[];   
  champsName: string[];  
  champsKDA: number[];  
  champSummoners: { name: string, image_url: string }[] = [];

  categories: string[];
  championDictionary: { [key: string]: any[] } = {};

  
  // Para el chart
  Highcharts: typeof Highcharts =  Highcharts; 
  chartOptions: Highcharts.Options;  
  chartOptions2: Highcharts.Options;  

    // Para la dificultad lo creo aqui
    difficultyCounts: { [difficulty: string]: number } = {} ;  
    //
    champInfo: any; 

  // Constructor
  constructor(private champService: ChampService, private modalService: NgbModal){ 
    // Inicializo los arrays
    this.champs = [];
    this.champsName = [];
    this.champsKDA = [];
    this.categories = [];
    this.championDictionary = {};


  }

  ngOnInit(): void {


    // Aqui llamo a Ddragon para obtener el JSON de los campeones
    //Parche actual
    const url = 'https://ddragon.leagueoflegends.com/cdn/13.12.1/data/en_US/champion.json';

    // hago una peticion Get a la API de Ddragon
    this.champService.getChampionInfo(url).subscribe(
       (response: any)=>{
          this.champInfo = response.data;


          Object.values(this.champInfo).forEach((champion: any) => {
            const difficulty = champion.info.difficulty.toString();
            if (this.difficultyCounts[difficulty]) {
              this.difficultyCounts[difficulty]++;
            } else {
              this.difficultyCounts[difficulty] = 1;
            }
          });
          // console.log(this.champInfo);
      },
      (error: any)=>{
        console.error('Ha ocurrido un error ->:', error);
      }
    );



    this.champService.getChampionInfoProxy(url).subscribe(
      (response: any) => {
        this.champSummoners = response.map((item: any) => ({
          name: item.name,
          image_url: item.image_url
        }));
        // console.log(this.champSummoners);
      },
      (error: any) => {
        console.error('Ha ocurrido un error ->:', error);
      }
    );
    


    this.champService.getChampionInfo(url).subscribe(
      (response: any) => {
        this.champInfo = response.data;
    
        for (const champion in this.champInfo) {
          if (this.champInfo.hasOwnProperty(champion)) {
            const id = this.champInfo[champion].id;
            const info = this.champInfo[champion].info;
    
            if (!(id in this.championDictionary)) {
              this.championDictionary[id] = [];
            }
    
            this.championDictionary[id].push(info);
          }
        }
    
        console.log('El diccionario de campeones es:');
        console.log(this.championDictionary);
    
        this.updateChart(this.championDictionary);
      },
      (error: any) => {
        console.error('Ha ocurrido un error:', error);
      }
    );
    
    


    
    this.updateChart(this.championDictionary);
    this.getChamps();
    this.getChampsDifficulty();

  }




  // Funcion para llamar a la API de Ddragon y obtener la dificultad de los campeones
  // El valor de la dificultad esta en el JSON de Ddragon en el campo "info.difficulty"
  getChampsDifficulty(): void {
    const url = 'https://ddragon.leagueoflegends.com/cdn/13.12.1/data/en_US/champion.json';

    this.champService.getChampionInfo(url).subscribe(
      (response: any) => {
        const champInfo = response.data;
  
        const difficultyCounts: { [difficulty: string]: number } = {};
  
        Object.values(champInfo).forEach((champion: any) => {
          const difficulty = champion.info.difficulty.toString();
          if (difficultyCounts[difficulty]) {
            // Si ya existe le sumo 1 
            difficultyCounts[difficulty]++;
          } else {
            // Si no existe lo creo y le asigno 1 
            difficultyCounts[difficulty] = 1;
          } 
        }); 
      }, 
      (error: any) => {
        console.error('Ha ocurrido un error -->:', error); 
      } 
    ); 


    this.champService.getChampionInfoProxy(url).subscribe(
      (response: any) => {
        // console.log(response);
        const champInfo = response;
  
  

      }, 
      (error: any) => {
        console.error('Ha ocurrido un error -->:', error); 
      } 
      ); 


    
  }


  // Get champs pero extraigo la info para el chart
  getChamps(): void {
    this.champService.getChamps().subscribe(
      champs => {
        this.champs = champs;
        this.champs.forEach(champ => {
          // hago un push del nombre del campeon
          this.champsName.push(champ.Name);

          // Si es Nan le asigno 0
          const kdaValue = (champ.KDA);
          
          // this.champsKDA.push(isNaN(kdaValue) ? 0 : kdaValue);
          this.champsKDA.push(isNaN(kdaValue) ? 0 : kdaValue);

        });

        // Ordeno los datos de KDA de mayor a menor
        this.sortDataByKDA();
        this.categories = [...this.champsName];
        this.champsKDA = [...this.champsKDA]; // Actualiza champsKDA con los datos ordenados

        //Actualizo el chart
        this.updateChart(this.championDictionary);
      },
      error => console.error(error)
    );
  }


  // Funcion para ordenar los datos de KDA de mayor a menor
  sortDataByKDA(): void {
    //mapeo los indices de los arrays y los ordeno
    const indexs = this.champsKDA.map((_, index) => index);
    indexs.sort((p1, p2) => this.champsKDA[p2] - this.champsKDA[p1]);
    this.champsName = indexs.map(index => this.champsName[index]);
    this.champsKDA = indexs.map(index => this.champsKDA[index]);
  }


  
  updateChart(championDictionary): void {
    
    const champsKDA = this.champsKDA;
    console.log('Los KDA son:');
    console.log(champsKDA);
    // Grafico de KDA de mi propia base
     this.chartOptions = {
      title: { 
        text: `Best Champion per KDA`
      },
      chart: { 
        plotBackgroundColor: null,  
        plotBorderWidth: null,  
        plotShadow: false,        
      },  
      xAxis: { 
        // nombres de los campeones
        categories: this.categories,
        crosshair: true
      }, 
      yAxis: {
        min: 0,
        title: {
          text: 'KDA per lane'
        }
      },
      tooltip: {
        formatter: function () {
          var championName = this.x; // El nombre
          var championInfo = championDictionary[championName][0];
          
          console.log(championInfo);
          // Modifico el mensaje y lo personalizo con la info de la API de Ddragon
          var tooltipContent = 'Champion: ' + championName + '<br>' +
                               'KDA: ' + this.point.y + '<br>' +
                               'Champion Info: ' + JSON.stringify(championInfo).slice(1, -1);
    
          return tooltipContent;
        }
      },
      
      series: [{
        //  kdas de los campeones
        data: champsKDA,
        name: 'KDA',  
        // Tipo de grafico 
        type: 'bar',   
        colorByPoint: true,  
        colors: ['#E0BBE4', '#75CFE0', '#FFD8B8', '#FFAAA7', '#D4A5A5'],  
      }], 
    }; 
 
    // Grafico de dificultad usando la API de Ddragon
    this.chartOptions2 = {
      title: {
        text: `Number of champions per difficulty`
      },
      chart: { 
        plotBackgroundColor: null, 
        plotBorderWidth: null, 
        plotShadow: false, 
  
      }, 


      series: [{
        //  Aqui le paso y manipulo los datos de dificultad
         data: Object.entries(this.difficultyCounts).map(([difficulty, count]) => ({ name: 'Dificultad '+difficulty,y: count})),
         name: 'Difficulty to play',
        type: 'column',
        colorByPoint: true,
        allowPointSelect: true,
      }],

    };
  }


}

