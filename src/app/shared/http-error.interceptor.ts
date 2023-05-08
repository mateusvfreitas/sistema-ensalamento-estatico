import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SnackbarService } from '../utils/snackbar.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private snackService: SnackbarService) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                const errorObject = {
                    message: error.error.message || error.error[0].error,
                    code: error.status,
                };

                this.snackService.openSnackbar(errorObject.message, false);
                return throwError(() => errorObject);
            })
        );
    }
}
