import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { AlteracoesComponent } from '../alteracoes/alteracoes.component';

@Injectable()
export class AlteracoesGuard implements CanDeactivate<AlteracoesComponent> {
    canDeactivate(component: AlteracoesComponent): boolean {
        if (component.isGerandoAlteracoes) {
            return confirm('Gostaria de cancelar o processo em andamento?');
        }
        return true;
    }
}
