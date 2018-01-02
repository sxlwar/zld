import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular/module';
import { PIPES, DIRECTIVES } from './app.import';

@NgModule({
 declarations: [
    PIPES,
    DIRECTIVES,
 ],
 imports: [
     IonicModule,
 ],
 exports: [
    PIPES,
    DIRECTIVES,
 ],
})

export class SharedModule {};
