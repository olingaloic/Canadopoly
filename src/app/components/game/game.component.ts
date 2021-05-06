import { Component, OnInit, ViewChild } from '@angular/core';
import { Airport } from 'src/app/model/airport';
import { Player } from 'src/app/model/player';
import { City } from 'src/app/model/city';
import { Property } from 'src/app/model/square';
import { BoardComponent } from '../board/board.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChanceDialogComponent } from '../chance-dialog/chance-dialog.component';
import { PropertiesDialogComponent } from '../properties-dialog/properties-dialog.component';
import { CpuDealDialogComponent } from '../cpu-deal-dialog/cpu-deal-dialog.component';
import { PropertyCardDialogComponent } from '../property-card-dialog/property-card-dialog.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent implements OnInit {
  constructor(private router: Router, public dialog: MatDialog) {}

  @ViewChild(BoardComponent)
  private boardComponent: BoardComponent;
  player: Player;
  CPUPlayer: Player;
  canHumanEndTurn: boolean;
  diceValue: number;
  isCPUPropositionDialogOpened: boolean = false;
  properties: Map<number, Property>;
  nbBankruptcyHelpRefusals = 0
  dataSource = new MatTableDataSource();
  dataSourceEvents = new MatTableDataSource();
  events: Array<string>;
  private readonly jailSquareNumber = 8;
  private readonly firstChanceSquareNumber = 12;
  private readonly nextAirportFirstChanceSquare = 18;
  private readonly secondChanceSquareNumber = 20;
  private readonly nextAirportSecondChanceSquare = 25;
  private readonly maxSquareNumber = 27;
  private readonly houseRepairmentsFee = 500;
  private readonly getFreeJailFee = 1000;
  private readonly cashOfferOffset = 1000;
  private readonly holidaysFee = 2000;
  private readonly lotteryPrize = 2500;
  private readonly localTaxFee = 5000;
  private readonly startSquareBonus = 5000;
  private readonly maxNbTurnsInJail = 3;
  private readonly maxRandomChanceNumber = 4;
  private readonly maxNbHouses = 5;

  displayedColumns =
      ['tier', 'name', 'nbHouses', 'rentPrice', 'buttons'];
  displayedColumnsEvents =
      ['event'];
  ngOnInit(): void {
    this.properties = new Map();
    this.events = new Array<string>();
    this.player = new Player("Human Player", "#ff6666");
    this.player.isHuman = true;
    this.player.isPlayerTurn = true;
    this.CPUPlayer = new Player("CPU Player", "#6c5de8");
    this.properties.set(1, new City(1, "Charlottetown", "Tier 8", 1500, 500, [100, 400, 1000, 3500, 5000, 6000]));
    this.properties.set(3, new City(3, "St John's", "Tier 8", 1500, 500, [100, 500, 1200, 4000, 6000, 7000]));
    this.properties.set(4, new Airport(4, "Trudeau Airport", 5000, [0, 600, 1200, 2500, 5000]));
    this.properties.set(5, new City(5, "Halifax", "Tier 7", 2000, 750, [200, 1000, 2000, 6000, 8500, 10000]));
    this.properties.set(6, new City(6, "Fredericton", "Tier 7", 2000, 750, [200, 1000, 2000, 6000, 8500, 10000]));
    this.properties.set(7, new City(7, "Moncton", "Tier 7", 2500, 1500, [300, 1500, 2500, 7000, 10000, 12000]));
    this.properties.set(9, new City(9, "Hamilton", "Tier 6", 3000, 1500, [400, 1500, 3500, 10000, 12000, 15000]));
    this.properties.set(10, new City(10, "London", "Tier 6", 3500, 1500, [400, 1500, 3500, 10000, 12000, 15000]));
    this.properties.set(11, new Airport(11, "Pearson Airport", 5000, [0, 600, 1200, 2500, 5000]));
    this.properties.set(13, new City(13, "Quebec", "Tier 5", 4000, 3000, [500, 1700, 5000, 13000, 16000, 20000]));
    this.properties.set(15, new City(15, "Montreal", "Tier 5", 4500, 3000, [500, 1700, 5000, 13000, 16000, 20000]));
    this.properties.set(16, new City(16, "Saskatoon", "Tier 4", 5000, 4000, [600, 2200, 5000, 15000, 18000, 22000]));
    this.properties.set(17, new City(17, "Winnepeg", "Tier 4", 5500, 4000, [600, 2200, 5000, 15000, 18000, 22000]));
    this.properties.set(18, new Airport(18, "Calgary Airport", 5000, [0, 600, 1200, 2500, 5000]));
    this.properties.set(19, new City(19, "Calgary", "Tier 3", 6000, 5000, [700, 3000, 9500, 16000, 20000, 25000]));
    this.properties.set(21, new City(21, "Edmonton", "Tier 3", 6500, 5000, [700, 3000, 9500, 16000, 20000, 25000]));
    this.properties.set(23, new City(23, "Ottawa", "Tier 2", 7000, 6500, [800, 5000, 11000, 18000, 22500, 28000]));
    this.properties.set(24, new City(24, "Toronto", "Tier 2", 7500, 6500, [800, 5000, 11000, 18000, 22500, 28000]));
    this.properties.set(25, new Airport(25, "Vancouver Airport", 5000, [0, 600, 1200, 2500, 5000]));
    this.properties.set(26, new City(26, "Victoria", "Tier 1", 9000, 7000, [1000, 7500, 13000, 20000, 25000, 32000]));
    this.properties.set(27, new City(27, "Vancouver", "Tier 1", 10000, 7000, [1000, 7500, 13000, 20000, 25000, 32000]));
  }

  buyProperty(player: Player){
    let property: Property = this.buyPropertyTransfer(player);
    let eventString: string = player.name + " has bought " + property.name + ".";
    this.boardComponent.renderBuyProperty(player, player.position);
    if(property.isCity()){
      let chosenCity: City = property as City;
      let citiesOfTheSameTier: Array<City> = this.getCitiesOfTheSameTier(chosenCity);
      this.setPropertiesMorgageable(citiesOfTheSameTier);
      this.setHousesBuyable(citiesOfTheSameTier, player);
    } else {
      player.nbAirports++;
    }
    this.updateEventTableRendering(eventString);
    this.updatePropertiesTableRendering();
  }

  private buyPropertyTransfer(player: Player) {
    let property: Property = this.properties.get(player.position);
    player.properties.push(property);
    property.player = player;
    player.balance -= this.properties.get(player.position).propertyPrice;
    return property;
  }

  displayBuyPropertyButton(){
    if(this.player.balance < 0)
      return false;
    if(this.properties.get(this.player.position) == undefined)
      return false;
    if(this.properties.get(this.player.position).player != undefined)
      return false;
    if(this.properties.get(this.player.position).propertyPrice > this.player.balance)
      return false;
    if(!this.player.isPlayerTurn)
      return false;
    if(this.displayRollDiceButton())
      return false;
    return true;
  }

  displayRollDiceButton(){
    return this.player.isPlayerTurn && !this.canHumanEndTurn && this.player.balance >= 0;
  }

  setHousesBuyable(citiesOfTheSameTier: Array<City>, player: Player){
    let areHousesBuyable: boolean = true;
    let isZeroHouseUnimprovedColour: boolean = true;
    citiesOfTheSameTier.forEach((city: City) => {
      if(this.areHousesNotBuyable(city, player)) areHousesBuyable = false;
      if(this.isNotZeroHouseUnimprovedColour(city, player)) isZeroHouseUnimprovedColour = false;
    });
    
    citiesOfTheSameTier.forEach((city: City) => {
      if(isZeroHouseUnimprovedColour) city.currentRentPrice = city.rentPrices[0] * 2;
      city.isHouseBuyable = this.cannotBuyHouse(player, city) ? false : areHousesBuyable;
    }); 
  }

  private cannotBuyHouse(player: Player, city: City) {
    return player.balance < city.housePrice || city.nbHouses == this.maxNbHouses;
  }

  private isNotZeroHouseUnimprovedColour(city: City, player: Player) {
    return city.player != player || city.nbHouses > 0 || city.isMortgaged;
  }

  private areHousesNotBuyable(city: City, player: Player) {
    return city.player != player || city.isMortgaged;
  }

  setPropertiesMorgageable(citiesOfTheSameTier: Array<City>){
    var hasNoneOfTheCitiesHouse: boolean = true;
    citiesOfTheSameTier.forEach((city: City) => {
      if(city.hasHouses()) hasNoneOfTheCitiesHouse = false;
    });
    if(hasNoneOfTheCitiesHouse){
      citiesOfTheSameTier.forEach((city: City) => {
        if(!city.isMortgaged) city.isMortgageable = true;
      });
    }
    else {
      citiesOfTheSameTier.forEach((city: City) => {
        city.isMortgageable = false;
      });
    }    
  }

  canPlayerBuyHouseCity(chosenCity: City, player: Player){
    if(!player.cantPlayerBuyHouse(chosenCity))
      return false;
    this.getCitiesOfTheSameTier(chosenCity).forEach((property: Property) => {
      let city = property as City;
      if(!player.hasCity(city)) return false;
    });
    return true;
  }

  removeMortgage(property: Property){
    let player = property.player;
    let eventString: string = property.player.name + " paid off the mortgage on " + property.name + " for $" + property.propertyPrice/2;
    player.removeMortgage(property);
    if(property.isCity()){
      let city = property as City;
      let citiesOfTheSameTier = this.getCitiesOfTheSameTier(city);
      city.currentRentPrice = city.rentPrices[0];
      this.setHousesBuyable(citiesOfTheSameTier, player);
    } 
    this.updateEventTableRendering(eventString);
    this.updatePropertiesTableRendering();   
  }

  removeHouse(property: Property){
    let city = property as City;
    let player = city.player;
    let eventString = player.name + " removed a house in " + city.name + " and got $" + city.housePrice/2 + "."
    player.removeHouse(city);
    let citiesOfTheSameTier = this.getCitiesOfTheSameTier(city);
    this.setPropertiesMorgageable(citiesOfTheSameTier);
    this.setHousesBuyable(citiesOfTheSameTier, player);
    this.updatePropertiesTableRendering();
    this.updateEventTableRendering(eventString);
  }

  buyHouse(player: Player, city: City){
    player.buyHouse(city);
    let citiesOfTheSameTier = this.getCitiesOfTheSameTier(city);
    this.setHousesBuyable(citiesOfTheSameTier, player);
    citiesOfTheSameTier.forEach((city: City) => {
      city.isMortgageable = false;
    });
    if(player.isHuman){
      let eventString: string = "Human Player has bought a house in " + city.name + " for $" + city.housePrice + ".";
      this.updateEventTableRendering(eventString);
    }
    this.updatePropertiesTableRendering();
  }

  generateRandomNumber(minNumber: number, maxNumber: number){
    var randomNumber = Math.floor(Math.random()*maxNumber) + minNumber;
    return randomNumber;
  }

  rollDice(player: Player){
    let minDiceValue = 1;
    let maxDiceValue = 6;
    this.diceValue = this.generateRandomNumber(minDiceValue, maxDiceValue);
    this.boardComponent.renderDiceValue(this.diceValue);
    if(player.nbTurnsInJail > 0){
      this.managePlayerInJail(player, maxDiceValue);
    }
    else {
      for (let i = 0; i < this.diceValue; i++){
        this.movePlayer(player);
      }
      if(player.isOnGoToJailSquare()) this.movePlayerToJail(player);
      if(player.isOnChanceSquare()) this.generateRandomChanceEvent(player);
      if(player.isOnLocalTaxSquare()) this.managePlayerLocalTaxSquare(player);
    }
    this.payRent(player);
    if(player.isHuman) this.canHumanEndTurn = true;
  }

  private managePlayerLocalTaxSquare(player: Player) {
    let eventString: string;
    player.balance -= this.localTaxFee;
    eventString = player.name + " paid $5000 for local tax.";
    this.updateEventTableRendering(eventString);
  }

  private managePlayerInJail(player: Player, maxDiceValue: number) {
    let eventString: string;
    player.nbTurnsInJail = (this.diceValue == maxDiceValue) ? 0 : player.nbTurnsInJail - 1;
    eventString = player.name + " is now free.";
    this.updateEventTableRendering(eventString);
  }

  payRent(player: Player){
    let property = this.properties.get(player.position);
    if(player.mustPayRent(property)){
      let eventString = player.name + " paid a $" + property.getCurrentRentPrice() + " rent to stay in " + property.name + ".";
      player.rentCashTransfer(property);
      this.updateEventTableRendering(eventString);
    }
  }


  displayGetFreeButton(){
    return this.player.nbTurnsInJail > 0 && this.player.isPlayerTurn && this.displayRollDiceButton() && this.player.balance >= this.getFreeJailFee;
  }

  endTurn(player: Player){
    player.isPlayerTurn = false;
    if(player.isHuman){
      this.canHumanEndTurn = false;
      this.CPUPlayerPlay();
    }
  }
  CPUPlayerPlay() {
    if(this.CPUPlayer.canCPUPlayerGetFree()){
      this.playerGetFree(this.CPUPlayer);
    } else {
      this.manageCPUPlayerMovement();
    }
    this.manageCPUPlayerProposeDeal();
    this.manageCPUPlayerBuyHouses();
    this.CPUPlayer.isPlayerTurn = false;  
    this.player.isPlayerTurn = true;
  }

  private manageCPUPlayerBuyHouses() {
    this.CPUPlayer.properties.forEach((property: Property) => {
      if(property.isCity()) {
        let city = property as City;
        let nbHousesBuilt = 0;
        while(city.isHouseBuyable) {
          this.buyHouse(this.CPUPlayer, city);
          nbHousesBuilt++;
        }
        if(nbHousesBuilt > 0){
          let eventString = "CPU Player has bought " + nbHousesBuilt + " house(s) in " + city.name + " for $" + city.housePrice * nbHousesBuilt + ".";
          this.updateEventTableRendering(eventString);
        }
      }
    });
  }

  private manageCPUPlayerProposeDeal(){
    for(let property of this.CPUPlayer.getDealableProperties()){
      if(this.isCPUProposeDeal(property)){
        this.player.negotiationProperties = this.getPropertiesCPUWants(property);
        this.CPUPlayerProposeDeal();
        break;
      }
    }
  }

  private isCPUProposeDeal(property: Property) {
    let minRandomNumber: number = 1;
    let maxRandomNumber: number = 4;
    let randomNumber: number = this.generateRandomNumber(minRandomNumber, maxRandomNumber);
    return this.getPropertiesCPUWants(property).length > 0 && randomNumber == minRandomNumber;
  }

  private manageCPUPlayerMovement() {
    let position: number;
    let property: Property;
    this.rollDice(this.CPUPlayer);
    position = this.CPUPlayer.position;
    property = this.properties.get(position);
    if(this.CPUPlayer.balance < 0) {
      while(this.CPUPlayer.getFirstPropertyHouseRemovable() != undefined)
        this.removeHouse(this.CPUPlayer.getFirstPropertyHouseRemovable());
    }
    if(this.CPUPlayer.balance < 0) {
      while(this.CPUPlayer.getFirstPropertyMortgageable() != undefined)
        this.mortgageProperty(this.CPUPlayer.getFirstPropertyMortgageable());
    }
    if(this.CPUPlayer.balance < 0)
      this.CPUProposeDealBankruptcy();
    if(property != undefined && this.CPUPlayer.canPlayerBuyProperty(property))
      this.buyProperty(this.CPUPlayer);
  }

  async CPUProposeDealBankruptcy(){
    while(this.CPUPlayer.balance < 0 && !this.isCPUPropositionDialogOpened){
      let maxNbBankruptcyHelpRefusals = 3;
      this.player.cashOffer = - this.CPUPlayer.balance + this.cashOfferOffset;
      let CPUPlayerDealPropertiesValue = this.player.cashOffer;
      this.CPUPlayer.negotiationProperties = this.CPUPlayer.getPropertiesEquivalentValue(this.CPUPlayer.getDealableProperties(), CPUPlayerDealPropertiesValue);
      this.isCPUPropositionDialogOpened = true;
      const dialogRef = this.dialog.open(CpuDealDialogComponent, {
        width: '500px',
        height: '450px',
        disableClose: true,
        data: {humanPlayer: this.player, CPUPlayer : this.CPUPlayer, boardComponent: this.boardComponent}
      });
      let result = await dialogRef.afterClosed().toPromise();
      if(!result && this.CPUPlayer.balance < 0){
        this.isCPUPropositionDialogOpened = false; 
        this.nbBankruptcyHelpRefusals ++;
      }
      if(this.nbBankruptcyHelpRefusals == maxNbBankruptcyHelpRefusals){
        this.declareBankruptcy(this.CPUPlayer);
        break;
      }
    }
  }

  getPropertiesCPUWants(chosenProperty: Property){
    var propertiesCPUWants : Array<Property> = new Array();
    if(chosenProperty.isCity()){
      var humanPlayerCities = this.player.getDealableCities();
      let chosenCity = chosenProperty as City;
      humanPlayerCities.forEach((city: City) => {
        if(city.tier == chosenCity.tier)
          propertiesCPUWants.push(city);
      });
    } else {
      var humanPlayerAirports = this.player.getDealableAirports();
      humanPlayerAirports.forEach((airport: Property) => {
          propertiesCPUWants.push(airport);
      });
    }
    return propertiesCPUWants;
  }
  getPropertiesValue(humanPlayerDealProperties: Array<Property>){
    var propertiesValue = 0;
    humanPlayerDealProperties.forEach((property: Property) => {
      propertiesValue += property.propertyPrice + this.cashOfferOffset;
    });
    return propertiesValue;
  }
  async CPUPlayerProposeDeal(){
    var humanPlayerDealPropertiesValue = this.getPropertiesValue(this.player.negotiationProperties);
    this.CPUPlayer.negotiationProperties = this.CPUPlayer.getPropertiesEquivalentValue(this.player.negotiationProperties, humanPlayerDealPropertiesValue);
    this.CPUPlayer.cashOffer = humanPlayerDealPropertiesValue - this.getPropertiesValue(this.CPUPlayer.negotiationProperties) + this.cashOfferOffset;
    if(this.CPUPlayer.cashOffer < 0){
      this.player.cashOffer = -this.CPUPlayer.cashOffer;
      this.CPUPlayer.cashOffer = 0;
    } 
    const dialogRef = this.dialog.open(CpuDealDialogComponent, {
      width: '375px',
      height: '350px',
      disableClose: true,
      data: {humanPlayer: this.player, CPUPlayer : this.CPUPlayer, boardComponent: this.boardComponent}
    });

    await dialogRef.afterClosed().subscribe(result => {
      this.isCPUPropositionDialogOpened = false;
      this.setHousesBuyableAfterDeal();
      this.updatePropertiesTableRendering();
    });
  }
  setHousesBuyableAfterDeal() {
    this.player.properties.forEach((property: Property) => {
      if(property.isCity()){
        let city = property as City;
        let citiesOfTheSameTier = this.getCitiesOfTheSameTier(city);
        this.setHousesBuyable(citiesOfTheSameTier, this.player);
      }
    });

    this.CPUPlayer.properties.forEach((property: Property) => {
      if(property.isCity()){
        let city = property as City;
        let citiesOfTheSameTier = this.getCitiesOfTheSameTier(city);
          this.setHousesBuyable(citiesOfTheSameTier, this.CPUPlayer);
      }
    });
  }


  movePlayerToJail(player: Player){
    player.position = this.jailSquareNumber;
    player.nbTurnsInJail = this.maxNbTurnsInJail;
    this.updateEventTableRendering(player.name + " has been sent to jail.");
    this.boardComponent.renderMovePawn(player);
    player.nbTurnsInJail = this.maxNbTurnsInJail;
    this.openChanceDialog(player, "Go to Jail !");
    
  }



  movePlayer(player: Player){
    if(player.position != this.maxSquareNumber){
      player.position ++;
      this.boardComponent.renderMovePawn(player);
    }
    else {
      player.position = 0;
      this.boardComponent.renderMovePawn(player);
      player.balance += this.startSquareBonus;
    }
  }


  generateRandomChanceEvent(player: Player) {
    let chanceEventNumber = this.generateRandomNumber(0, this.maxRandomChanceNumber);
    let chanceEventMessage;
    let eventString;
    switch(chanceEventNumber) {
      case 0:
        chanceEventMessage = "Go to the next airport.";''
        this.movePlayerToNextAirport(player);
        break;
      case 1:
        chanceEventMessage = "You spent $2000 during holidays.";
        player.balance -= this.holidaysFee;
        eventString = player.name + " spent $2000 during holidays.";
        this.updateEventTableRendering(eventString);
        break;
      case 2:
        chanceEventMessage = "You won $2500 at the lottery.";
        player.balance += this.lotteryPrize;
        eventString = player.name + " won $2500 at the lottery.";
        this.updateEventTableRendering(eventString);
        break;
      case 3:
        this.playerPayHousesRepairments(player);
        chanceEventMessage = "House repairments ! Pay $500 per house";
        break;
      case 4:
        this.movePlayerToJail(player);
        chanceEventMessage = "Go to Jail !";
        break;
      default :
        break;
    }
    this.openChanceDialog(player, chanceEventMessage);

  }

  playerPayHousesRepairments(player: Player) {
    let numberPlayerHouses: number = player.getNumberOfHouses();
    let housesRepairmentsPrice = numberPlayerHouses * this.houseRepairmentsFee;
    let eventString = player.name + " paid $" + housesRepairmentsPrice + " for houses repairments.";
    player.balance -= (housesRepairmentsPrice);
    this.updateEventTableRendering(eventString);
  }
  

  movePlayerToNextAirport(player: Player) {
    switch(player.position){
      case this.firstChanceSquareNumber:
        player.position = this.nextAirportFirstChanceSquare;
        this.boardComponent.renderMovePawn(player);
        this.payRent(player);
        break;
      case this.secondChanceSquareNumber:
        player.position = this.nextAirportSecondChanceSquare;
        this.boardComponent.renderMovePawn(player);
        this.payRent(player);
        break;
    }  
  }

  mortgageProperty(property: Property){
    property.isMortgaged = true;
    property.isMortgageable = false;
    property.player.balance += property.propertyPrice/2;
    let eventString: string =  property.player.name + " mortgaged " + property.name + " and got $" + property.propertyPrice/2 + " from it.";
    if(property.isCity()){
      let city = property as City;
      let citiesOfTheSameTier = this.getCitiesOfTheSameTier(city);
      citiesOfTheSameTier.forEach((city: City) => {
        city.isHouseBuyable = false;
        if(city.isMortgaged){
          city.currentRentPrice = 0;
        } else {
          city.currentRentPrice = city.rentPrices[0];
        }
      });
    }
    this.updateEventTableRendering(eventString);
    this.updatePropertiesTableRendering();
  }

  getCitiesOfTheSameTier(chosenCity: City){
    let citiesOfTheSameTier: Array<City> = new Array<City>();
      this.properties.forEach((property: Property, id: number) => {
          let city = property as City;
          if(city.tier == chosenCity.tier)
            citiesOfTheSameTier.push(city);
      });
      return citiesOfTheSameTier;
  }

  updatePropertiesTableRendering(){
    this.dataSource.data = this.player.getPropertiesSorted();
  }

  updateEventTableRendering(event: string){
    this.events.unshift(event);
    this.dataSourceEvents.data = this.events;
  }

  openChanceDialog(player: Player, chanceEventMessage: string): void {
    const dialogRef = this.dialog.open(ChanceDialogComponent, {
      width: '150px',
      height: '210px',
      data: {player: player, chanceCardText : chanceEventMessage}
    });
  }

  openPropertyCardDialog(property: Property){
    const dialogRef = this.dialog.open(PropertyCardDialogComponent, {
      width: '300px',
      height: '350px',
      data: {property: property}
    });
  }

  seeProperties(player: Player){
    const dialogRef = this.dialog.open(PropertiesDialogComponent, {
      width: '600px',
      height: '400px',
      disableClose: true,
      data: {humanPlayer: this.player, CPUPlayer: player, boardComponent: this.boardComponent}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.updatePropertiesTableRendering();
      this.setHousesBuyableAfterDeal();
    });
  }

  playerGetFree(player) {
    player.nbTurnsInJail = 0;
    player.balance -= 1000;
    this.updateEventTableRendering(player.name + " paid $1000 to get free.");
    this.canHumanEndTurn = true;
  }

  declareBankruptcy(player: Player){
    this.router.navigate(['gameOver', { playerName: player.name }]);
  }
  
}
