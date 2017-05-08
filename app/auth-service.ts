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

    constructor(private http:Http) { }

    private headers = new Headers();

    public setCredentials(usr,pwd) {

        let headers = new Headers();
        headers.append("Authorization", "Basic " + btoa(usr+":"+pwd));

        const querystring = '/data/user/login';

        return new Promise<string>((resolve,reject) => {
            this.http.get(querystring,{headers:headers}).subscribe(
                response => {
                    this.headers = headers;
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