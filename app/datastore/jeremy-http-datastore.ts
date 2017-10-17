import {Http} from '@angular/http';
import {Query} from "idai-components-2/datastore";
import {Document} from "idai-components-2/core";
import {ReadDatastore} from 'idai-components-2/datastore'
import {Injectable} from "@angular/core";
import {AuthService} from "../auth-service";


@Injectable()
/**
 * @author Daniel de Oliveira
 */
export class JeremyHttpDatastore implements ReadDatastore {

    constructor(
        private http:Http,
        private authService: AuthService
    ) { }

    get(resourceId: string): Promise<Document> {
        return undefined;
    }

    getById(resourceId: string): Promise<Document> {
        return new Promise<any>((resolve,reject)=>{
            const querystring = '/data/resource/'+resourceId;
            this.http.get(querystring,{headers:this.authService.getHeaders()}
                ).subscribe(response => {
                    resolve(JSON.parse(response['_body']))
                },error=>reject(error));
        });
    }

    find(query: Query, offset?: number, limit?: number): Promise<Document[]> {

        return new Promise<any>((resolve,reject)=>{
            let querystring;

            let q = query.q;
            if (q == undefined || q == "") {
                q = "*";
            } else {
                q = query.q + "*";
            }

            if (query['project'] !== undefined || query['project'] == "") {
                q = q+" AND dataset:\""+query['project']+"\"";
            }
            if (query['type'] !== undefined || query['type'] == "") {
                q = q+" AND resource.type:"+query['type'];
            }

            querystring = '/data/resource/?q='+q;
            console.log(querystring)
            this.http.get(querystring,{headers: this.authService.getHeaders()}
                ).subscribe(response => {
                let objects = JSON.parse(response['_body']).results;

                resolve(objects);

            },error=>reject(error));
        });
    }

    all(type?: string, offset?: number, limit?: number): Promise<Document[]> {
        return undefined;
    }

    refresh(doc: Document): Promise<Document> {
        return undefined;
    }

}
