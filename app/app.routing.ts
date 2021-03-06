import {Routes,RouterModule} from '@angular/router';
import {ListingComponent} from "./listing/listing.component";
import {ViewComponent} from "./listing/view-component";
import {WrapperComponent} from "./listing/wrapper-component";
import {ProjectViewComponent} from "./project/project-view.component";
import {WelcomeComponent} from "./welcome/welcome.component";
import {NothingComponent} from "./listing/nothing.component";
import {SignInComponent} from "./sign-in-component";
import {DownloadComponent} from "./download/download.component";


const routes: Routes = [
    {
        path: '',
        component: DownloadComponent,
    },
    {
        path: 'download',
        component: DownloadComponent
    },
    {
        path: 'resources',
        component: WrapperComponent,
        children: [{
            path: 'show/:id',
            component: ViewComponent
        },
        {
            path: '',
            component: NothingComponent
        }]
    },
    {
        path: 'map/:id',
        component: ProjectViewComponent,
        children: [{
            path: '',
            component: NothingComponent
        }]
    },
    {
        path: 'sign_in',
        component: SignInComponent
    }
];

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(routes);