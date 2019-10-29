import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Página Inicial',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Perfil',
      url: '/perfil',
      icon: 'md-person'
    },
    {
      title: 'Criar plano de aula',
      url: '/create-plan',
      icon: 'ios-create'
    },
    {
      title: 'Meus planos de aula',
      url: '/my-plans',
      icon: 'ios-copy'
    },
    {
      title: 'Todos os planos de aula',
      url: '/all-plans',
      icon: 'md-filing'
    },
    {
      title: 'Calendário',
      url: '/calendar',
      icon: 'md-calendar'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private menu: MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logout() {
    this.authService.doLogout();
  }
}
