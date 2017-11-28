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


    constructor(private datastore: ReadDatastore,
                private router: Router) {
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

        this.addProjectData();
    }


    private async addProjectData() {

        try {
            const documents = await this.datastore.find({q: '', type: 'Project'});

            for (let doc of documents) {
                this.generateMarker(doc);
            }
        } catch (err) {
            console.error(err)
        }
    }


    private generateMarker(document: Document) {

        const marker = L.marker([document.resource.geometry.coordinates[0], document.resource.geometry.coordinates[1]])
            .addTo(this.map)
            .bindTooltip(document.resource.identifier, {
                direction: 'top',
                opacity: 1.0});

        marker.on('click', () => {
            this.selectedDocument = document.resource;
            this.selectedDocument.name = WelcomeComponent.resolveProjectName(document.resource.identifier);
        });
    }


    private static resolveProjectName(identifier: any) {

        const projectName = identifier.replace("-project", "").replace("-", " ");
        return WelcomeComponent.convertToTitle(projectName);
    }


    private static convertToTitle(string: string) {

        return string.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }
}
