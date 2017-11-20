import {Component, OnInit, AfterViewInit} from "@angular/core";
import {ReadDatastore} from 'idai-components-2/datastore';
import {JeremyHttpDatastore} from "../datastore/jeremy-http-datastore";
import {ActivatedRoute, Params, Router, NavigationEnd} from "@angular/router";

@Component({
    moduleId: module.id,
    templateUrl: './map.html'
})

/**
 * @author Philipp Gerth
 */

export class MapComponent implements OnInit {
    // defenition of public parameters for map, ressources and facetted search parameters
    private documents: Array<Document>;
    private map: L.Map;
    private mains: L.GeoJSON;
    private docs: L.GeoJSON;
    private project: string;

    constructor(private route: ActivatedRoute,private router: Router, private datastore: JeremyHttpDatastore) { }

    ngOnInit(): void {
        let _main = this;

        this.route.params.forEach((params: Params) => {
            this.project = params['id'];
        })

        // initialize map & mapping parameters
        this.map = L.map('map', {
            zoom: 5,
            crs: L.CRS.Simple,
        });

        this.getMainOps();
        this.getDetailData();

        // Map event handling. Change layer on specific zoom level.
        this.map.on('zoom',function () {
            console.log("Zoom level: " + this.getZoom())
            if (this.getZoom() == 4) {
                _main.docs.addTo(_main.map);
                _main.mains.setStyle({ opacity: 1, fillOpacity: 0, dashArray: '10,10' });
            }
            if (this.getZoom() == 2) {
                if (_main.map.hasLayer(_main.docs)) {
                    _main.docs.remove();
                    _main.mains.setStyle({ opacity: 1, fillOpacity: 0.5, dashArray: '0'  });
                }
            }
        })

    }

    // Function that asks the datastore for detailed data.
    private getDetailData () {
        this.datastore.find({ q: '', project: this.project, geometry: 'Polygon', type: 'Layer' }).then(
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
    private getMainOps () {
        this.datastore.find({ q: '', project: this.project, type: 'Trench' }).then(
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