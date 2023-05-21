import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HeatMapService } from './heat-map.service';
import { HeatMap } from './model/heat-map';

@Component({
    selector: 'app-heat-map',
    templateUrl: './heat-map.component.html',
    styleUrls: ['./heat-map.component.scss'],
})
export class HeatMapComponent implements OnInit {
    displayedColumns: string[] = [
        'horarioDiaSemana',
        'segunda',
        'terca',
        'quarta',
        'quinta',
        'sexta',
    ];

    dataSource = new MatTableDataSource<HeatMap>();

    constructor(private heatMapService: HeatMapService) {}

    ngOnInit(): void {
        this.heatMapService.consultarHeatMap().subscribe((response) => {
            this.dataSource.data = response as HeatMap[];
        });
    }
}
