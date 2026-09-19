import { Component } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LocationService } from '../services/location.service';
import { WeatherService, WeatherData } from '../services/weather.service';
import { RecordService } from '../services/record.service';
import { WeatherModalPage } from '../pages/weather-modal/weather-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  totalRegistros = 0;

  constructor(
    private locationService: LocationService,
    private weatherService: WeatherService,
    private recordService: RecordService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private modalController: ModalController,
    private router: Router
  ) {}

  ionViewWillEnter() {
    this.totalRegistros = this.recordService.getTotal();
  }

  // Consultar clima al presionar el boton
  async consultarClima() {
    const loading = await this.loadingController.create({
      message: 'Obteniendo ubicacion y consultando clima...',
      spinner: 'crescent'
    });
    await loading.present();

    try {
      const ubicacion = await this.locationService.getLocation();
      const clima = await this.weatherService.getWeather(ubicacion.lat, ubicacion.lng);
      await loading.dismiss();
      this.mostrarDialogo(clima);

    } catch (error) {
      await loading.dismiss();
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No se pudo obtener la ubicacion o el clima. Verifica los permisos.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  // Mostrar modal con los datos del clima
  async mostrarDialogo(clima: WeatherData) {
    const modal = await this.modalController.create({
      component: WeatherModalPage,
      componentProps: {
        latitud: clima.lat,
        longitud: clima.lon,
        temperatura: clima.temp,
        sensacionTermica: clima.feels_like,
        humedad: clima.humidity,
        viento: clima.wind_speed
      }
    });

    await modal.present();

    // Esperar que el usuario cierre el modal
    const resultado = await modal.onWillDismiss();
    if (resultado.role === 'confirm') {
      this.recordService.agregar({
        fecha: new Date().toISOString(),
        latitud: clima.lat,
        longitud: clima.lon,
        temperatura: clima.temp,
        sensacionTermica: clima.feels_like,
        humedad: clima.humidity,
        viento: clima.wind_speed,
        foto: null
      });
      this.totalRegistros = this.recordService.getTotal();
    }
  }

  irARegistros() {
    this.router.navigate(['/records']);
  }
}
