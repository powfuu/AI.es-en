import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class LocalStoreService {
  constructor() {}

  setToLocalStore(key: string, value: any): void {
    Preferences.set({ key: key, value: value });
  }

  getFromLocalStore(key: string) {
    return Preferences.get({ key: key });
  }

  removeFromLocalStore(key: string): void {
    Preferences.remove({ key: key });
  }
}
