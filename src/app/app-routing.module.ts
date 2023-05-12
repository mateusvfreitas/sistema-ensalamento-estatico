import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtributoComponent } from './atributo/atributo.component';
import { BlocoAulaComponent } from './bloco-aula/bloco-aula.component';
import { CursoComponent } from './curso/curso.component';
import { GrupoSalaComponent } from './grupo-sala/grupo-sala.component';
import { HomeComponent } from './home/home.component';
import { HorarioComponent } from './horario/horario.component';
import { LoginComponent } from './login/login.component';
import { SalaComponent } from './sala/sala.component';
import { AccessGuard } from './shared/access-guard';
import { UsuarioComponent } from './usuario/usuario.component';

const routes: Routes = [
    {
        path: 'usuarios',
        component: UsuarioComponent,
        data: { adminOnlyRoute: true },
        canActivate: [AccessGuard],
    },
    {
        path: 'horarios',
        component: HorarioComponent,
        data: { adminOnlyRoute: true },
        canActivate: [AccessGuard],
    },
    {
        path: 'cursos',
        component: CursoComponent,
        data: { adminOnlyRoute: true },
        canActivate: [AccessGuard],
    },
    {
        path: 'atributos',
        component: AtributoComponent,
        data: { adminOnlyRoute: true },
        canActivate: [AccessGuard],
    },
    {
        path: 'grupo-salas',
        component: GrupoSalaComponent,
        data: { adminOnlyRoute: true },
        canActivate: [AccessGuard],
    },
    {
        path: 'salas',
        component: SalaComponent,
        data: { adminOnlyRoute: true },
        canActivate: [AccessGuard],
    },
    {
        path: 'blocos-aula',
        component: BlocoAulaComponent,
        canActivate: [AccessGuard],
    },
    {
        path: 'signin',
        component: LoginComponent,
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AccessGuard],
    },
    { path: '', redirectTo: 'signin', pathMatch: 'full' },
    { path: '**', redirectTo: 'signin', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
