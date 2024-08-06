import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Importar el modulo HTTP
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HighchartsChartModule } from 'highcharts-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChampComponent } from './champ/champ.component';
import { ChampDetailComponent } from './champ-detail/champ-detail.component';
import { ChampChartComponent } from './champ-chart/champ-chart.component';
import { AboutComponent } from './about/about.component';
import { IntegrationsComponent } from './integrations/integrations.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { InicioComponent } from './inicio/inicio.component';

@NgModule({
  declarations: [
    AppComponent,
    ChampComponent,
    ChampDetailComponent,
    ChampChartComponent,
    AboutComponent,
    IntegrationsComponent,
    AnalyticsComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule, // <-- modulo HTTP
    FormsModule, // <--  [(ngModel)]
    HighchartsChartModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
