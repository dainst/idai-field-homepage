import {Routes,RouterModule} from '@angular/router';
import {ListingComponent} from "./listing/listing.component";
import {ViewComponent} from "./listing/view-component";
import {WrapperComponent} from "./listing/wrapper-component";
import {WelcomeComponent} from "./welcome.component";
import {NothingComponent} from "./listing/nothing.component";


const routes: Routes = [
    {
        path: '',
        component: WelcomeComponent,
    },
    {
        path: 'resources',
        component: WrapperComponent,
        children: [{
            path: 'show/:type/:id',
            component: ViewComponent
        },{ path: '', component: NothingComponent}]
    },
];

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(routes);