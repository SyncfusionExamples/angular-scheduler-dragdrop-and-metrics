import { Routes } from '@angular/router';
import { SchedulerComponent } from '../components/scheduler/scheduler.component';

export const routes: Routes = [
  { path: '', component: SchedulerComponent },
  { path: '**', redirectTo: '' }
];