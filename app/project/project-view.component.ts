import {Component, OnInit} from "@angular/core";
import {JeremyHttpDatastore} from "../datastore/jeremy-http-datastore";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Query} from "idai-components-2/datastore";
import {Document} from "idai-components-2/core";
import {MapComponent} from 'idai-components-2/idai-field-map';

@Component({
    moduleId: module.id,
    templateUrl: './project-view.html'
})

/**
 * @author Philipp Gerth
 */

export class ProjectViewComponent implements OnInit {
    private documents: Array<Document>;
    private map: L.Map;
    private mains: L.GeoJSON;
    private docs: L.GeoJSON;
    private projectId: string;
    private projectDocument: Document;
    private selectedDocument: Document;


    constructor(private route: ActivatedRoute,private router: Router, private datastore: JeremyHttpDatastore) { }


    ngOnInit(): void {

        this.route.params.forEach((params: Params) => {
            this.projectId = params['id'];
        });

        this.fetchProjectDocument();
        this.fetchMainOperations();
    }


    public selectDocument(document: Document) {
        this.selectedDocument = document;
    }


    private async getDetailData() {

        try {
            const q: Query = {q: '', types: ['Layer']};
            q['project'] = this.projectId;
            q['geometry'] = 'Polygon';
            this.documents = await this.datastore.find(q);
            console.log(this.documents);
            // this.createGeoJsonObjects(this.documents, this.docs);
        } catch (err) {
            console.error(err)
        }
    }


    private async fetchProjectDocument() {

        try {
            this.projectDocument = await this.datastore.getById(this.projectId);
        } catch (err) {
            console.error(err)
        }
    }


    private async fetchMainOperations() {

        try {
            const q: Query = {q: '', types: ['Trench']};
            q['project'] = this.projectId;
            this.documents = await this.datastore.find(q);
            console.log(this.documents);
            // this.createGeoJsonObjects(this.documents, this.mains);
            // this.map.fitBounds(this.mains.getBounds());
        } catch (err) {
            err => console.error(err)
        }
    }


    private defineMapBehavior() {

        // Map event handling. Change layer on specific zoom level.
        this.map.on('zoom',() => {
            if (this.map.getZoom() == 4) {
                this.docs.addTo(this.map);
                this.mains.setStyle({ opacity: 1, fillOpacity: 0, dashArray: '10,10' } as any);
            }
            if (this.map.getZoom() == 2) {
                if (this.map.hasLayer(this.docs)) {
                    this.docs.remove();
                    this.mains.setStyle({ opacity: 1, fillOpacity: 0.5, dashArray: '0'  } as any);
                }
            }
        })
    }
}