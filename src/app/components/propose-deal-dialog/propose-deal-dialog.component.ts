import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Player } from 'src/app/model/player';

export interface ProposeDealDialogData {
  humanPlayer: Player;
  CPUPlayer: Player;
}
@Component({
  selector: 'app-propose-deal-dialog',
  templateUrl: './propose-deal-dialog.component.html',
  styleUrls: ['./propose-deal-dialog.component.css']
})
export class ProposeDealDialogComponent implements OnInit {

  humanPlayer: Player
  CPUPlayer: Player;
  /*
  displayedColumns =
      ['name', 'nbHouses', 'propertyPrice', 'rentPrice', 'deal'];
  */
  constructor(
    public dialogRef: MatDialogRef<ProposeDealDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProposeDealDialogComponent) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.CPUPlayer = this.data.CPUPlayer;
    this.humanPlayer = this.data.humanPlayer;
    this.updatePropertiesTableRendering();
  }
  updatePropertiesTableRendering(){
    //this.dataSource.data = this.CPUPlayer.getPropertiesSorted();
  }

}
