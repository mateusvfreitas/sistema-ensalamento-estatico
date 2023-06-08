import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { AtributoService } from '../atributo/atributo.service';
import { Atributo } from '../atributo/model/atributo';
import { SalaService } from '../sala/sala.service';
import { HeatMapService } from './heat-map.service';
import { HeatMap } from './model/heat-map';

const colorScheme: string[] = [
    '#68bf7b',
    '#7dc57c',
    '#9fcf7e',
    '#c3d980',
    '#dbe081',
    '#f7e683',
    '#fdd17f',
    '#fbae78',
    '#fa9172',
    '#f8746d',
];
const minValue = 0;

@Component({
    selector: 'app-heat-map',
    templateUrl: './heat-map.component.html',
    styleUrls: ['./heat-map.component.scss'],
})
export class HeatMapComponent implements OnInit {
    filtroAtributos = new FormControl();
    listaAtributos: Atributo[] = [];
    paramAtributos: Atributo[] = [];
    maxValue!: number;
    qtdeSalas!: number;

    displayedColumns: string[] = [
        'horarioDiaSemana',
        'segunda',
        'terca',
        'quarta',
        'quinta',
        'sexta',
        // 'media',
    ];

    dataSource = new MatTableDataSource<HeatMap>();

    constructor(
        private heatMapService: HeatMapService,
        private atributoService: AtributoService,
        private salaService: SalaService
    ) {}

    ngOnInit(): void {
        this.listarAtributos();
        this.listarSalas();
        this.gerarHeatMap();
    }

    gerarHeatMap(): void {
        this.heatMapService
            .consultarHeatMap(this.paramAtributos)
            .subscribe((response) => {
                this.dataSource.data = response as HeatMap[];
            });
    }

    getColorFromRange(value: any) {
        if (isNaN(value)) {
            value = minValue;
        }
        value = Math.max(minValue, Math.min(value, this.maxValue));
        let perc = (minValue + value) / this.maxValue;
        let colorIdx = Math.round((colorScheme.length - 1) * perc);
        return colorScheme[colorIdx];
    }

    listarAtributos(): void {
        this.atributoService.listarAtributos().subscribe((response) => {
            this.listaAtributos = response;
            this.listaAtributos.sort((a, b) => (a.nome < b.nome ? -1 : 1));
        });
    }

    listarSalas(): void {
        this.salaService
            .listarSalasFiltros(this.paramAtributos, null, null, true)
            .subscribe((response) => {
                this.maxValue = response.length > 0 ? response.length : 1;
                this.qtdeSalas = response.length;
            });
    }

    filtrar(): void {
        this.paramAtributos = [];
        if (this.filtroAtributos.value) {
            this.paramAtributos.push(this.filtroAtributos.value as Atributo);
        }
        this.listarSalas();
        this.gerarHeatMap();
    }
}
