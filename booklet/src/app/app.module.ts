import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IonicModule } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { MaterialModule } from './material/material.component';
import { LoginComponent } from './login/login.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment.prod';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FirebaseService } from './_services/firebase.service';
import { AuthService } from './_services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth.guard';
import { MyPlansComponent } from './my-plans/my-plans.component';
import { CreatePlanComponent } from './create-plan/create-plan.component';
import { AllPlansComponent } from './all-plans/all-plans.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AlertService } from './_services/alert.service';

@NgModule({
  declarations: [AppComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    MyPlansComponent,
    CreatePlanComponent,
    AllPlansComponent,
    CalendarComponent],
  entryComponents: [],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FirebaseService,
    AuthService,
    AlertService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
