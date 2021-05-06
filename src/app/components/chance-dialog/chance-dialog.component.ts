import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Player } from 'src/app/model/player';

export interface ChanceDialogData {
  player: Player;
  chanceCardText: string
}
@Component({
  selector: 'app-chance-dialog',
  templateUrl: './chance-dialog.component.html',
  styleUrls: ['./chance-dialog.component.css']
})
export class ChanceDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ChanceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ChanceDialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {}

}
