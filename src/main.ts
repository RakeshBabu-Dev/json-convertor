import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { HomeComponent } from './app/components/home/home.component';
import { AppComponent } from './app/app.component';
import { HttpClientModule } from '@angular/common/http';


const routes: Routes = [
  { path: '', component: HomeComponent },
];

bootstrapApplication(AppComponent, {
  providers: [

    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
  ],
}).catch((err) => console.error(err));
