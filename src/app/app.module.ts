import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { FilmesComponent } from './filmes/filmes.component';
import { PersonagensComponent } from './personagens/personagens.component';
import { AtoresComponent } from './atores/atores.component';
import { FooterComponent } from './footer/footer.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'filmes', component: FilmesComponent },
  { path: 'personagens', component: PersonagensComponent },
  { path: 'atores', component: AtoresComponent },
  { path: 'footer', component: FooterComponent }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FilmesComponent,
    HomeComponent,
    PersonagensComponent,
    AtoresComponent,
    FooterComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }