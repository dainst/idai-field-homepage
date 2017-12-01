import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ReadDatastore} from 'idai-components-2/datastore';
import {Document} from 'idai-components-2/core';
import {TitleGenerator} from "./title-generator";

@Component({
    moduleId: module.id,
    templateUrl: './welcome.html'
})
/**
 * @author Daniel de Oliveira
 * @author Thomas Kleinke
 * @author Philipp Gerth
 */
export class WelcomeComponent implements OnInit {

    public map: L.Map;

    public selectedDocument: any;

    private static baseMaps: any = {
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


    constructor(private datastore: ReadDatastore) {
    }


    ngOnInit() {

        this.map = L.map('projectMap', {
            center: new L.LatLng(40, 15),
            zoomControl: false,
            zoom: 5,
            layers: [WelcomeComponent.baseMaps.CartoDB],
        });

        this.map.on('click', () => {
            this.selectedDocument = null;
        });

        // adds map control: layertree, scale
        L.control.zoom({position: 'topleft'}).addTo(this.map);
        L.control.layers(WelcomeComponent.baseMaps).addTo(this.map);

        this.addProjects();
    }


    private async addProjects() {

        try {
            const documents = await this.datastore.find({q: '', types: ['Project']} as any);
            this.addMarkersToMap(documents);

        } catch (err) {
            console.error(err)
        }
    }


    private addMarkersToMap(documents: Document[]) {

        for (let doc of documents) {
            const marker = WelcomeComponent.generateMarker(doc);
            marker.addTo(this.map);
            marker.on('click', () => this.selectDocumentOnSidebar(doc));
        }
    }


    private selectDocumentOnSidebar(doc: Document) {

        this.selectedDocument = doc.resource;
        this.selectedDocument.name = TitleGenerator.resolveProjectName(doc.resource.identifier);
    }


    private static generateMarker(document: Document) {

        return L.marker([document.resource.geometry.coordinates[0], document.resource.geometry.coordinates[1]])
            .bindTooltip(document.resource.identifier, {
                direction: 'top',
                opacity: 1.0});
    }
}
