import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';

export const routes: Routes = [
  { path: '', redirectTo: 'days', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      // { path: 'days', component: DaysForecastComponent },
      // { path: 'locations', component: LocationForecastComponent }
    ],
  },
];
