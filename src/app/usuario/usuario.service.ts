import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { BehaviorSubject, Observable, concatMap, map } from 'rxjs';
import { AppApi } from 'src/app/appApi';
import { Usuario, UsuarioSimplificado } from './model/usuario';

@Injectable({
    providedIn: 'root',
})
export class UsuarioService {
    private usuarioSubject: BehaviorSubject<UsuarioSimplificado | null>;
    public usuarioSimplificado: Observable<UsuarioSimplificado | null>;
    private listaUsuarios!: Usuario[];

    constructor(private http: HttpClient, private router: Router) {
        this.usuarioSubject = new BehaviorSubject(
            JSON.parse(localStorage.getItem('usuario')!)
        );
        console.log(localStorage.getItem('user')!);
        this.usuarioSimplificado = this.usuarioSubject.asObservable();
    }

    public get usuarioValue() {
        return this.usuarioSubject.value;
    }

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

    validaUsuario(username: any, password: any): Observable<any> {
        const url = 'https://sistemas2.utfpr.edu.br/utfpr-auth/api/v1';
        const dados = {
            username: username,
            password: password,
        };

        return this.http.post(url, dados);
    }

    /* USAR LOCAL CASO NAO TENHA USUARIO VÁLIDO PARA TESTE */
    // login(username: any, password: any) {
    //     let params = new HttpParams();
    //     params = params.append('filtro', username);
    //     return this.http
    //         .get(`${AppApi.BASE_URL}/usuarios/username`, {
    //             params: params,
    //         })
    //         .pipe(
    //             concatMap((user) =>
    //                 this.consultarUsuarioPorId(user['id']).pipe(
    //                     map(() => {
    //                         let u: UsuarioSimplificado = {
    //                             username: user['username'],
    //                             isAdmin: user['isAdmin'],
    //                         };
    //                         localStorage.setItem(
    //                             'usuario',
    //                             JSON.stringify(user)
    //                         );
    //                         this.usuarioSubject.next(u);
    //                     })
    //                 )
    //             )
    //         );
    // }

    login(username: any, password: any) {
        let params = new HttpParams();
        params = params.append('filtro', username);
        return this.http
            .get(`${AppApi.BASE_URL}/usuarios/username`, {
                params: params,
            })
            .pipe(
                concatMap((user) =>
                    this.validaUsuario(username, password).pipe(
                        map(() => {
                            let u: UsuarioSimplificado = {
                                username: user['username'],
                                isAdmin: user['isAdmin'],
                            };
                            localStorage.setItem(
                                'usuario',
                                JSON.stringify(user)
                            );
                            this.usuarioSubject.next(u);
                        })
                    )
                )
            );
    }

    logout() {
        localStorage.removeItem('usuario');
        this.usuarioSubject.next(null);
        this.router.navigate(['/signin']);
    }
}
