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

        console.log(types);

        return new Promise<any>((resolve,reject)=>{

            let q = query.q == undefined || query.q == '' ? '*' : query.q + '*';
            q = query['project'] !== undefined || query['project'] == '' ? q+' AND dataset:\"'+query['project']+'\"' : q;

            if (query.types && query.types.length > 0) {

                for (let queryType of query.types) {
                    types = types + ' ' + queryType;
                }
                q = q+' AND resource.type:('+types+')';
            }
            if (query['geometry'] !== undefined || query['geometry'] == '') {
                q = q+' AND resource.geometry.type:'+query['geometry'];
            }

            console.log('/data/resource/?q='+q+"&size=1000");
            // TODO: Removal of geometry restriction after implementation of Exists ES Query in Jeremy #7116
            this.http.get('/data/resource/?q='+q+"&size=1000",{headers: this.authService.getHeaders()}
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
