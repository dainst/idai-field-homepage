import {Component} from "@angular/core";
import {Messages} from 'idai-components-2/messages';
import {AuthService} from "./auth-service";

@Component({
    moduleId: module.id,
    selector: 'navbar',
    templateUrl: './navbar.html'
})
/**
 * @author Sebastian Cuy
 * @author Thomas Kleinke
 * @author Daniel de Oliveira
 */
export class NavbarComponent {

    private username;

    constructor(private messages: Messages, private authService: AuthService) {
        authService.username().subscribe(usr=>{
            this.username = usr;
        })
    }

    public setMessagesHidden(shown) {
        this.messages.setHidden(!shown);
    }

    public signOut() {
        this.authService.signOut();
    }
}