import {Component, OnInit} from '@angular/core';
import {ReadDatastore} from 'idai-components-2/datastore';
import {Document} from 'idai-components-2/core';

@Component({
    moduleId: module.id,
    templateUrl: './welcome.html'
})
/**
 * @author Daniel de Oliveira
 * @author Thomas Kleinke
 */
export class WelcomeComponent implements OnInit {

    private documents: Array<Document>;

    constructor(private datastore: ReadDatastore) {}

    ngOnInit() {

        this.datastore.find({ q: '', type: '_' }).then(
            documents => this.documents = documents,
            err => console.error(err)
        )
    }

}
