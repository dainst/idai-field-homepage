import {Component} from "@angular/core";
import {ReadDatastore} from 'idai-components-2/datastore';
import {Router} from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'listing',
    templateUrl: './listing.html'
})
/**
 * @author Daniel de Oliveira
 */
export class ListingComponent {

    private static HINWEIS = "(wähle zunächst einen typ aus, um suchen zu können)";
    public hinweis = ListingComponent.HINWEIS;
    public documents;
    public defaultTypes;

    constructor(private datastore: ReadDatastore,private router:Router) {
        this.find(undefined);
    }

    private find(q) {
        if (!q || !q.type) return;
        this.datastore.find(q).then(results => {
            this.hinweis = undefined;
            this.documents = results;
        },err=>{
            this.hinweis = ListingComponent.HINWEIS;
            console.log(err)
        });
    }

    public queryChanged(q) {
        if (!q || !q.type || q.type=='resource') {
            this.documents = [];
            this.hinweis = ListingComponent.HINWEIS;
            return this.router.navigate(['resources']);
        }
        this.find(q);
    }
}