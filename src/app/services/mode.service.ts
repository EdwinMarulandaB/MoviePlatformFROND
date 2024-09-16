import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModeService {
  private mode = new BehaviorSubject<string>('user'); // Modo inicial es 'user'

  currentMode = this.mode.asObservable();

  constructor() { }

  // Método para cambiar el modo
  changeMode(newMode: string) {
    this.mode.next(newMode);
  }
}
