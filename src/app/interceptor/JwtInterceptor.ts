import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import {Injectable} from '@angular/core'
import { Observable } from 'rxjs'

@Injectable()
export class TokenInterceptor implements HttpInterceptor{
    constructor(){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //console.log(localStorage.getItem('access_token'))
        if(localStorage.getItem('access_token')){
            req = req.clone({
                setHeaders:{
                    Authorization: 'bearer '+ localStorage.getItem('access_token')
                }
            })
        }
        return next.handle(req)
    }
}