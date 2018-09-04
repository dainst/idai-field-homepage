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

    private images = [
        {
            url: "https://raw.githubusercontent.com/dainst/idai-field/master/img/README-FEATURES-1.png",
            desc: "Metadata editor"
        },
        {
            url: "https://raw.githubusercontent.com/dainst/idai-field/master/img/README-FEATURES-2.png",
            desc: "Shape editor"
        },
        {
            url: "https://raw.githubusercontent.com/dainst/idai-field/master/img/README-FEATURES-8.png",
            desc: "Matrix view"
        },
        {
            url: "https://raw.githubusercontent.com/dainst/idai-field/master/img/README-FEATURES-6.png",
            desc: "Synchronization"
        },
        {
            url: "https://raw.githubusercontent.com/dainst/idai-field/master/img/README-FEATURES-3.png",
            desc: "Table view"
        },
        {
            url: "https://raw.githubusercontent.com/dainst/idai-field/master/img/README-FEATURES-4.png",
            desc: "Nesting"
        }
    ];

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