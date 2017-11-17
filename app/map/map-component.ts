import {Component, OnInit, AfterViewInit} from "@angular/core";
import {ReadDatastore} from 'idai-components-2/datastore';

@Component({
    moduleId: module.id,
    templateUrl: './map.html'
})

export class MapComponent {
    // defenition of public parameters for map, ressources and facetted search parameters
    private documents: Array<Document>;
    public map: L.Map;
    public mains: L.GeoJSON;
    public docs: L.GeoJSON;

    constructor(private datastore: ReadDatastore
    ) {}

    ngOnInit(): void {
        let _main = this;

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
                _main.mains.setStyle({ opacity: 0.2, fillOpacity: 0.1 });
            }
            if (this.getZoom() == 2) {
                if (_main.map.hasLayer(_main.docs)) {
                    console.log("Removing detailed data.");
                    _main.docs.remove();
                };
            }
        })

    }

    // Function that asks the datastore for detailed data.
    private getDetailData () {
        this.datastore.find({ q: '', project: 'meninx-project'}).then(
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
        this.datastore.find({ q: '', type: 'Trench' }).then(
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