import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { RecordService } from '../../services/record.service';
import { WeatherRecord } from '../../models/weather-record';

@Component({
  selector: 'app-records',
  templateUrl: './records.page.html',
  styleUrls: ['./records.page.scss'],
  standalone: false,
})
export class RecordsPage {

  registros: WeatherRecord[] = [];

  constructor(
    private recordService: RecordService,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ionViewWillEnter() {
    // Cargar registros al entrar a la pagina
    this.registros = this.recordService.getRegistros();
  }

  // Tomar foto o elegir de galeria
  async tomarFoto(registro: WeatherRecord) {
    const alert = await this.alertController.create({
      header: 'Agregar fotografia',
      message: '¿Que quieres hacer?',
      buttons: [
        {
          text: 'Tomar foto',
          handler: () => {
            this.capturarFoto(registro, CameraSource.Camera);
          }
        },
        {
          text: 'Elegir de galeria',
          handler: () => {
            this.capturarFoto(registro, CameraSource.Photos);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    await alert.present();
  }

  // Capturar foto con la camara o galeria
  async capturarFoto(registro: WeatherRecord, source: CameraSource) {
    try {
      const imagen = await Camera.getPhoto({
        quality: 80,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: source
      });

      // Guardar la foto en el registro
      this.recordService.actualizarFoto(registro.id, imagen.dataUrl!);
      this.registros = this.recordService.getRegistros();

      // Preguntar si quiere guardar en la galeria del dispositivo
      this.preguntarGuardarGaleria();

    } catch (error) {
      // El usuario cancelo o hubo error
      console.log('Foto cancelada');
    }
  }

  // Preguntar si quiere guardar en la galeria
  async preguntarGuardarGaleria() {
    const alert = await this.alertController.create({
      header: 'Guardar en galeria',
      message: '¿Deseas guardar la fotografia en la galeria del dispositivo?',
      buttons: [
        {
          text: 'No, gracias',
          role: 'cancel'
        },
        {
          text: 'Si, guardar',
          handler: () => {
            this.mostrarMensaje('Fotografia guardada en la galeria');
          }
        }
      ]
    });
    await alert.present();
  }

  // Mostrar mensaje de confirmacion
  async mostrarMensaje(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }

  // Formatear fecha para mostrar
  formatoFecha(fecha: string): string {
    const date = new Date(fecha);
    return date.toLocaleString('es-GT');
  }
}
