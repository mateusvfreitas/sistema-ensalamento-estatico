import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppApi } from '../appApi';

@Injectable({
    providedIn: 'root',
})
export class HeatMapService {
    constructor(private http: HttpClient) {}

    consultarHeatMap(): Observable<any> {
        return this.http.get(`${AppApi.BASE_URL}/blocos-aula/heatmap`);
    }
}
