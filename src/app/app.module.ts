import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { GameComponent } from './components/game/game.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatListModule} from '@angular/material/list';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ChanceDialogComponent } from './components/chance-dialog/chance-dialog.component';
import { PropertiesDialogComponent } from './components/properties-dialog/properties-dialog.component';
import { ProposeDealDialogComponent } from './components/propose-deal-dialog/propose-deal-dialog.component';
import { CpuDealDialogComponent } from './components/cpu-deal-dialog/cpu-deal-dialog.component';
import { GameOverComponent } from './components/game-over/game-over.component';


@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    BoardComponent,
    ChanceDialogComponent,
    PropertiesDialogComponent,
    ProposeDealDialogComponent,
    CpuDealDialogComponent,
    GameOverComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSliderModule,
    MatListModule
    
  ],
  exports: [
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
