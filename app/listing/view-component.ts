import {ActivatedRoute, Params, Router, NavigationEnd} from "@angular/router";
import {Component,OnInit} from "@angular/core";
import {ReadDatastore} from 'idai-components-2/datastore'
import {JeremyHttpDatastore} from "../datastore/jeremy-http-datastore";

@Component({
    moduleId: module.id,
    templateUrl: './view.html'
})
/**
 * @author Daniel de Oliveira
 */
export class ViewComponent implements OnInit {

    private inLoop = false;
    private doc;

    constructor(private route: ActivatedRoute,private router: Router, private datastore: JeremyHttpDatastore) { }

    ngOnInit() {

        this.route.params.forEach((params: Params) => {
            this.datastore.getById(params['id']).then(doc=>{
                this.doc = doc;
            },
            err=>console.error("err in View component",err))
        })

    }

}

