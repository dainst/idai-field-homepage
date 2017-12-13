import {ActivatedRoute, Params} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {JeremyHttpDatastore} from '../datastore/jeremy-http-datastore';

@Component({
    moduleId: module.id,
    templateUrl: './view.html'
})
/**
 * @author Daniel de Oliveira
 */
export class ViewComponent implements OnInit {

    private doc;

    constructor(
        private route: ActivatedRoute,
        private datastore: JeremyHttpDatastore) { }


    ngOnInit() {

        this.route.params.forEach((params: Params) => {
            this.datastore.get(params['id']).then(doc => this.doc = doc,
                err=>console.error("err in View component",err))
        })
    }
}

