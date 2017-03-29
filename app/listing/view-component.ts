import {ActivatedRoute, Params, Router, NavigationEnd} from "@angular/router";
import {Component,OnInit} from "@angular/core";
import {ReadDatastore} from 'idai-components-2/datastore'

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

    constructor(private route: ActivatedRoute,private router: Router, private datastore: ReadDatastore) { }

    ngOnInit() {
        this.router.events.subscribe((val) => {

                if (!this.inLoop) {
                    this.inLoop = true;
                    if (val instanceof NavigationEnd) {
                        this.route.params.forEach((params: Params) => {
                            this.datastore.get(params['id']).then(doc=>{
                                    this.doc = doc;
                                    this.inLoop = false;
                                },
                                err=>console.error("err in View compon",err))
                        });
                    }
                }
            }
        );
    }

}
