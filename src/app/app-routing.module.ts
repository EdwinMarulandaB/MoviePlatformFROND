import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListMoviesComponent } from './components/list-movies/list-movies.component';
import { MovieFormComponent } from './components/movie-form/movie-form.component';

const routes: Routes = [
  {path:'',component:ListMoviesComponent},
  {path:'add',component:MovieFormComponent},
  {path:'edit/:id', component:MovieFormComponent},
  {path:'**',redirectTo:'',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
