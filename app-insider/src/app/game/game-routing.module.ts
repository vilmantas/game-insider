import { NgModule } from "@angular/core";
import { GameComponent } from './game.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: GameComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
})
export class GameRoutingModule {

}