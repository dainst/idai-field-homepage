import {Component, OnInit} from "@angular/core";
import {JeremyHttpDatastore} from "../datastore/jeremy-http-datastore";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Query} from "idai-components-2/datastore";
import {Document} from "idai-components-2/core";

@Component({
    moduleId: module.id,
    templateUrl: './map.html'
})

/**
 * @author Philipp Gerth
 */

export class MapComponent implements OnInit {
    private documents: Array<Document>;
    private map: L.Map;
    private mains: L.GeoJSON;
    private docs: L.GeoJSON;
    private project: string;


    constructor(private route: ActivatedRoute,private router: Router, private datastore: JeremyHttpDatastore) { }


    ngOnInit(): void {

        this.route.params.forEach((params: Params) => {
            this.project = params['id'];
        });

        this.map = L.map('map', {
            zoom: 5,
            crs: L.CRS.Simple,
        });

        this.mains = L.geoJSON().addTo(this.map);
        this.docs = L.geoJSON();

        this.getMainOperations();
        this.getDetailData();
        this.defineMapBehavior();
    }


    private async getDetailData () {

        try {
            const q: Query = {q: '', types: ['Layer']};
            q['project'] = this.project;
            q['geometry'] = 'Polygon';
            const documents = await this.datastore.find(q);
            this.createGeoJsonObjects(documents, this.docs);
        } catch (err) {
            console.error(err)
        }
    }


    private async getMainOperations () {

        try {
            const q: Query = {q: '', types: ['Trench']};
            q['project'] = this.project;
            const documents = await this.datastore.find(q);
            this.createGeoJsonObjects(documents, this.mains);
            this.map.fitBounds(this.mains.getBounds());
        } catch (err) {
            err => console.error(err)
        }
    }


    private createGeoJsonObjects (docs: Document[], object: L.GeoJSON) {

        for (let doc of docs) {
            let geojson = doc.resource.geometry;
            object.addData(geojson);
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