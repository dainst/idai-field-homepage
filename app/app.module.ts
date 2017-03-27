import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {HttpModule, Http} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {Datastore, ReadDatastore} from 'idai-components-2/datastore';
import {IdaiMessagesModule, Messages, MD} from 'idai-components-2/messages';
import {IdaiDocumentsModule, DocumentEditChangeMonitor} from 'idai-components-2/documents';
import {Validator} from 'idai-components-2/persist';
import {PersistenceManager} from 'idai-components-2/persist';
import {ConfigLoader} from 'idai-components-2/configuration';
import {routing} from './app.routing';
import {appRoutingProviders} from './app.routing';
import {M} from './m';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NavbarComponent} from './navbar.component';

import CONFIG = require("config/config.json!json");

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        NgbModule.forRoot(),
        IdaiDocumentsModule,
        IdaiMessagesModule,
        routing
    ],
    declarations: [
        AppComponent,
        NavbarComponent
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: ReadDatastore, useExisting: Datastore },
        Messages,
        { provide: 'app.config', useValue: CONFIG },
        ConfigLoader,
        PersistenceManager,
        DocumentEditChangeMonitor,
        { provide: MD, useClass: M},
        appRoutingProviders
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }