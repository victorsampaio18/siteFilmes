import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-atores',
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './atores.component.html',
  styleUrl: './atores.component.scss'
})
export class AtoresComponent implements OnInit {
  atores: any[] = [];
  atorSelecionado: any = null;
  atoresFiltrados: any[] = [];
  termoPesquisa: string = '';
  mostrarModal = false;
  filtroGenero: string = '';
  generoDisponiveis: string[] = [];

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.carregarAtores();
  }

  // Carrega os atores através da lista json
  carregarAtores() {
    this.http.get<any[]>('assets/atores.json').subscribe(
      (data) => {
        this.atores = data;
        this.atoresFiltrados = [...this.atores];
        this.extrairFiltros();
      },
      (error) => {
        console.error('Erro ao carregar atores:', error);
      }
    );
  }

  // Carrega os dados do ator ou atriz selecionado para o modal
  abrirDetalhes(ator: any) {
    this.atorSelecionado = ator;
    document.body.classList.add('modal-open');
  }

  // Limpa os dados do ator ou atriz selecionado para o modal
  fecharDetalhes() {
    this.atorSelecionado = null;
    document.body.classList.remove('modal-open');
  }

  // Busca o ator ou atriz digitado na barra de pesquisa
  filtrarAtores() {
    console.log("Termo de pesquisa:", this.termoPesquisa);
  
    this.atoresFiltrados = this.atores.filter(ator =>
      ator.nome.toLowerCase().includes(this.termoPesquisa.toLowerCase())
    );
  
    console.log("Personagens filtrados:", this.atoresFiltrados);
    this.cdr.detectChanges();
  }

  // Puxa os dados solicitados dos atores para o filtro
  extrairFiltros() {
    const generoSet = new Set<string>();
  
    this.atores.forEach(ator => {
      if (ator.genero) generoSet.add(ator.genero);
    });
  
    this.generoDisponiveis = Array.from(generoSet);
  }

  // Abre o Modal do filtro
  abrirModal() {
    this.mostrarModal = true;
  }

  // Fecha o Modal do filtro
  fecharModal() {
    this.mostrarModal = false;
  }

  // Puxa o ator ou atriz através do filtro escolhido pelo usuário
  aplicarFiltro() {
    this.atoresFiltrados = this.atores.filter(ator => {
      return (!this.filtroGenero || ator.genero === this.filtroGenero);
    });
  
    this.fecharModal(); // Fecha o modal após aplicar o filtro
  }

}

