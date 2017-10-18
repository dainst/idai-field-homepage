import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
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

    constructor(private datastore: ReadDatastore,
                private router: Router
    ) {}

    ngOnInit() {

        this.datastore.find({ q: '', type: 'Project' }).then(
            documents => {this.documents = documents; console.log(documents)},
            err => console.error(err)
        )
    }

    public showDocument(document: Document) {
        this.router.navigate(['resources/show/' + document.resource.id]);
        
    }



}
