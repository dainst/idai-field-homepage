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

    public documents;
    public defaultTypes;

    public projects = [
        { value: 'all', display: 'Alle' },
        { value: 'pergamon', display: 'Pergamon' },
        { value: 'pgerth', display: 'Philipp' },
        { value: 'fzavodnik', display: 'Fabian' },
        { value: 'jwieners', display: 'Jan' },
        { value: 'scuy', display: 'Sebastian' },
        { value: 'tkleinke', display: 'Thomas' },
        { value: 'doliveira', display: 'Daniel' }
    ];

    public selectedProject = 'all';
    private q;

    constructor(private datastore: ReadDatastore,private router:Router) {
        this.find(undefined);
    }

    private find(q) {
        console.log("this.selec",this.selectedProject)
        if (!q) {
            q = {
                type: '_'
            }
        }
        if (q.type == 'resource') q.type = '_';

        if (this.selectedProject != 'all') {
            q.project = this.selectedProject;
        } else if (q.project) delete q.project;

        this.datastore.find(q).then(results => {
            this.documents = results;
            this.q = q;
        },err=>{
            console.log(err)
        });
    }

    public queryChanged(q) {

        if (!q) {
            this.documents = [];
            return this.router.navigate(['resources']);
        }

        this.find(q);
    }

    public radioSelect(event) {
        this.find(this.q);
    }
}