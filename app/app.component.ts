import {Component, OnInit, Inject} from '@angular/core';
import {Router, Event, NavigationStart} from '@angular/router';
import {Messages} from 'idai-components-2/messages';
import {ConfigLoader,
    ConfigurationPreprocessor,
    ConfigurationValidator} from 'idai-components-2/configuration';
import {AppConfigurator} from 'idai-components-2/idai-field-model';

@Component({
    moduleId: module.id,
    selector: 'idai-field-app',
    templateUrl: './app.html'
})
/**
 * @author Sebastian Cuy
 * @author Thomas Kleinke
 * @author Daniel de Oliveira
 */
export class AppComponent implements OnInit {

    public static PROJECT_CONFIGURATION_PATH = 'config/Configuration.json';

    constructor(@Inject('app.config') private config,
                private configLoader: ConfigLoader,
                private router: Router,
                private messages: Messages,
                private appConfigurator: AppConfigurator


    ) {

        // To get rid of stale messages when changing routes.
        // Note that if you want show a message to the user
        // on changing route, you have to write something
        // like
        // { router.navigate(['target']); messages.add(['some']); }
        //
        router.events.subscribe( (event:Event) => {
            if(event instanceof NavigationStart) {
                this.messages.clear();
            }
        });
    }

    ngOnInit() {
        this.appConfigurator.go(AppComponent.PROJECT_CONFIGURATION_PATH);
        this.configLoader.getProjectConfiguration().then(
            conf => {
                if (!conf.getProjectIdentifier()) {
                    // this.messages.add([M.APP_NO_PROJECT_IDENTIFIER]);
                }
            }
        ).catch(msgWithParams => {
            this.messages.add(msgWithParams);
        });

    }
}
