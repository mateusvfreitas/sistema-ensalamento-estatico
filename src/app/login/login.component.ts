import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    hide = true;
    username = new FormControl('', [Validators.required]);
    password = new FormControl('', [Validators.required]);

    constructor(
        private usuarioService: UsuarioService,
        private router: Router
    ) {}

    ngOnInit(): void {}

    login() {
        this.usuarioService
            .login(this.username.value, this.password.value)
            .subscribe(() => {
                this.router.navigate(['/home']);
            });
    }
}
