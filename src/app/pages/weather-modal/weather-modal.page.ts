import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-weather-modal',
  templateUrl: './weather-modal.page.html',
  standalone: false,
})
export class WeatherModalPage {

  @Input() latitud: number = 0;
  @Input() longitud: number = 0;
  @Input() temperatura: number = 0;
  @Input() sensacionTermica: number = 0;
  @Input() humedad: number = 0;
  @Input() viento: number = 0;

  constructor(private modalCtrl: ModalController) {}

  // Cerrar sin guardar
  cerrar() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  // Guardar el registro
  registrar() {
    this.modalCtrl.dismiss(true, 'confirm');
  }
}
