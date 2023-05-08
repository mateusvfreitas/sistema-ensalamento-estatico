import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { AppApi } from 'src/app/appApi';
import { Usuario } from './model/usuario';

@Injectable({
    providedIn: 'root',
})
export class UsuarioService {
    private listaUsuarios!: Usuario[];

    constructor(private http: HttpClient) {}

    listarUsuarios(): Observable<any> {
        return this.http.get(`${AppApi.BASE_URL}/usuarios`);
    }

    consultarUsuarioPorId(id: any): Observable<any> {
        return this.http.get(`${AppApi.BASE_URL}/usuarios/${id}`);
    }

    salvarNovoUsuario(novoUsuario: any): Observable<any> {
        return this.http.post(`${AppApi.BASE_URL}/usuarios`, novoUsuario);
    }

    deletarUsuario(id: any): Observable<any> {
        return this.http.delete(`${AppApi.BASE_URL}/usuarios/${id}`);
    }

    updateUsuario(id: any, data: any) {
        return this.http.put(`${AppApi.BASE_URL}/usuarios/${id}`, data);
    }

    setUsuarios(usuarios: Usuario[]) {
        this.listaUsuarios = usuarios;
    }

    getUsuarios(): Usuario[] {
        return this.listaUsuarios;
    }

    login(username: any, password: any): Observable<any> {
        const url = 'https://sistemas2.utfpr.edu.br/utfpr-auth/api/v1';
        const dados = {
            username: username,
            password: password,
        };

        // let headers = new HttpHeaders({
        //     Accept: 'application/json, text/plain, */*',
        //     'Accept-Language': 'en-US,en;q=0.9',
        //     Connection: 'keep-alive',
        //     'Content-Type': 'application/json',
        //     Cookie: 'style=null',
        //     Origin: 'https://sistemas2.utfpr.edu.br',
        //     Referer: 'https://sistemas2.utfpr.edu.br/home',
        // });
        // let options = { headers: headers };

        return this.http.post(url, dados);
    }
}
