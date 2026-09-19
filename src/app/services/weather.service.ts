import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export interface WeatherData {
  temp: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  lat: number;
  lon: number;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor() {}

  // Consultar el clima con latitud y longitud
  async getWeather(lat: number, lng: number): Promise<WeatherData> {
    const url = `${environment.weatherApiUrl}?lat=${lat}&lon=${lng}&units=metric&appid=${environment.weatherApiKey}`;

    const respuesta = await fetch(url);
    const datos = await respuesta.json();

    if (datos.cod !== 200) {
      throw new Error('No se pudo obtener el clima');
    }

    return {
      temp: datos.main.temp,
      feels_like: datos.main.feels_like,
      humidity: datos.main.humidity,
      wind_speed: datos.wind.speed,
      lat: datos.coord.lat,
      lon: datos.coord.lon
    };
  }
}
