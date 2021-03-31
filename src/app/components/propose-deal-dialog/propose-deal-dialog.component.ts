import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSliderChange } from '@angular/material/slider';
import { Player } from 'src/app/model/player';
import { Property } from 'src/app/model/square';

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
  playerProperties = new FormControl();
  CPUProperties = new FormControl();
  humanPlayer: Player;
  CPUPlayer: Player;
  playerCashOffer: Number = 0;
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

  proposeDeal(){
    this.playerProperties.value.forEach((property: Property) => {
      console.log(property);
      console.log(this.playerCashOffer)
    });
  }

  formatLabel(value: number) {
    value = Math.ceil(value/100)* 100 ;
    console.log(value);
    return '$' + value;
  }

  changePlayerCashOffer(event: MatSliderChange){
    this.playerCashOffer = event.value;
  }

}
