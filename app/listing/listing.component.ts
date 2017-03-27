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

    constructor(private datastore: ReadDatastore) {
        this.find(undefined);
    }

    private find(q) {
        this.datastore.find(q).then(results => {
            this.documents = results;
        },err=>console.log(err));
    }

    public queryChanged(a) {
        this.find(a);
    }
}