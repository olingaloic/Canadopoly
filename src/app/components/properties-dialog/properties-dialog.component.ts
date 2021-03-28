import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Player } from 'src/app/model/player';

export interface PropertiesDialogData {
  humanPlayer: Player;
  CPUPlayer: Player;
}
@Component({
  selector: 'app-properties-dialog',
  templateUrl: './properties-dialog.component.html',
  styleUrls: ['./properties-dialog.component.css']
})
export class PropertiesDialogComponent implements OnInit {
  
  humanPlayer: Player
  CPUPlayer: Player;
  dataSource = new MatTableDataSource();
  displayedColumns =
      ['name', 'nbHouses', 'propertyPrice', 'rentPrice', 'deal'];
  constructor(
    public dialogRef: MatDialogRef<PropertiesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PropertiesDialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.CPUPlayer = this.data.CPUPlayer;
    this.humanPlayer = this.data.humanPlayer;
    this.updatePropertiesTableRendering();
  }
  updatePropertiesTableRendering(){
    this.dataSource.data = this.CPUPlayer.getPropertiesSorted();
  }

}
