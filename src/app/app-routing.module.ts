import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './Auth/login/login.component';
import {RegisterComponent} from './Auth/register/register.component';
import {ItemsComponent} from './Screens/items/items.component';
import {BuildingsComponent} from './Screens/buildings/buildings.component';
import {AuthGuard} from './guards/auth.guard';
import {WorkspacesComponent} from './Screens/workspaces/workspaces.component';
import {ChangePasswordComponent} from './Auth/change-password/change-password.component';
import {ManageUsersComponent} from './Screens/manage-users/manage-users.component';
import {AddWorkspaceComponent} from './Screens/add-workspace/add-workspace.component';

import {EditItemComponent} from './Screens/edit-item/edit-item.component';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
    },

    {
        path: 'change-password',
        component: ChangePasswordComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'register/:id',
        component: RegisterComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'manage-users',
        component: ManageUsersComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'buildings',
        component: BuildingsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'workspaces/:id',
        component: WorkspacesComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'edit-item/:workspaceId/:itemId',
        component: EditItemComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'items/:id',
        component: ItemsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'add-workspace/:id',
        component: AddWorkspaceComponent,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
