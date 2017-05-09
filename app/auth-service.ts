import {Http,Headers} from '@angular/http';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";

@Injectable()
/**
 * @author Daniel de Oliveira
 */
export class AuthService {

    private headers = new Headers();
    private userObservers = [];


    constructor(private http:Http) {
        let authInfo = localStorage.getItem("Authorization");
        if (authInfo) {
            this.headers.append("Authorization", authInfo);
        }
    }

    public setCredentials(usr,pwd) {

        let headers = new Headers();
        headers.append("Authorization", "Basic " + btoa(usr+":"+pwd));

        const querystring = '/data/user/login';

        return new Promise<string>((resolve,reject) => {
            this.http.get(querystring,{headers:headers}).subscribe(
                response => {
                    this.headers = headers;
                    localStorage.setItem("Authorization","Basic " + btoa(usr+":"+pwd));
                    localStorage.setItem("user",usr);
                    for (let userObserver of this.userObservers) {
                       userObserver.next(usr);
                    }
                    resolve();
                },
                error=>{
                    for (let userObserver of this.userObservers) {
                        userObserver.next(undefined);
                    }
                    reject();
                }
            );
        })

    }

    public signOut() {
        this.headers = new Headers();
        localStorage.removeItem("Authorization");
        localStorage.removeItem("user");
        for (let userObserver of this.userObservers) {
            userObserver.next(undefined);
        }
    }

    public username() {
        return new Observable(observer=>{
            this.userObservers.push(observer);
            if (localStorage.getItem("user")) {
                observer.next(localStorage.getItem("user"));
            }
        })
    }

    public getHeaders() {
        return this.headers;
    }
}