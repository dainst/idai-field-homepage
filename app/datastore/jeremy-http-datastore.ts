import {Http} from '@angular/http';
import {Query} from "idai-components-2/datastore";
import {Document} from "idai-components-2/core";
import {ReadDatastore} from 'idai-components-2/datastore'
import {Injectable} from "@angular/core";
import {AuthService} from "../auth-service";
import {Observable} from 'rxjs/Observable';


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


        const type = query.types && query.types.length > 0 ? query.types[0] : undefined;

        return new Promise<any>((resolve,reject)=>{

            let q = query.q == undefined || query.q == "" ? "*" : query.q + "*";

            if (query['project'] !== undefined || query['project'] == "") {
                q = q+" AND dataset:\""+query['project']+"\"";
            }
            if (type !== undefined || type == "") {
                q = q+" AND resource.type:"+type;
            }
            if (query['geometry'] !== undefined || type == "") {
                q = q+" AND resource.geometry.type:"+query['geometry'];
            }

            // TODO: Removal of geometry restriction after implementation of Exists ES Query in Jeremy #7116
            this.http.get('/data/resource/?q='+q+"&size=1000",{headers: this.authService.getHeaders()}
                ).subscribe(response => {
                let objects = JSON.parse(response['_body']).results;

                resolve(objects);

            },error=>reject(error));
        });
    }


    remoteChangesNotifications(): Observable<Document> {

        return undefined;
    }
}
