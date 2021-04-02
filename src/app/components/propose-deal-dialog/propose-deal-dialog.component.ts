import { Inject, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSliderChange } from '@angular/material/slider';
import { Player } from 'src/app/model/player';
import { Property } from 'src/app/model/square';
import { BoardComponent } from '../board/board.component';
import { PropertiesDialogComponent } from '../properties-dialog/properties-dialog.component';

export interface ProposeDealDialogData {
  humanPlayer: Player;
  CPUPlayer: Player;
  boardComponent: BoardComponent;
  propertiesDialogRef: MatDialogRef<PropertiesDialogComponent>;
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
  boardComponent: BoardComponent;
  propertiesDialogRef: MatDialogRef<PropertiesDialogComponent>;

  
  /*
  displayedColumns =
      ['name', 'nbHouses', 'propertyPrice', 'rentPrice', 'deal'];
  */
  constructor(
    public proposeDealDialogRef: MatDialogRef<ProposeDealDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProposeDealDialogData) {}


  onNoClick(): void {
    this.proposeDealDialogRef.close();
  }
  ngOnInit(): void {
    this.CPUPlayer = this.data.CPUPlayer;
    this.humanPlayer = this.data.humanPlayer;
    this.boardComponent = this.data.boardComponent;
    this.propertiesDialogRef = this.data.propertiesDialogRef;
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
      this.doTransfer();
      console.log(this.proposeDealDialogRef)
      this.proposeDealDialogRef.close();
      console.log(this.propertiesDialogRef)
      this.propertiesDialogRef.close();
    } else {
      this.unsatisfyingDeal = true;
    }
  }

  doTransfer(){
    console.log(this.boardComponent)
    this.playerNegotiationProperties.forEach((property: Property) => {
      this.humanPlayer.removePlayerProperty(property);
      this.CPUPlayer.properties.push(property);
      this.boardComponent.renderBuyProperty(this.CPUPlayer, property.id);
    });
    this.CPUNegotiationProperties.forEach((property: Property) => {
      this.CPUPlayer.removePlayerProperty(property);
      this.humanPlayer.properties.push(property);
      this.boardComponent.renderBuyProperty(this.humanPlayer, property.id);
    });
    this.humanPlayer.balance -= this.playerCashOffer - this.CPUCashOffer;
    this.CPUPlayer.balance -= this.CPUCashOffer - this.playerCashOffer;


  }

}
