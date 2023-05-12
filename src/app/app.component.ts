import { Component } from '@angular/core';
import { UsuarioSimplificado } from './usuario/model/usuario';
import { UsuarioService } from './usuario/usuario.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'TCC Pipa';
    usuarioSimplificado?: UsuarioSimplificado | null;

    constructor(private usuarioService: UsuarioService) {
        this.usuarioService.usuarioSimplificado.subscribe(
            (u) => (this.usuarioSimplificado = u)
        );
    }

    logout() {
        this.usuarioService.logout();
    }
}
