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

    private documents: Array<Document>;
    public map: L.Map;
    public baseMaps: any;
    public selectedDocument: any;

    constructor(private datastore: ReadDatastore,
                private router: Router
    ) {}

    ngOnInit() {
        let welcomeComponent = this;

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

        this.map.on('click',function(){
            welcomeComponent.selectedDocument = null;
        })

        // adds map control: layertree, scale
        L.control.zoom({position: 'topleft'}).addTo(this.map);
        L.control.layers(this.baseMaps).addTo(this.map);

        // add project data
        this.datastore.find({ q: '', type: 'Project' }).then(
            documents => {
                this.documents = documents;
                console.log(documents);
                for (let doc of documents) {
                    this.generateMarker(doc);
                }
            },
            err => console.error(err)
        )
    }

    public generateMarker(document: Document) {
        console.log(document)
        let marker = L.marker([document.resource.geometry.coordinates[0], document.resource.geometry.coordinates[1]])
            .addTo(this.map)
            .bindTooltip(document.resource.identifier, {
                direction: 'top',
                opacity: 1.0});

         /*   .bindPopup(
                "<b>" + document.resource.identifier.replace("-project", "").replace("-", " ").toUpperCase() + "</b><br>" +
                "Im Oktober 2015 wurde ein tunesisch-deutsches Feldforschungsprojekt in Meninx, der größten antiken Stadt auf Djerba, begonnen. <br>" +
                "<a href='http://www.klass-archaeologie.uni-muenchen.de/forschung/projekte1/d-projekte-laufend/meninx/index.html'>" + "Projektbeschreibung" + "</a><br>" +
                "<a href='https://gazetteer.dainst.org/place/" + document.resource.hasGazId + "'>" + "Gazetteer" + "</a><br>" +
                "<a class='btn btn-sm btn-primary' style='color:white' href='#/map/" + document.resource.id + "' target='_blank'><span class='glyphicon glyphicon-search' aria-hidden='true'></span>Show project data</a>"
            );
        */

        let welcomeComponent = this;
        marker.on('click', function() {
            console.log(document.resource.identifier);
            welcomeComponent.selectedDocument = document.resource;
            welcomeComponent.selectedDocument.name = welcomeComponent.resolveProjectName(document.resource.identifier);
        });
    }

    public showDocument(identifier: any) {
        this.router.navigate(['resources/show/' + identifier]);
    }

    public resolveProjectName(identifier: any) {
        let projName = identifier.replace("-project", "").replace("-", " ");
        return this.toTitleCase(projName);
    }

    public toTitleCase(string: string)
    {
        return string.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }


}
