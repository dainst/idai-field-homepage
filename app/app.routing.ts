import {Routes,RouterModule} from '@angular/router';


const routes: Routes = [
    { path: '', redirectTo: 'resources', pathMatch: 'full' },
];

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(routes);