import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular/module';
import { PIPES } from './app.import';
@NgModule({
 declarations: [
    PIPES,
 ],
 imports: [
     IonicModule,
 ],
 exports: [
    PIPES,
 ],
})

export class SharedModule {};
