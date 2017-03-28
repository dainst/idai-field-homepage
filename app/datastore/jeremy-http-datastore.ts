import {Http} from '@angular/http';
import {Query} from "idai-components-2/datastore";
import {Document} from "idai-components-2/core";
import {ReadDatastore} from 'idai-components-2/datastore'
import {Injectable} from "@angular/core";


@Injectable()
/**
 * @author Daniel de Oliveira
 */
export class JeremyHttpDatastore implements ReadDatastore {

    constructor(private http:Http) { }

    get(resourceId: string): Promise<Document> {
        return new Promise<any>((resolve,reject)=>{
            const querystring = '/object/'+resourceId;
            this.http.get(querystring,
            ).subscribe(response => {
                resolve(JSON.parse(response['_body']))
            },error=>reject(error));
        });
    }

    find(query: Query, offset?: number, limit?: number): Promise<Document[]> {
        return new Promise<any>((resolve,reject)=>{
            let querystring;
            if (query && query.q) querystring = '/object/?q='+query.q+'*';
            else querystring = '/object/?q=*';

            this.http.get(querystring,
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