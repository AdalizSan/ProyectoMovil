import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() {}

  // Obtener las coordenadas GPS del dispositivo
  async getLocation(): Promise<{ lat: number; lng: number }> {
    // Verificar si estamos en navegador o en dispositivo movil
    const esNavegador = Capacitor.isNativePlatform() === false;

    if (esNavegador) {
      // En navegador usar la API de geolocalizacion del browser
      return this.getLocationWeb();
    } else {
      // En Android/iOS usar Capacitor
      return this.getLocationNativo();
    }
  }

  // Obtener ubicacion en el navegador
  private getLocationWeb(): Promise<{ lat: number; lng: number }> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Tu navegador no soporta geolocalizacion'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          reject(new Error('No se pudo obtener la ubicacion'));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000
        }
      );
    });
  }

  // Obtener ubicacion en dispositivo movil con Capacitor
  private async getLocationNativo(): Promise<{ lat: number; lng: number }> {
    // Pedir permiso de ubicacion
    const permiso = await Geolocation.requestPermissions();
    if (permiso.location !== 'granted') {
      throw new Error('Permiso de ubicacion denegado');
    }

    // Obtener posicion actual
    const posicion = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 10000
    });

    return {
      lat: posicion.coords.latitude,
      lng: posicion.coords.longitude
    };
  }
}
