import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FilmesComponent } from './filmes/filmes.component';
import { PersonagensComponent } from './personagens/personagens.component';
import { AtoresComponent } from './atores/atores.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'filmes', component: FilmesComponent },  // 🔹 Verifique se essa linha existe!
  { path: 'personagens', component: PersonagensComponent },
  { path: 'atores', component: AtoresComponent }
];
