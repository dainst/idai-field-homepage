import {Component, SimpleChanges, OnInit} from '@angular/core';
import {MapComponent} from 'idai-components-2/idai-field-map';
import {Messages} from 'idai-components-2/messages';
import {ConfigLoader} from 'idai-components-2/configuration';

@Component({
    moduleId: module.id,
    selector: 'project-map',
    templateUrl: './project-map.html'
})

export class ProjectMapComponent extends MapComponent {

}