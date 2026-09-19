// Modelo para cada registro climatico guardado
export interface WeatherRecord {
  id: number;
  fecha: string;
  latitud: number;
  longitud: number;
  temperatura: number;
  sensacionTermica: number;
  humedad: number;
  viento: number;
  foto: string | null;
}
