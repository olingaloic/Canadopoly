import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Player } from 'src/app/model/player';
import { Property } from 'src/app/model/square';
import { DealService } from 'src/app/service/deal-service';
import { BoardComponent } from '../board/board.component';

export interface CPUDealDialogData {
  humanPlayer: Player;
  CPUPlayer: Player;
  boardComponent: BoardComponent;
}
@Component({
  selector: 'app-cpu-deal-dialog',
  templateUrl: './cpu-deal-dialog.component.html',
  styleUrls: ['./cpu-deal-dialog.component.css']
})
export class CpuDealDialogComponent implements OnInit {
  humanPlayer: Player;
  CPUPlayer: Player;
  dealService: DealService;
  boardComponent: BoardComponent;
  dataSourcePlayer = new MatTableDataSource();
  dataSourceCPU = new MatTableDataSource();
  displayedColumns =
      ['name'];
      constructor(
        public CPUDealDialogRef: MatDialogRef<CpuDealDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: CPUDealDialogData, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.humanPlayer = this.data.humanPlayer;
    this.CPUPlayer = this.data.CPUPlayer;
    this.dataSourceCPU.data = this.CPUPlayer.negotiationProperties;
    this.dataSourcePlayer.data = this.humanPlayer.negotiationProperties;
    this.boardComponent = this.data.boardComponent;
    this.dealService = new DealService(this.boardComponent);
  }

  acceptDeal(){
    this.dealService.doTransfer(this.humanPlayer, this.CPUPlayer);
    this.CPUDealDialogRef.close();
  }

  refuseDeal(){
    this.CPUDealDialogRef.close();
  }

}
