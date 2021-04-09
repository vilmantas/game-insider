import { NgModule } from '@angular/core';
import { ServerComponent } from './server.component';
import { ServerRouterModule } from './server-router.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { ServerStateName } from './state/server.state';
import { serverStateReducer } from './state/reducers/server.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ServerEffects } from './state/effects/server.effects';

@NgModule( {
    declarations: [ServerComponent],
    imports: [
        ServerRouterModule,
        CommonModule,
        FormsModule,
        StoreModule.forFeature(ServerStateName, serverStateReducer),
        EffectsModule.forFeature([ServerEffects])
    ],
    exports: [],
    providers: [],
    entryComponents: []
})
export class ServerModule {
    constructor() {}
}
