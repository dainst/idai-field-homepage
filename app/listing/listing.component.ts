import {Component} from "@angular/core";
import {ReadDatastore} from 'idai-components-2/datastore';

@Component({
    moduleId: module.id,
    selector: 'listing',
    templateUrl: './listing.html'
})
/**
 * @author Daniel de Oliveira
 */
export class ListingComponent {

    public documents;
    public defaultTypes;

    constructor(private datastore: ReadDatastore) {
        this.find(undefined);
    }

    private find(q) {
        if (!q || !q.type) return;
        this.datastore.find(q).then(results => {
            this.documents = results;
        },err=>console.log(err));
    }

    public queryChanged(q) {
        this.find(q);
    }
}