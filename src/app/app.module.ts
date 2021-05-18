import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppareilComponent } from './appareil/appareil.component';
import { AppareilService } from './services/appareil.service';
import { AjoutComponent } from './ajout/ajout.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

// je declare le tableau objet routes
let routes:any[]=
[
  {path:'', component:HomeComponent},
  {path:'appareil', component : HomeComponent},
  {path:'appareil/view/:id', component : AppareilComponent},
  {path:'ajout', component:AjoutComponent},
  {path:'**', component:HomeComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    AppareilComponent,
    AjoutComponent,
    HomeComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AppareilService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
