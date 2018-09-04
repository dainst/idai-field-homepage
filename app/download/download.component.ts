import {Component, OnInit} from '@angular/core';
import {Http, Headers} from '@angular/http';

@Component({
    moduleId: module.id,
    templateUrl: './download.html'
})

/**
 * @author Sebastian Cuy
 */

export class DownloadComponent implements OnInit {

    private GH_RELEASES_URL = "https://api.github.com/repos/dainst/idai-field/releases";

    private latestTag: string;

    constructor(private http:Http){ }

    ngOnInit(): void {

        const httpOptions = {
            headers: new Headers({
                'Accept':  'application/vnd.github.v3+json'
            })
        };

        this.http.get(this.GH_RELEASES_URL, httpOptions)
            .subscribe(response => {
                this.latestTag = response.json()[0].tag_name.substr(1);
            });

    }

}