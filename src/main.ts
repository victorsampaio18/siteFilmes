import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './app/home/home.component';
import { FilmesComponent } from './app/filmes/filmes.component';
import { PersonagensComponent } from './app/personagens/personagens.component';
import { AtoresComponent } from './app/atores/atores.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', component: HomeComponent },
      { path: 'filmes', component: FilmesComponent },
      { path: 'personagens', component: PersonagensComponent },
      { path: 'atores', component: AtoresComponent }
    ])
  ]
}).catch(err => console.error(err));
