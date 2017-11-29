import {Component, OnInit} from "@angular/core";
import {JeremyHttpDatastore} from "../datastore/jeremy-http-datastore";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
    moduleId: module.id,
    templateUrl: './map.html'
})

/**
 * @author Philipp Gerth
 */

export class MapComponent implements OnInit {
    // defenition of public parameters for map, ressources and facetted search parameters
    // TODO: Remove documents?
    private documents: Array<Document>;
    private map: L.Map;
    private mains: L.GeoJSON;
    private docs: L.GeoJSON;
    private project: string;


    constructor(private route: ActivatedRoute, private datastore: JeremyHttpDatastore) { }


    ngOnInit(): void {

        this.route.params.forEach((params: Params) => {
            this.project = params['id'];
        });

        this.map = L.map('map', {
            zoom: 5,
            crs: L.CRS.Simple,
        });

        this.getMainOps();
        this.getDetailData();

        // Map event handling. Change layer on specific zoom level.
        // TODO: defineMapHandler
        this.map.on('zoom',() => {
            console.log("Zoom level: " + this.map.getZoom())
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


    // TODO: Function async awaits
    private getDetailData () {

        this.datastore.find({ q: '', project: this.project, geometry: 'Polygon', type: 'Layer' } as any).then(
            documents => {
                this.docs = L.geoJSON();
                for (let doc of documents) {
                    let geojson = doc.resource.geometry;
                    this.docs.addData(geojson);
                }
            },
            err => console.error(err)
        );
    }


    // Function that calls the asks for main operations, like trenches.
    // TODO: Function async awaits
    private getMainOps () {

        this.datastore.find({ q: '', project: this.project, type: 'Trench' } as any).then(
            documents => {
                this.mains = L.geoJSON().addTo(this.map);
                for (let doc of documents) {
                    let geojson = doc.resource.geometry;
                    this.mains.addData(geojson);
                }
                this.map.fitBounds(this.mains.getBounds());
            },
            err => console.error(err)
        );
    }
}