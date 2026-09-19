import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { WeatherModalPage } from './weather-modal.page';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [WeatherModalPage],
  exports: [WeatherModalPage]
})
export class WeatherModalPageModule {}
