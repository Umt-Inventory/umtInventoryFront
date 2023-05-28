import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './Auth/login/login.component';
import {RegisterComponent} from './Auth/register/register.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialExampleModule} from './material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {FooterComponent} from './components/footer/footer.component';
import {NgxsModule} from '@ngxs/store';
import {NavbarComponent} from './components/navbar/navbar.component';
import {ItemsComponent} from './Screens/items/items.component';
import {ItemDetailsComponent} from './Screens/item-details/item-details.component';
import {BuildingsComponent} from './Screens/buildings/buildings.component';
import {WorkspacesComponent} from './Screens/workspaces/workspaces.component';
import {ChangePasswordComponent} from './Auth/change-password/change-password.component';
import {LoadingComponent} from './components/loading/loading.component';
import {ToastrModule} from 'ngx-toastr';
import {ManageUsersComponent} from './Screens/manage-users/manage-users.component';
import {AddWorkspaceComponent} from './Screens/add-workspace/add-workspace.component';
import {DialogItemComponent} from './components/dialog-item/dialog-item.component';
import {MatDialogModule} from '@angular/material/dialog';
import {EditItemComponent} from './Screens/edit-item/edit-item.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        FooterComponent,
        NavbarComponent,
        ItemsComponent,
        ItemDetailsComponent,
        BuildingsComponent,
        WorkspacesComponent,
        ChangePasswordComponent,
        LoadingComponent,
        ManageUsersComponent,
        AddWorkspaceComponent,

        DialogItemComponent,
        EditItemComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialExampleModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        NgxsModule.forRoot([]),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
