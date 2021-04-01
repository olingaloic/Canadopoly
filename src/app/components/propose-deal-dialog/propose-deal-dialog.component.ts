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
  playerNegotiationProperties: Array<Property>;
  CPUNegotiationProperties: Array<Property>;
  playerCashOffer: number = 0;
  CPUCashOffer: number = 0;
  unsatisfyingDeal: boolean;
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
    this.playerNegotiationProperties = new Array();
    this.CPUNegotiationProperties = new Array();
    this.playerProperties.value.forEach((propertyName: String) => {
      let property: Property = this.humanPlayer.getPropertyByName(propertyName);
      this.playerNegotiationProperties.push(property);
    });
    this.CPUProperties.value.forEach((propertyName: String) => {
      let property: Property = this.CPUPlayer.getPropertyByName(propertyName);
      this.CPUNegotiationProperties.push(property);
    });
    this.CPUDealFunction();
    this.playerNegotiationProperties = null;
    this.CPUNegotiationProperties = null;
  }

  formatLabel(value: number) {
    value = Math.ceil(value/100)* 100 ;
    return '$' + value;
  }

  changePlayerCashOffer(event: MatSliderChange){
    var roundedValue = Math.ceil(event.value/100)* 100 ;
    this.playerCashOffer = roundedValue;
  
  }

  changeCPUCashOffer(event: MatSliderChange){
    var roundedValue = Math.ceil(event.value/100)* 100 ;
    this.CPUCashOffer = roundedValue;
  }

  CPUDealFunction(){
    var CPUOfferValue: number = 0;
    var playerOfferValue: number= 0;
    this.CPUNegotiationProperties.forEach((property: Property) => {
      if(property.isMortgaged){
        CPUOfferValue += (property.propertyPrice/2) * this.CPUPlayer.getNbPlayerPropertiesSameColour(property);
      } else {
        CPUOfferValue += property.propertyPrice * this.CPUPlayer.getNbPlayerPropertiesSameColour(property);
      }
    });
    CPUOfferValue += this.CPUCashOffer;
    this.playerNegotiationProperties.forEach((property: Property) => {
      if(property.isMortgaged){
        playerOfferValue += (property.propertyPrice/2) * this.humanPlayer.getNbPlayerPropertiesSameColour(property);
      } else {
        playerOfferValue += property.propertyPrice * this.humanPlayer.getNbPlayerPropertiesSameColour(property);
      }
    });
    playerOfferValue += this.playerCashOffer;
    if(playerOfferValue > CPUOfferValue){
      //swap player properties + budget transfer + board component 
      this.dialogRef.close();
    } else {
      this.unsatisfyingDeal = true;
    }
  }

}
