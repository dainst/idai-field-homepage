import {Component, Input} from '@angular/core';

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

}