import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class AccessGuard implements CanActivate {
    constructor(
        private usuarioService: UsuarioService,
        private router: Router
    ) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | boolean
        | UrlTree
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree> {
        const user = this.usuarioService.usuarioValue;
        const adminOnlyRoute = route.data['adminOnlyRoute'] || false;
        if (user) {
            if (!user.isAdmin && adminOnlyRoute) {
                this.router.navigate(['/signin']);
                return false;
            }
            return true;
        }

        this.router.navigate(['/signin']);
        return false;
    }
}
