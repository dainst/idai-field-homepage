import {Component} from "@angular/core";
import {AuthService} from "./auth-service";
import {Messages} from 'idai-components-2/messages';
import {M} from "./m";

@Component({
    moduleId: module.id,
    templateUrl: './sign-in.html'
})
/**
 * @author Daniel de Oliveira
 */
export class SignInComponent {

    constructor(
        private authService:AuthService,
        private messages: Messages
    ) { }

    public go(usr,pwd) {
        this.authService.setCredentials(usr,pwd).then(()=>{
            this.messages.add([M.SIGN_IN_SUCCESSFUL]);
        },()=>{
            this.messages.add([M.SIGN_IN_FAILED]);
        })
    }
}

