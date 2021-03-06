import {Component} from '@angular/core';
import {ReadDatastore} from 'idai-components-2/datastore';
import {Router} from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'project-listing',
    templateUrl: './listing.html'
})
/**
 * @author Daniel de Oliveira
 */
export class ListingComponent {

    public documents;

    public projects = [
        { value: 'all', display: 'Alle' },
        { value: 'monte-turcisi-project', display: 'Monte Turcisi' },
        { value: 'meninx-project', display: 'Meninx' }
    ];

    public selectedProject = 'all';
    private q;

    constructor(private datastore: ReadDatastore,
                private router: Router) {
        this.find(undefined);
    }

    private find(q) {
        if (!q) {
            q = {
            }
        }
        if (q.type == 'resource') q.type = '_';

        if (this.selectedProject != 'all') {
            q.project = this.selectedProject;
        } else if (q.project) delete q.project;

        this.datastore.find(q).then(results => {
            this.documents = results;
            this.q = q;
        }, err => {
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

    public selectProject(event) {
        this.find(this.q);
    }
}