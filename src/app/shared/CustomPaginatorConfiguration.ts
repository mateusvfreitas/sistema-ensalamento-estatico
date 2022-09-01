import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Subject } from 'rxjs';

@Injectable()
export class CustomPaginatorConfiguration implements MatPaginatorIntl {
    changes = new Subject<void>();

    firstPageLabel = 'Primeira página';
    itemsPerPageLabel = 'Itens por página';
    lastPageLabel = 'Última página';
    nextPageLabel = 'Próxima página';
    previousPageLabel = 'Página anterior';

    getRangeLabel(page: number, pageSize: number, length: number): string {
        if (length === 0) {
            return $localize`Página 1 de 1`;
        }
        const amountPages = Math.ceil(length / pageSize);
        return $localize`Página ${page + 1} de ${amountPages}`;
    }
}
