import {Component, OnInit} from "@angular/core";
import {JeremyHttpDatastore} from "../datastore/jeremy-http-datastore";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Query} from "idai-components-2/datastore";
import {Document} from "idai-components-2/core";
import {MapComponent} from 'idai-components-2/idai-field-map';

@Component({
    moduleId: module.id,
    templateUrl: './project-view.html'
})

/**
 * @author Philipp Gerth
 */

export class ProjectViewComponent implements OnInit {

    private mainDocuments: Array<Document>;
    private subDocuments: Array<Document>;
    private projectId: string;
    private projectDocument: Document;
    private selectedDocument: Document;


    constructor(private route: ActivatedRoute,private router: Router, private datastore: JeremyHttpDatastore) { }


    ngOnInit(): void {

        this.route.params.forEach((params: Params) => {
            this.projectId = params['id'];
        });

        this.fetchProjectDocument();
        this.fetchMainDocuments();
        this.fetchSubDocuments();
    }


    public selectDocument(document: Document) {
        this.selectedDocument = document;
    }


    private async fetchSubDocuments() {

        try {
            const q: Query = {q: '', types: ['Layer', 'Floor', 'DrillCoreLayer', 'Grave', 'Architecture', 'Other', 'Metal',
                'Pottery', 'Glass', 'Mollusk', 'Brick', 'Wood', 'Bone', 'Terracotta', 'Stone', 'Coin', 'PlasterFragment']};
            q['project'] = this.projectId;
            q['geometry'] = 'Polygon';
            this.subDocuments = await this.datastore.findDocs(q);
        } catch (err) {
            console.error(err);
        }
    }


    private async fetchProjectDocument() {

        try {
            this.projectDocument = await this.datastore.getById(this.projectId);
        } catch (err) {
            console.error(err);
        }
    }


    private async fetchMainDocuments() {

        try {
            const q: Query = {q: '', types: ['Trench']};
            q['project'] = this.projectId;
            this.mainDocuments = await this.datastore.findDocs(q);
        } catch (err) {
            err => console.error(err);
        }
    }
}