import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Sala } from '../sala/model/sala';
import { SalaService } from '../sala/sala.service';
import { SnackbarService } from '../utils/snackbar.service';
import { Ensalamento } from './model/ensalamento';

@Component({
    selector: 'app-ensalamento',
    templateUrl: './ensalamento.component.html',
    styleUrls: ['./ensalamento.component.scss'],
})
export class EnsalamentoComponent implements OnInit {
    filtroSala = new FormControl<Sala | undefined>(
        undefined,
        Validators.required
    );
    listaSalas: Sala[] = [];

    displayedColumns: string[] = [
        'horarioDiaSemana',
        'segunda',
        'terca',
        'quarta',
        'quinta',
        'sexta',
    ];

    dataSource = new MatTableDataSource<Ensalamento>();

    constructor(
        private salaService: SalaService,
        private snackService: SnackbarService
    ) {}

    ngOnInit(): void {
        this.listarSalas();
    }

    listarSalas(): void {
        this.salaService.listarSalas().subscribe((response) => {
            this.listaSalas = response;
            this.listaSalas.sort((a, b) => (a.nome < b.nome ? -1 : 1));
        });
    }

    consultarEnsalamento(): void {
        this.salaService
            .consultaEnsalamentoEspecifico(this.filtroSala.value?.id)
            .subscribe((response) => {
                this.dataSource.data = response as Ensalamento[];
            });
    }

    filtrar(): void {
        if (this.filtroSala.hasError('required')) {
            this.snackService.openSnackbar(
                'Pendência de campos obrigatórios',
                false
            );
        } else {
            console.log(this.filtroSala.value);
            this.consultarEnsalamento();
        }
    }
}
