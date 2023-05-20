import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './Auth/login/login.component';
import {RegisterComponent} from './Auth/register/register.component';
import {ItemsComponent} from './Screens/items/items.component';
import {ItemDetailsComponent} from './Screens/item-details/item-details.component';
import {BuildingsComponent} from './Screens/buildings/buildings.component';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
    },

    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: 'buildings',
        component: BuildingsComponent,
    },
    {
        path: 'items',
        component: ItemsComponent,
    },
    {
        path: 'item-details',
        component: ItemDetailsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
