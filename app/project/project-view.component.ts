import {Component, OnInit} from '@angular/core';
import {JeremyHttpDatastore} from '../datastore/jeremy-http-datastore';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Query} from 'idai-components-2/datastore';
import {Document} from 'idai-components-2/core';

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
    // TODO: more dynamic main Types as declared in Configuration.json
    private mainTypes: Array<string> = ['Trench', 'Survey', 'Building'];


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


    private async fetchProjectDocument() {

        try {
            this.projectDocument = await this.datastore.get(this.projectId);
        } catch (err) {
            console.error(err);
        }
    }


    private async fetchSubDocuments() {

        // TODO: add the following: 'Metal', 'Pottery', 'Glass', 'Mollusk', 'Brick', 'Wood', 'Bone', 'Terracotta', 'Stone', 'Coin', 'PlasterFragment'
        try {
            const q: Query = {q: ''};
            q['project'] = this.projectId;
            q['exists'] = 'geometry';
            q['ignore'] = this.mainTypes;
            this.subDocuments = (await this.datastore.find(q)).documents;
        } catch (err) {
            console.error(err);
        }
    }


    private async fetchMainDocuments() {

        try {
            const q: Query = {q: '', types: this.mainTypes};
            q['project'] = this.projectId;
            this.mainDocuments = (await this.datastore.find(q)).documents;
        } catch (err) {
            err => console.error(err);
        }
    }
}