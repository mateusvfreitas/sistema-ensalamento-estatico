import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppApi } from '../appApi';
import { Atributo } from '../atributo/model/atributo';

@Injectable({
    providedIn: 'root',
})
export class HeatMapService {
    constructor(private http: HttpClient) {}

    consultarHeatMap(filtroAtributos: Atributo[] | null): Observable<any> {
        let params = new HttpParams();
        filtroAtributos?.forEach(
            (atributo) =>
                (params = params.append('atributo', atributo.id.toString()))
        );
        return this.http.get(`${AppApi.BASE_URL}/blocos-aula/heatmap`, {
            params: params,
        });
    }
}
