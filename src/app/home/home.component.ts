import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, HttpClientModule, RouterOutlet, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  news: any = {};
  newsFiltrados: any[] = [];

  constructor(private http: HttpClient) {}

  // Carrega os dados da notícia do json
  ngOnInit(): void {
    this.http.get<any>('assets/home.json').subscribe(
      data => {
        console.log('Dados carregados:', data);
        this.news = data;
        this.newsFiltrados = [...this.news];
      },
      error => {
        console.error('Erro ao carregar o JSON:', error);
      }
    );
  }
}
