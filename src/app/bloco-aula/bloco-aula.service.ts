import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppApi } from '../appApi';
import { Atributo } from '../atributo/model/atributo';
import { UsuarioService } from '../usuario/usuario.service';
import { DiaSemana } from '../utils/dia-semana';

@Injectable({
    providedIn: 'root',
})
export class BlocoAulaService {
    constructor(
        private http: HttpClient,
        private usuarioService: UsuarioService
    ) {}

    listarBlocosAula(
        filtroAtributos: Atributo[] | null,
        filtroDiaSemana: DiaSemana | null,
        filtroIsMatchAll: boolean | null
    ): Observable<any> {
        let params = new HttpParams();
        const usuario = this.usuarioService.usuarioValue;
        if (usuario && !usuario.isAdmin) {
            params = params.append('responsavel', usuario.username);
        }

        filtroAtributos?.forEach(
            (atributo) =>
                (params = params.append('atributo', atributo.id.toString()))
        );
        if (filtroDiaSemana != null) {
            params = params.append('diaSemana', filtroDiaSemana);
        }
        if (filtroIsMatchAll != null) {
            params = params.append('isMatchAll', filtroIsMatchAll.toString());
        }
        return this.http.get(`${AppApi.BASE_URL}/blocos-aula`, {
            params: params,
        });
    }

    consultarBlocoAulaPorId(id: any): Observable<any> {
        return this.http.get(`${AppApi.BASE_URL}/blocos-aula/${id}`);
    }

    salvarNovoBlocoAula(novoBlocoAula: any): Observable<any> {
        return this.http.post(`${AppApi.BASE_URL}/blocos-aula`, novoBlocoAula);
    }

    deletarBlocoAula(id: any): Observable<any> {
        return this.http.delete(`${AppApi.BASE_URL}/blocos-aula/${id}`);
    }

    updateBlocoAula(id: any, data: any) {
        return this.http.put(`${AppApi.BASE_URL}/blocos-aula/${id}`, data);
    }
}
