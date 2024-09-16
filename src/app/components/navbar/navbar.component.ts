import { Component } from '@angular/core';
import { ModeService } from '../../services/mode.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  mode: string = 'user';  // El modo inicial por defecto es 'user'

  constructor(private modeService: ModeService) {}

  ngOnInit() {
    // Suscripción al observable `currentMode` para obtener el modo actual
    this.modeService.currentMode.subscribe(newMode => {
      this.mode = newMode;  // Actualiza la propiedad `mode` cuando cambia el modo
    });
  }

  // Método para cambiar al modo de administrador
  setAdminMode() {
    this.modeService.changeMode('admin'); // Cambia el modo a 'admin' usando el servicio
  }

  // Método para cambiar al modo de usuario
  setUserMode() {
    this.modeService.changeMode('user'); // Cambia el modo a 'user' usando el servicio
  }
}
