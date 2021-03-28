import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { GameComponent } from './components/game/game.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { ChanceDialogComponent } from './components/chance-dialog/chance-dialog.component';
import { PropertiesDialogComponent } from './components/properties-dialog/properties-dialog.component';
import { ProposeDealDialogComponent } from './components/propose-deal-dialog/propose-deal-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    BoardComponent,
    ChanceDialogComponent,
    PropertiesDialogComponent,
    ProposeDealDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule
    
  ],
  exports: [
    MatButtonModule,
    MatTableModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
