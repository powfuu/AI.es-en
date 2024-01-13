import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular/standalone';

export class ToastOptions {
  header?: string = '';
  message: string = '';
  duration? = 2500;
  showCloseButton? = false;
  color?: string = '';
  cssClass? = 'mm-toast';

  constructor(options: any) {
    this.message = options['message'] || this.message;
    this.duration = options['duration'] || this.duration;
    this.showCloseButton = options['showCloseButton'] || this.showCloseButton;
    this.color = options['color'] || this.color;
    this.cssClass = options['cssClass'] || this.cssClass;
  }
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toast: any;

  constructor(public toastController: ToastController) {}

  /**
   * Present toast error
   * @param {string} message
   */
  error(message: string) {
    this.present({ message: message, color: 'primary' });
  }

  /**
   * Present toast warning
   * @param {string} message
   */
  warning(message: string, time?: number) {
    this.present({ message: message, color: 'warning', duration: time });
  }

  /**
   * Present toast success
   * @param {string} message
   */
  success(message: string) {
    this.present({ message: message, color: 'success' });
  }

  /**
   * Present toast
   * @param {ToastOptions} toastOptions
   * @returns {Promise<void>}
   */
  async present(toastOptions: ToastOptions) {
    if (this.toast) {
      this.toast.dismiss();
    }
    const options = new ToastOptions(toastOptions);
    (options as any).buttons = [
      {
        icon: 'close-circle',
        side: 'end',
        role: 'cancel',
      },
    ];
    this.toast = await this.toastController.create(options);
    this.toast.present();
  }
}
