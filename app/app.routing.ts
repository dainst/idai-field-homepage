import {Routes,RouterModule} from '@angular/router';
import {ListingComponent} from "./listing/listing.component";
import {ViewComponent} from "./listing/view-component";
import {WrapperComponent} from "./listing/wrapper-component";


const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {

        path: 'home',
        component: WrapperComponent,
        children: [{ path: '', redirectTo: 'show'},{
            path: 'show',
            component: ViewComponent
        }]
    }
];

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(routes);