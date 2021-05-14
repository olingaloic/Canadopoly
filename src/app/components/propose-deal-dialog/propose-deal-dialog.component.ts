import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSliderChange } from '@angular/material/slider';
import { Player } from 'src/app/model/player';
import { Property } from 'src/app/model/square';
import { DealService } from 'src/app/service/deal-service';
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
  dealService: DealService;
  private readonly roundNumber = 100;

  constructor(
    public proposeDealDialogRef: MatDialogRef<ProposeDealDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProposeDealDialogData) {}

  ngOnInit(): void {
    this.CPUPlayer = this.data.CPUPlayer;
    this.humanPlayer = this.data.humanPlayer;
    this.boardComponent = this.data.boardComponent;
    this.propertiesDialogRef = this.data.propertiesDialogRef;
    this.dealService = new DealService(this.boardComponent);
  }

  closeDialog(){
    this.proposeDealDialogRef.close();
  }

  proposeDeal(){
    this.humanPlayer.negotiationProperties = new Array();
    this.CPUPlayer.negotiationProperties = new Array();
    if(this.playerProperties.value != null){
      this.playerProperties.value.forEach((propertyName: String) => {
        let property: Property = this.humanPlayer.getPropertyByName(propertyName);
        this.humanPlayer.negotiationProperties.push(property);
      });
    }
    if(this.CPUProperties.value){
      this.CPUProperties.value.forEach((propertyName: String) => {
        let property: Property = this.CPUPlayer.getPropertyByName(propertyName);
        this.CPUPlayer.negotiationProperties.push(property);
      });
    }
    this.CPUDealFunction();
  }

  formatLabel(value: number) {
    let roundNumber: number = 100;
    value = Math.ceil(value/roundNumber)*roundNumber ;
    return '$' + value;
  }

  changePlayerCashOffer(event: MatSliderChange){
    var roundedValue = Math.ceil(event.value/this.roundNumber)* this.roundNumber ;
    this.humanPlayer.cashOffer = roundedValue;
  
  }

  changeCPUCashOffer(event: MatSliderChange){
    var roundedValue = Math.ceil(event.value/this.roundNumber)* this.roundNumber ;
    this.CPUPlayer.cashOffer = roundedValue;
  }

  CPUDealFunction(){
    let CPUOfferValue: number = 0;
    let playerOfferValue: number = 0;
    this.CPUPlayer.negotiationProperties.forEach((property: Property) => {
      if(property.isMortgaged){
        CPUOfferValue += (property.propertyPrice/2) * this.CPUPlayer.getNbPlayerPropertiesSameColour(property);
      } else {
        CPUOfferValue += property.propertyPrice * this.CPUPlayer.getNbPlayerPropertiesSameColour(property);
      }
    });
    CPUOfferValue += this.CPUPlayer.cashOffer;
    this.humanPlayer.negotiationProperties.forEach((property: Property) => {
      if(property.isMortgaged){
        playerOfferValue += (property.propertyPrice/2) * this.humanPlayer.getNbPlayerPropertiesSameColour(property);
      } else {
        playerOfferValue += property.propertyPrice * this.humanPlayer.getNbPlayerPropertiesSameColour(property);
      }
    });
    playerOfferValue += this.humanPlayer.cashOffer;
    this.makeDeal(playerOfferValue, CPUOfferValue);
  }
  
  private makeDeal(playerOfferValue: number, CPUOfferValue: number) {
    if (playerOfferValue > CPUOfferValue) {
      this.dealService.doTransfer(this.humanPlayer, this.CPUPlayer);
      this.proposeDealDialogRef.close();
      this.propertiesDialogRef.close();
    } else {
      this.unsatisfyingDeal = true;
    }
  }
}
