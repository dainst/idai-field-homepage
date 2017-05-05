import {Routes,RouterModule} from '@angular/router';
import {ListingComponent} from "./listing/listing.component";
import {ViewComponent} from "./listing/view-component";
import {WrapperComponent} from "./listing/wrapper-component";
import {WelcomeComponent} from "./welcome.component";
import {NothingComponent} from "./listing/nothing.component";
import {SignInComponent} from "./sign-in-component";


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
        },
        {
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