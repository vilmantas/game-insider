import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { ServerComponent } from './server.component';

const routes: Routes = [
    {
        path: '',
        component: ServerComponent
    }
]

@NgModule( {
    imports: [ RouterModule.forChild(routes) ]
})
export class ServerRouterModule {
    constructor() {}
}
