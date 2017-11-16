import {Component, OnInit, AfterViewInit} from "@angular/core";
import {ReadDatastore} from 'idai-components-2/datastore';

@Component({
    moduleId: module.id,
    templateUrl: './map.html'
})

export class MapComponent implements AfterViewInit {
    // defenition of public parameters for map, ressources and facetted search parameters
    private documents: Array<Document>;
    public map: L.Map;

    constructor(private datastore: ReadDatastore
    ) {}

    ngOnInit(): void {

        let _main = this;

        // initialize map & mapping parameters
        this.map = L.map('map', {
            zoom: 13,
            crs: L.CRS.Simple,
        });

        // add project data
        this.datastore.find({ q: '', type: 'Trench' }).then(
            documents => {
                this.documents = documents;
                console.log(documents);
                let mains = L.geoJSON().addTo(this.map);
                for (let doc of documents) {
                    let geojson = doc.resource.geometry;
                    mains.addData(geojson);
                }
                this.map.fitBounds(mains.getBounds());
            },
            err => console.error(err)
        );

        console.log(this.map.getZoom());
        this.map.on('zoom',function () {
            //console.log(this.getZoom());
            if (this.getZoom() > 4) {
                console.log(_main.getDetailData());
            }
        })

    }

    private getDetailData () {
        return "hm"
    }


}