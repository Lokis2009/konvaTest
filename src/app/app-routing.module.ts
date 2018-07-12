import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


import {SingleBoulderComponent} from './components/single-boulder/single-boulder.component';


const routes: Routes = [
  {path: '', redirectTo: '/boulderdetail/291', pathMatch: 'full' },
  {path: 'boulderdetail/:id', component: SingleBoulderComponent },
  // { path: '**', redirectTo: 'boulderdetail/291',  component: SingleBoulderComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
