import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Player } from 'src/app/model/player';
import { BoardComponent } from '../board/board.component';
import { ProposeDealDialogComponent } from '../propose-deal-dialog/propose-deal-dialog.component';

export interface PropertiesDialogData {
  humanPlayer: Player;
  CPUPlayer: Player;
  boardComponent: BoardComponent;
}
@Component({
  selector: 'app-properties-dialog',
  templateUrl: './properties-dialog.component.html',
  styleUrls: ['./properties-dialog.component.css']
})
export class PropertiesDialogComponent implements OnInit {
  
  humanPlayer: Player
  CPUPlayer: Player;
  boardComponent: BoardComponent;
  dataSource = new MatTableDataSource();
  displayedColumns =
      ['tier', 'name', 'nbHouses', 'propertyPrice', 'rentPrice'];
  constructor(
    public dialogRef: MatDialogRef<PropertiesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PropertiesDialogData, public dialog: MatDialog) {}


  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.CPUPlayer = this.data.CPUPlayer;
    this.humanPlayer = this.data.humanPlayer;
    this.boardComponent = this.data.boardComponent;
    this.updatePropertiesTableRendering();
  }

  updatePropertiesTableRendering(){
    this.dataSource.data = this.CPUPlayer.getPropertiesSorted();
  }

  openDealDialog(){
    const dialogRef = this.dialog.open(ProposeDealDialogComponent, {
      width: '600px',
      height: '300px',
      disableClose: true,
      data: {humanPlayer: this.humanPlayer, CPUPlayer: this.CPUPlayer, boardComponent: this.boardComponent, propertiesDialogRef: this.dialogRef}
    });
  }
}
