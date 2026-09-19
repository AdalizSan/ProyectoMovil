# UMES Clima v3

Aplicacion movil desarrollada con Ionic y Angular que permite consultar el clima actual usando la ubicacion GPS del dispositivo, guardar registros climaticos y agregar fotografias a cada registro.

## Descripcion

UMES Clima v3 es una aplicacion que integra componentes de hardware nativos (GPS y camara) dentro de una app hibrida usando Capacitor. La app obtiene automaticamente las coordenadas geograficas del dispositivo, consulta la API de OpenWeatherMap y muestra el clima actual. Los usuarios pueden guardar registros del clima y agregar fotografias a cada uno.

## Funcionalidades

- Consultaautomatica del clima usando GPS
- Muestra de latitud, longitud, temperatura, sensacion termica, humedad y viento
- Guardado de registros climaticos con fecha y hora
- Agregado de fotografias a cada registro (camara o galeria)
- Opcion de guardar fotos en la galeria del dispositivo
- Contador de registros guardados
- Almacenamiento local con localStorage

## Plugins utilizados

| Plugin | Version | Funcion |
|--------|---------|---------|
| @capacitor/core | ^6.2.0 | Nucleo de Capacitor |
| @capacitor/android | ^6.2.0 | Plataforma Android |
| @capacitor/geolocation | ^6.0.2 | Acceso al GPS del dispositivo |
| @capacitor/camera | ^6.0.2 | Acceso a la camara y galeria |
| @capacitor/app | ^6.0.2 | Informacion de la app |
| @capacitor/keyboard | ^6.0.2 | Manejo del teclado |
| @capacitor/haptics | ^6.0.2 | Retroalimentacion haptica |
| @capacitor/status-bar | ^6.0.2 | Control de la barra de estado |

## API utilizada

- **OpenWeatherMap API** - https://api.openweathermap.org/data/2.5/weather
- Se utiliza la API key: `2ccc04eac7d02fbd6161ebfb3f1d76c8`
- Los datos se obtienen en metrico (Celsius, m/s)

## Permisos configurados en Android

| Permiso | Descripcion |
|---------|-------------|
| `android.permission.INTERNET` | Acceso a Internet para consultar la API del clima |
| `android.permission.ACCESS_COARSE_LOCATION` | Ubicacion aproximada del dispositivo (GPS) |
| `android.permission.ACCESS_FINE_LOCATION` | Ubicacion precisa del dispositivo (GPS) |
| `android.permission.CAMERA` | Acceso a la camara para tomar fotografias |
| `android.permission.WRITE_EXTERNAL_STORAGE` | Guardar fotografias en la galeria (Android < 30) |
| `android.permission.READ_EXTERNAL_STORAGE` | Leer almacenamiento (Android < 33) |

## Estructura del proyecto

```
src/
  app/
    models/
      weather-record.ts      -- Modelo de datos del registro climatico
    services/
      location.service.ts    -- Servicio para obtener coordenadas GPS
      weather.service.ts     -- Servicio para consultar la API del clima
      record.service.ts      -- Servicio para guardar/leer registros locales
    home/
      home.page.ts           -- Pagina principal
      home.page.html         -- Template de la pagina principal
    pages/
      records/
        records.page.ts      -- Pagina de registros guardados
        records.page.html    -- Template de la pagina de registros
  environments/
    environment.ts           -- Configuracion con API key
```

## Como ejecutar

```bash
# Instalar dependencias
npm install

# Ejecutar en navegador
ionic serve

# Build para produccion
ng build

# Sincronizar con Android
npx cap sync android

# Abrir en Android Studio
npx cap open android
```

## Tecnologias

- **Ionic 8** - Framework UI para apps hibridas
- **Angular 19** - Framework frontend
- **Capacitor 6** - Plataforma nativa
- **OpenWeatherMap** - API meteorologica
- **localStorage** - Almacenamiento local de registros

## Entregables

1. Codigo fuente completo (repositorio Git)
2. Video de 5 minutos explicando la aplicacion
3. Este archivo README.md
