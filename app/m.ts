import {Injectable} from "@angular/core";
import {MD,Message} from "idai-components-2/messages"

@Injectable()
/**
 * @author Daniel de Oliveira
 */
export class M extends MD { // = Messages Dictionary. For reasons of brevity of calls to it just "M".

    public static SIGN_IN_SUCCESSFUL : string = 'sign_in/successful';
    public static SIGN_IN_FAILED : string = 'sign_in/failed';

    public msgs : { [id: string]: Message } = {};

    constructor() {
        super();
        this.msgs[M.SIGN_IN_SUCCESSFUL] = {
            content: 'Anmeldung erfolgreich.',
            level: 'success',
            params: [],
            hidden: false
        };
        this.msgs[M.SIGN_IN_FAILED] = {
            content: 'Anmeldung gescheitert',
            level: 'danger',
            params: [],
            hidden: false
        };
    }
}