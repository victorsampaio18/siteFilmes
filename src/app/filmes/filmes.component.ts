import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-filmes',
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './filmes.component.html',
  styleUrls: ['./filmes.component.scss']
})
export class FilmesComponent implements OnInit {
  filmes: any[] = [];
  filmeSelecionado: any = null;
  filmesFiltrados: any[] = [];
  termoPesquisa: string = '';
  mostrarModal = false;
  filtroAno: number | null = null;
  filtroMes: string = '';
  anosDisponiveis: number[] = [];
  mesesDisponiveis: string[] = [];

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.carregarFilmes();
  }

  // Carrega os filmes através da lista json
  carregarFilmes() {
    this.http.get<any[]>('assets/filmes.json').subscribe(
      (data) => {
        this.filmes = data;
        this.filmesFiltrados = [...this.filmes];
        this.extrairFiltros();
      },
      (error) => {
        console.error('Erro ao carregar filmes:', error);
      }
    );
  }

  // Carrega os dados do filme selecionado para o modal
  abrirDetalhes(filme: any) {
    this.filmeSelecionado = filme;
    document.body.classList.add('modal-open');
  }

  // Limpa os dados do filme selecionado para o modal
  fecharDetalhes() {
    this.filmeSelecionado = null;
    document.body.classList.remove('modal-open');
  }

  // Busca o filme digitado na barra de pesquisa
  filtrarFilmes() {
    console.log("Termo de pesquisa:", this.termoPesquisa);
  
    this.filmesFiltrados = this.filmes.filter(filme =>
      filme.titulo.toLowerCase().includes(this.termoPesquisa.toLowerCase())
    );
  
    console.log("Filmes filtrados:", this.filmesFiltrados);
    this.cdr.detectChanges();
  }

  // Puxa os dados solicitados dos filmes para o filtro
  extrairFiltros() {
    const anosSet = new Set<number>();
    const mesesSet = new Set<string>();
  
    this.filmes.forEach(filme => {
      if (filme.ano) anosSet.add(filme.ano);
      if (filme.mes) mesesSet.add(filme.mes);
    });
  
    this.anosDisponiveis = Array.from(anosSet).sort((a, b) => b - a);
    this.mesesDisponiveis = Array.from(mesesSet);
  }

  // Abre o Modal do filtro
  abrirModal() {
    this.mostrarModal = true;
  }

  // Fecha o Modal do filtro
  fecharModal() {
    this.mostrarModal = false;
  }

  // Puxa os filmes através do filtro escolhido pelo usuário
  aplicarFiltro() {
    this.filmesFiltrados = this.filmes.filter(filme => {
      return (!this.filtroAno || filme.ano === this.filtroAno) &&
             (!this.filtroMes || filme.mes === this.filtroMes);
    });
  
    this.fecharModal(); // Fecha o modal após aplicar o filtro
  }
}