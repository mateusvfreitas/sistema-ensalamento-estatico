import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppApi } from '../appApi';
import { UsuarioService } from '../usuario/usuario.service';
import { Curso } from './model/curso';

@Injectable({
    providedIn: 'root',
})
export class CursoService {
    private listaCursos!: Curso[];

    constructor(
        private http: HttpClient,
        private usuarioService: UsuarioService
    ) {}

    listarCursos(): Observable<any> {
        let params = new HttpParams();
        const usuario = this.usuarioService.usuarioValue;
        if (usuario && !usuario.isAdmin) {
            params = params.append('responsavel', usuario.username);
        }
        return this.http.get(`${AppApi.BASE_URL}/cursos`, { params: params });
    }

    consultarCursoPorId(id: any): Observable<any> {
        return this.http.get(`${AppApi.BASE_URL}/cursos/${id}`);
    }

    salvarNovoCurso(novoCurso: any): Observable<any> {
        return this.http.post(`${AppApi.BASE_URL}/cursos`, novoCurso);
    }

    deletarCurso(id: any): Observable<any> {
        return this.http.delete(`${AppApi.BASE_URL}/cursos/${id}`);
    }

    updateCurso(id: any, data: any) {
        return this.http.put(`${AppApi.BASE_URL}/cursos/${id}`, data);
    }

    setCursos(cursos: Curso[]) {
        this.listaCursos = cursos;
    }

    getCursos(): Curso[] {
        return this.listaCursos;
    }
}
