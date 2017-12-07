import {Http} from '@angular/http';
import {Query} from "idai-components-2/datastore";
import {Document} from "idai-components-2/core";
import {ReadDatastore, FindResult} from 'idai-components-2/datastore'
import {Injectable} from "@angular/core";
import {AuthService} from "../auth-service";
import {Observable} from 'rxjs/Observable';


@Injectable()
/**
 * @author Daniel de Oliveira
 * @author Philipp Gerth
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

    findDocs(query: Query): Promise<Document[]>{

        let types = '';

        return new Promise<any>((resolve,reject)=>{

            let q = query.q == undefined || query.q == '' ? '*' : query.q + '*';
            q = query['project'] !== undefined || query['project'] == '' ? q+' AND dataset:\"'+query['project']+'\"' : q;
            q = query['exists'] !== undefined ? q+' AND _exists_:resource.'+query['exists'] : q;

            if (query.types && query.types.length > 0) {

                for (let queryType of query.types) {
                    types = types + ' ' + queryType;
                }
                q = q+' AND resource.type:('+types+')';
            }

            this.http.get('/data/resource/?q='+q+'&size=1000',{headers: this.authService.getHeaders()}
                ).subscribe(response => {
                let objects = JSON.parse(response['_body']).results;

                resolve(objects);

            },error=>reject(error));
        });
    }


    find(query: Query): Promise<FindResult>{

        return undefined;
    }


    remoteChangesNotifications(): Observable<Document> {

        return undefined;
    }
}
