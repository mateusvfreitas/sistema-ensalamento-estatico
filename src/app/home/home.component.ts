import { Component } from '@angular/core';
import { UsuarioSimplificado } from '../usuario/model/usuario';
import { UsuarioService } from '../usuario/usuario.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    usuarioSimplificado?: UsuarioSimplificado | null;

    constructor(private usuarioService: UsuarioService) {
        this.usuarioService.usuarioSimplificado.subscribe(
            (u) => (this.usuarioSimplificado = u)
        );
    }
}
