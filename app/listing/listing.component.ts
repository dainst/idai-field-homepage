import {Component} from "@angular/core";
import {ReadDatastore} from 'idai-components-2/datastore';

@Component({
    moduleId: module.id,
    templateUrl: './listing.html'
})
/**
 * @author Daniel de Oliveira
 */
export class ListingComponent {

    public documents;

    constructor(datastore: ReadDatastore) {
        datastore.find(undefined).then(results => {
            this.documents = results;
        },err=>console.log(err));
    }
}