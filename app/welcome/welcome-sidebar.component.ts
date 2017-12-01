import {Component, Input} from '@angular/core';
import {WelcomeComponent} from './welcome.component';

@Component({
    moduleId: module.id,
    selector: 'welcome-sidebar',
    templateUrl: './welcome-sidebar.html'
})
/**
 * @author Philipp Gerth
 */

export class WelcomeSidebarComponent {

    @Input() document: any;

    constructor() {}

}