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
    public map: L.Map;
    public baseMaps: any;

    constructor(private datastore: ReadDatastore,
                private router: Router
    ) {}

    ngOnInit() {

        this.baseMaps = {
            OpenStreetMap: L.tileLayer("http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a></a>'
            }),
            RomanEmpire: L.tileLayer("http://dare.ht.lu.se/tiles/imperium/{z}/{x}/{y}.png", {
                attribution: '&copy; <a href="http://dare.ht.lu.se/">Digital Atlas of the Roman Empire</a></a>'
            }),
            CartoDB: L.tileLayer("http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png", {
                attribution: '&copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
            })
        };

        // initialize map & mapping parameters
        this.map = L.map('projectMap', {
            center: new L.LatLng(40, 15),
            zoomControl: false,
            zoom: 5,
            layers: [this.baseMaps.CartoDB],
        });

        // adds map control: layertree, scale
        L.control.zoom({position: 'topleft'}).addTo(this.map);
        L.control.layers(this.baseMaps).addTo(this.map);
        L.control.scale().addTo(this.map);

        // add project data
        this.datastore.find({ q: '', type: 'Project' }).then(
            documents => {this.documents = documents; console.log(documents)},
            err => console.error(err)
        )
    }

    public showDocument(document: Document) {
        this.router.navigate(['resources/show/' + document.resource.id]);

        /*
        let popup = L.popup()
            .setLatLng(document.resource.geometry.coordinates[0], document.resource.geometry.coordinates[1])
            .setContent('<p>TITLE<br />' + document.resource.type)
            .openOn(this.map);
        */
        // alert(document.resource.geometry.coordinates[0]);
    }



}
