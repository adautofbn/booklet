import { NgModule, LOCALE_ID } from '@angular/core';
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
import { PlanPageComponent } from './plan-page/plan-page.component';
import { NgCalendarModule  } from 'ionic2-calendar';

import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { CreateEventDialogComponent } from './_dialogs/create-event-dialog/create-event-dialog.component';
import { EventPageComponent } from './event-page/event-page.component';
import { PerfilComponent } from './perfil/perfil.component';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';

registerLocaleData(ptBr)

@NgModule({
  declarations: [AppComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    MyPlansComponent,
    CreatePlanComponent,
    AllPlansComponent,
    CalendarComponent,
    PlanPageComponent,
    CreateEventDialogComponent,
    EventPageComponent,
    PerfilComponent],
  entryComponents: [CreateEventDialogComponent],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    NgCalendarModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FirebaseService,
    AuthService,
    AlertService,
    AuthGuard,
    File,
    FileOpener,
    AndroidPermissions,
    Diagnostic,
    { provide: LOCALE_ID, useValue: 'pt' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
