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
import { NavbarComponent } from './components/navbar/navbar.component';
import { ItemsComponent } from './Screens/items/items.component';
import { ItemDetailsComponent } from './Screens/item-details/item-details.component';

@NgModule({
    declarations: [AppComponent, LoginComponent, RegisterComponent, FooterComponent, NavbarComponent, ItemsComponent, ItemDetailsComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialExampleModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgxsModule.forRoot([]),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
