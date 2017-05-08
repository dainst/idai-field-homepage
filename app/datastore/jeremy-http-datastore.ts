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

    getWithType(type:string, resourceId: string): Promise<Document> {
        return new Promise<any>((resolve,reject)=>{
            const querystring = '/data/'+type+'/'+resourceId;
            this.http.get(querystring,{headers:this.authService.getHeaders()}
            ).subscribe(response => {
                resolve(JSON.parse(response['_body']))
            },error=>reject(error));
        });
    }

    find(query: Query, offset?: number, limit?: number): Promise<Document[]> {

        return new Promise<any>((resolve,reject)=>{
            let querystring;
            let type = 'object';
            if (query && query.type) type = query.type;

            let q = query.q;
            if (q == undefined || q == "") {
                q = "*";
            } else {
                q = query.q + "*";
            }

            if (query['project']) {
                if (q.indexOf('*')==0) {
                    q = "dataset:"+query['project'];
                } else {
                    q = "\""+q+" AND dataset:"+query['project']+"\"";
                }
            }
            querystring = '/data/' + type + '/?q='+q;

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