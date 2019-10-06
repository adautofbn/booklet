import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Injectable()
export class AlertService {
    private keepAfterNavigationChange = false;

    constructor(private router: Router,
        private toastCtrl: ToastController) {
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterNavigationChange) {
                    this.keepAfterNavigationChange = false;
                } else {
                    this.toastCtrl.dismiss();
                }
            }
        });
    }

    public success(message: string) {
       this.showToast(message, 'error');
    }

    public error(message: string) {
        this.showToast(message, 'dark');
    }

    public warn(message: string) {
        this.showToast(message, 'warning');
    }

    public info(message: string) {
        this.showToast(message, 'info');
    }

    public showToast(message: string, color: string) {
        this.toastCtrl.create({
            message: message,
            color: color,
            duration: 3000,
            position: 'bottom',
            showCloseButton: true,
            closeButtonText: 'X'
          }).then((toast) => {
            toast.present();
          });   
    }

}