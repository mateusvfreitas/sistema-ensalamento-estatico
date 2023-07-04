import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppApi } from '../appApi';
import { Atributo } from '../atributo/model/atributo';
import { GrupoSala } from '../grupo-sala/model/grupo-sala';
import { Sala } from './model/sala';

@Injectable({
    providedIn: 'root',
})
export class SalaService {
    private listaSalas!: Sala[];

    constructor(private http: HttpClient) {}

    listarSalas(): Observable<any> {
        return this.http.get(`${AppApi.BASE_URL}/salas`);
    }

    listarSalasFiltros(
        filtroAtributos: Atributo[] | null,
        filtroCapacidade: number | null,
        filtroAgrupamento: GrupoSala[] | null,
        filtroIsMatchAll: boolean | null
    ): Observable<any> {
        let params = new HttpParams();
        filtroAtributos?.forEach(
            (atributo) =>
                (params = params.append('atributo', atributo.id.toString()))
        );
        if (filtroCapacidade != null) {
            params = params.append(
                'capacidadeMinima',
                filtroCapacidade.toString()
            );
        }
        filtroAgrupamento?.forEach(
            (grupo) =>
                (params = params.append('agrupamento', grupo.id.toString()))
        );
        if (filtroIsMatchAll != null) {
            params = params.append('isMatchAll', filtroIsMatchAll.toString());
        }
        return this.http.get(`${AppApi.BASE_URL}/salas`, {
            params: params,
        });
    }

    consultarSalaPorId(id: any): Observable<any> {
        return this.http.get(`${AppApi.BASE_URL}/salas/${id}`);
    }

    salvarNovaSala(novoSala: any): Observable<any> {
        return this.http.post(`${AppApi.BASE_URL}/salas`, novoSala);
    }

    deletarSala(id: any): Observable<any> {
        return this.http.delete(`${AppApi.BASE_URL}/salas/${id}`);
    }

    updateSala(id: any, data: any) {
        return this.http.put(`${AppApi.BASE_URL}/salas/${id}`, data);
    }

    consultaEnsalamentoEspecifico(id: any): Observable<any> {
        return this.http.get(`${AppApi.BASE_URL}/salas/${id}/ensalamento`);
    }

    geraAlteracoesEnsalamento(
        filtroAgrupamento: GrupoSala[] | null
    ): Observable<any> {
        let params = new HttpParams();
        filtroAgrupamento?.forEach(
            (grupo) =>
                (params = params.append('agrupamento', grupo.id.toString()))
        );
        return this.http.get(
            `${AppApi.BASE_URL}/salas/alteracoes-ensalamento`,
            { params: params }
        );
    }

    getSeila(): Observable<any> {
        return this.http.get(`${AppApi.BASE_URL}/salas/seila`);
    }

    setSalas(salas: Sala[]) {
        this.listaSalas = salas;
    }

    getSalas(): Sala[] {
        return this.listaSalas;
    }
}
