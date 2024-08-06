import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChampComponent } from './champ/champ.component';
import { ChampDetailComponent } from './champ-detail/champ-detail.component';
import { ChampChartComponent } from './champ-chart/champ-chart.component';
import { AboutComponent } from './about/about.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { IntegrationsComponent } from './integrations/integrations.component';
import { InicioComponent } from './inicio/inicio.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  // { path: '', redirectTo: '/champs', pathMatch: 'full' },
  { path: 'champs/:Name/:Role', component: ChampDetailComponent },
  { path: 'champs/charts', component: ChampChartComponent },
  { path: 'champs', component: ChampComponent },
  { path: 'about', component: AboutComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: 'integrations', component: IntegrationsComponent },
   { path: '', redirectTo: '/champs', pathMatch: 'full' },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
