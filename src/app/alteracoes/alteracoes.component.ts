import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { GrupoSalaService } from '../grupo-sala/grupo-sala.service';
import { GrupoSala } from '../grupo-sala/model/grupo-sala';
import { SalaService } from '../sala/sala.service';
import { SnackbarService } from '../utils/snackbar.service';
import { Alteracao } from './model/alteracao';

@Component({
    selector: 'app-alteracoes',
    templateUrl: './alteracoes.component.html',
    styleUrls: ['./alteracoes.component.scss'],
})
export class AlteracoesComponent implements OnInit {
    displayedColumns: string[] = [
        'codigo',
        'horario',
        'salaOriginal',
        'salaNova',
    ];

    dataSource = new MatTableDataSource<Alteracao>();

    filtroAgrupamento = new FormControl<GrupoSala[] | undefined>(undefined, [
        Validators.required,
    ]);

    paramAgrupamento: GrupoSala[] = [];
    listaAgrupamentos: GrupoSala[] = [];
    // listaAlteracoes: Alteracao[] = [];

    isGerandoAlteracoes = false;
    requisicaoProcessada = false;
    erroUnfeasibility = false;

    clipboard = '';

    constructor(
        private salaService: SalaService,
        private grupoSalaService: GrupoSalaService,
        private snackService: SnackbarService
    ) {}

    ngOnInit(): void {
        this.listarAgrupamentos();
        console.log(this.dataSource.data);
    }

    listarAgrupamentos(): void {
        this.grupoSalaService.listarGrupos().subscribe((response) => {
            this.listaAgrupamentos = response;
            this.listaAgrupamentos.sort((a, b) => (a.nome < b.nome ? -1 : 1));
        });
    }

    gerarAlteracoes(): void {
        if (this.filtroAgrupamento.hasError('required')) {
            this.snackService.openSnackbar(
                'Selecione ao menos um agrupamento',
                false
            );
        } else {
            this.clipboard = '';
            this.isGerandoAlteracoes = true;
            this.requisicaoProcessada = false;
            this.paramAgrupamento = this.filtroAgrupamento.value as GrupoSala[];
            this.salaService
                .geraAlteracoesEnsalamento(this.paramAgrupamento)
                .subscribe((response) => {
                    this.dataSource.data = response as Alteracao[];
                    if (this.dataSource.data.length > 0) {
                        if (this.dataSource.data[0].codigo == 'ERRO') {
                            this.erroUnfeasibility = true;
                        } else {
                            this.montarClipboard();
                        }
                    }
                    this.isGerandoAlteracoes = false;
                    this.requisicaoProcessada = true;
                });
        }
    }

    montarClipboard(): void {
        this.dataSource.data.forEach((elem) => {
            let dadosDisciplina = `Código: ${elem.codigo}, Horário: ${elem.horario}, Sala Original: ${elem.salaOriginal}, Sala Nova: ${elem.salaNova}\n`;
            this.clipboard = this.clipboard + dadosDisciplina;
        });
        console.log(this.clipboard);
    }

    avisaClipboardCopiado(): void {
        this.snackService.openSnackbar(
            'Conteúdo copiado para a área de transferência',
            true
        );
    }
}
