import { NgModule } from '@angular/core';
import { ClientRouterModule } from './client-router.module';
import { ClientComponent } from './client.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { ClientStateName } from './state/client.state';
import { clientReducer } from './state/reducers/client.reducer';
import { ClientEffects } from './state/effects/client.effects';
import { EffectsModule } from '@ngrx/effects';
import { ClientLobbyComponent } from './components/lobby/lobby.component';

@NgModule({
    declarations: [ClientComponent, ClientLobbyComponent],
    exports: [],
    imports: [
        ClientRouterModule,
        CommonModule,
        FormsModule,
        StoreModule.forFeature(ClientStateName, clientReducer),
        EffectsModule.forFeature([ClientEffects]),
    ],
    providers: [],
})
export class ClientModule {
    constructor() { }
}
