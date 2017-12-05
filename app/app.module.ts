import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {ReadDatastore} from 'idai-components-2/datastore';
import {IdaiMessagesModule, Messages, MD} from 'idai-components-2/messages';
import {IdaiDocumentsModule, DocumentEditChangeMonitor} from 'idai-components-2/documents';
import {IdaiFieldMapModule} from 'idai-components-2/idai-field-map';
// import {PersistenceManager} from 'idai-components-2/persist';
import {ProjectMapComponent} from './project/map/project-map.component';
import {ConfigLoader} from 'idai-components-2/configuration';
import {routing, appRoutingProviders} from './app.routing';
import {M} from './m';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NavbarComponent} from './navbar.component';
import {JeremyHttpDatastore} from './datastore/jeremy-http-datastore';
import {IdaiWidgetsModule} from 'idai-components-2/widgets';

import CONFIG = require('config/config.json!json');
import {ListingComponent} from './listing/listing.component';
import {ViewComponent} from './listing/view-component';
import {WrapperComponent} from './listing/wrapper-component';
import {ProjectViewComponent} from './project/project-view.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {NothingComponent} from './listing/nothing.component';
import {IdaiFieldAppConfigurator} from 'idai-components-2/idai-field-model';
import {SignInComponent} from './sign-in-component';
import {AuthService} from './auth-service';
import {WelcomeSidebarComponent} from './welcome/welcome-sidebar.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        NgbModule.forRoot(),
        IdaiDocumentsModule,
        IdaiMessagesModule,
        IdaiWidgetsModule,
        IdaiFieldMapModule,
        routing
    ],
    declarations: [
        AppComponent,
        NavbarComponent,
        ListingComponent, // TODO necessary here when shown in outlet?
        ViewComponent, // TODO ?
        WrapperComponent,
        ProjectViewComponent,
        WelcomeSidebarComponent,
        WelcomeComponent,
        NothingComponent,
        SignInComponent,
        ProjectMapComponent
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        JeremyHttpDatastore,
        { provide: ReadDatastore, useExisting: JeremyHttpDatastore },
        {
            provide: Messages,
            useFactory: function(md: MD) {
                return new Messages(md, 3500);
            },
            deps: [MD]
        },
        { provide: MD, useClass: M},
        { provide: 'app.config', useValue: CONFIG },
        ConfigLoader,
        DocumentEditChangeMonitor,
        appRoutingProviders,
        IdaiFieldAppConfigurator,
        AuthService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }