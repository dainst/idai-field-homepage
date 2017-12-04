import {Component, Input} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    moduleId: module.id,
    selector: 'welcome-sidebar',
    templateUrl: './welcome-sidebar.html',
})
/**
 * @author Philipp Gerth
 */

export class WelcomeSidebarComponent {

    @Input() document: any;

    constructor(private sanitization:DomSanitizer) {}


    private changeColor() {

        return this.sanitization.bypassSecurityTrustStyle('color:#2A2B2C'); 
    }
}