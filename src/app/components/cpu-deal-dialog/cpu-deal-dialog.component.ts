import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Player } from 'src/app/model/player';
import { Property } from 'src/app/model/square';

export interface CPUDealDialogData {
  humanPlayer: Player;
  CPUPlayer: Player;
  humanPropertiesOffer: Array<Property>;
  CPUPropertiesOffer: Array<Property>;
  humanCashOffer: number;
  CPUCashOffer: number;
}
@Component({
  selector: 'app-cpu-deal-dialog',
  templateUrl: './cpu-deal-dialog.component.html',
  styleUrls: ['./cpu-deal-dialog.component.css']
})
export class CpuDealDialogComponent implements OnInit {
  humanPlayer: Player;
  CPUPlayer: Player;
  humanPropertiesOffer: Array<Property>;
  CPUPropertiesOffer: Array<Property>;
  humanCashOffer: number;
  CPUCashOffer: number;
  dataSourcePlayer = new MatTableDataSource();
  dataSourceCPU = new MatTableDataSource();
  displayedColumns =
      ['name'];
      constructor(
        public dialogRef: MatDialogRef<CpuDealDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: CPUDealDialogData, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.humanPlayer = this.data.humanPlayer;
    this.CPUPlayer = this.data.CPUPlayer;
    this.humanPropertiesOffer = this.data.humanPropertiesOffer;
    this.CPUPropertiesOffer = this.data.CPUPropertiesOffer
    this.humanCashOffer = this.data.humanCashOffer;
    this.CPUCashOffer = this.data.CPUCashOffer;
    this.dataSourceCPU.data = this.CPUPropertiesOffer;
    this.dataSourcePlayer.data = this.humanPropertiesOffer;
  }

}
