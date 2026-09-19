import { Injectable } from '@angular/core';
import { WeatherRecord } from '../models/weather-record';

const STORAGE_KEY = 'clima_registros';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  private registros: WeatherRecord[] = [];

  constructor() {
    // Cargar registros guardados al iniciar
    this.cargar();
  }

  // Cargar registros del localStorage
  private cargar() {
    const datos = localStorage.getItem(STORAGE_KEY);
    if (datos) {
      this.registros = JSON.parse(datos);
    }
  }

  // Guardar registros en localStorage
  private guardar() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.registros));
  }

  // Obtener todos los registros
  getRegistros(): WeatherRecord[] {
    return [...this.registros];
  }

  // Obtener cantidad de registros
  getTotal(): number {
    return this.registros.length;
  }

  // Agregar un nuevo registro
  agregar(registro: Omit<WeatherRecord, 'id'>): WeatherRecord {
    const nuevo: WeatherRecord = {
      ...registro,
      id: Date.now()
    };
    this.registros.unshift(nuevo);
    this.guardar();
    return nuevo;
  }

  // Actualizar la foto de un registro
  actualizarFoto(id: number, foto: string) {
    const registro = this.registros.find(r => r.id === id);
    if (registro) {
      registro.foto = foto;
      this.guardar();
    }
  }
}
