import {Component, Input, Output, EventEmitter} from '@angular/core';
import {MapComponent} from 'idai-components-2/idai-field-map';
import {IdaiFieldDocument} from 'idai-components-2/idai-field-model';

@Component({
    moduleId: module.id,
    selector: 'project-map',
    templateUrl: './project-map.html'
})

export class ProjectMapComponent extends MapComponent {

    @Input() mainDocuments: Array<IdaiFieldDocument>;
    @Input() subDocuments: Array<IdaiFieldDocument>;
    @Input() selectedDocument: IdaiFieldDocument;
    @Input() mainTypeDocument: IdaiFieldDocument;
    @Input() projectDocument: IdaiFieldDocument;
    @Input() update: boolean;

    @Output() onSelectDocument: EventEmitter<IdaiFieldDocument> = new EventEmitter<IdaiFieldDocument>();

    private showSubDocuments: Boolean;


    protected createMap(): L.Map {

        const map: L.Map = super.createMap();

        map.on('zoom', () => {
            if (map.getZoom() >= 4 && !this.showSubDocuments) {
                this.showSubDocuments = true;
                this.resetMap();
            }
            else if (map.getZoom() < 4 && this.showSubDocuments) {
                this.showSubDocuments = false;
                this.resetMap();
            }
        });

        return map;
    }


    protected resetMap() {

        this.mainTypeDocument = this.projectDocument;
        super.clearMap();
        this.addGeometriesToMap();
    }


    protected addGeometriesToMap() {

        this.bounds = [];

        super.addMainTypeDocumentGeometryToMap();

        if (this.mainDocuments) {
            for (let document of this.mainDocuments) {
                if (document.resource.geometry) {
                    if (this.showSubDocuments) this.mainTypeDocument = document;
                    super.addGeometryToMap(document);
                }
            }
        }

        if (this.subDocuments && this.showSubDocuments) {
            for (let document of this.subDocuments) {
                if (document.resource.geometry) super.addGeometryToMap(document);
            }
        }
    }
}