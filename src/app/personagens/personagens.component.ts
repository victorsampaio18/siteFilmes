import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-personagens',
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './personagens.component.html',
  styleUrl: './personagens.component.scss'
})
export class PersonagensComponent implements OnInit {
  personagens: any[] = [];
  personagemSelecionado: any = null;
  personagemFiltrados: any[] = [];
  termoPesquisa: string = '';
  mostrarModal = false;
  filtroUniverso: number | null = null;
  filtroAtores: string = '';
  universoDisponiveis: number[] = [];
  atoresDisponiveis: string[] = [];

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.carregarPersonagens();
  }

  // Carrega os personagens através da lista json
  carregarPersonagens() {
    this.http.get<any[]>('assets/personagens.json').subscribe(
      (data) => {
        this.personagens = data;
        this.personagemFiltrados = [...this.personagens];
        this.extrairFiltros();
      },
      (error) => {
        console.error('Erro ao carregar personagens:', error);
      }
    );
  }

  // Carrega os dados do personagem selecionado para o modal
  abrirDetalhes(personagem: any) {
    this.personagemSelecionado = personagem;
    document.body.classList.add('modal-open');
  }

  // Limpa os dados do personagem selecionado para o modal
  fecharDetalhes() {
    this.personagemSelecionado = null;
    document.body.classList.remove('modal-open');
  }

  // Busca o personagem digitado na barra de pesquisa
  filtrarPersonagens() {
    console.log("Termo de pesquisa:", this.termoPesquisa);
  
    this.personagemFiltrados = this.personagens.filter(personagem =>
      personagem.nome.toLowerCase().includes(this.termoPesquisa.toLowerCase())
    );
  
    console.log("Personagens filtrados:", this.personagemFiltrados);
    this.cdr.detectChanges();
  }

  // Puxa os dados solicitados dos personagens para o filtro
  extrairFiltros() {
    const universoSet = new Set<number>();
    const atoresSet = new Set<string>();
  
    this.personagens.forEach(personagem => {
      if (personagem.universo) universoSet.add(personagem.universo);
      if (personagem.starring) atoresSet.add(personagem.starring);
    });
  
    this.universoDisponiveis = Array.from(universoSet).sort((a, b) => b - a);
    this.atoresDisponiveis = Array.from(atoresSet);
  }

  // Abre o Modal do filtro
  abrirModal() {
    this.mostrarModal = true;
  }

  // Fecha o Modal do filtro
  fecharModal() {
    this.mostrarModal = false;
  }

  // Puxa o personagem através do filtro escolhido pelo usuário
  aplicarFiltro() {
    this.personagemFiltrados = this.personagens.filter(personagem => {
      return (!this.filtroUniverso || personagem.universo === this.filtroUniverso) &&
             (!this.filtroAtores || personagem.starring === this.filtroAtores);
    });
  
    this.fecharModal(); // Fecha o modal após aplicar o filtro
  }

}
