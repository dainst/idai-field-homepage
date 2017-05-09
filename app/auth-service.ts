import {Http,Headers} from '@angular/http';
import {Query} from "idai-components-2/datastore";
import {Document} from "idai-components-2/core";
import {ReadDatastore} from 'idai-components-2/datastore'
import {Injectable} from "@angular/core";


@Injectable()
/**
 * @author Daniel de Oliveira
 */
export class AuthService {

    private headers = new Headers();

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
                    resolve();
                },
                error=>{
                    reject();
                }
            );
        })

    }

    public getHeaders() {
        return this.headers;
    }
}