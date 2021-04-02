import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Airport } from 'src/app/model/airport';
import { Player } from 'src/app/model/player';
import { City } from 'src/app/model/city';
import { Property } from 'src/app/model/square';
import { BoardComponent } from '../board/board.component';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ChanceDialogComponent } from '../chance-dialog/chance-dialog.component';
import { PropertiesDialogComponent } from '../properties-dialog/properties-dialog.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  @ViewChild(BoardComponent)
  private boardComponent: BoardComponent;

  player: Player;
  CPUPlayer: Player;
  canHumanEndTurn: boolean;
  diceValue: number;
  properties: Map<number, Property>;
  dataSource = new MatTableDataSource();
  displayedColumns =
      ['name', 'nbHouses', 'rentPrice', 'buyHouse', 'removeHouse', 'mortgage', 'removeMortgage'];



  ngOnInit(): void {
    this.properties = new Map();
    this.player = new Player("Human Player", "#ff6666");
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
    let property = this.properties.get(player.position);
    player.properties.push(property);
    property.player = player;
    player.balance -= this.properties.get(player.position).propertyPrice;
    this.boardComponent.renderBuyProperty(player, player.position);
    console.log(this.boardComponent)
    if (property.isCity()){
      let chosenCity = property as City;
      let citiesOfTheSameTier = this.getCitiesOfTheSameTier(chosenCity);
      this.setPropertiesMorgageable(citiesOfTheSameTier);
      this.setHousesBuyable(citiesOfTheSameTier, player);
    } else {
      player.nbAirports++;
    }
    this.updatePropertiesTableRendering();
  }

  displayBuyPropertyButton(){
    if(this.properties.get(this.player.position) == undefined)
      return false;
    if(this.properties.get(this.player.position).player != undefined)
      return false;
    if(this.properties.get(this.player.position).propertyPrice > this.player.balance)
      return false;
    if(!this.player.isPlayerTurn)
      return false;
    return true;
  }
  displayRollDiceButton(){
    return this.player.isPlayerTurn && !this.canHumanEndTurn;
  }

  setHousesBuyable(citiesOfTheSameTier: Array<City>, player: Player){
    var areHousesBuyable: boolean = true;
    citiesOfTheSameTier.forEach((city: City) => {
      if(city.player != player || city.isMortgaged)
      areHousesBuyable = false;
    });
    
    citiesOfTheSameTier.forEach((city: City) => {
      if(player.balance < city.housePrice || city.nbHouses == 5){
        city.isHouseBuyable = false;
      }
      else {
        city.isHouseBuyable = areHousesBuyable;
      }
    });
    
  }

  setPropertiesMorgageable(citiesOfTheSameTier: Array<City>){
    var arePropertiesMortgageable: boolean = true;
    citiesOfTheSameTier.forEach((city: City) => {
      if(city.nbHouses > 0)
      arePropertiesMortgageable = false;
    });
    
    if(arePropertiesMortgageable){
      citiesOfTheSameTier.forEach((city: City) => {
        if(!city.isMortgaged)
          city.isMortgageable = true;
      });
    }
    else {
      citiesOfTheSameTier.forEach((city: City) => {
        city.isMortgageable = false;
      });
    }
      
    
  }
  
  
  canPlayerBuyHouseCity(chosenCity: City, player: Player){
    if(chosenCity.player != player || chosenCity.housePrice > player.balance || chosenCity.nbHouses == 5)
      return false;
    this.properties.forEach((property: Property, id: number) => {
      let city = property as City;
      if(city.tier == chosenCity.tier && city.player != player)
        return false;
    });
    return true;
  }



  removeMortgage(property: Property){
    let player = property.player;
    property.isMortgaged = false;
    property.isMortgageable = true;
    player.balance -= property.propertyPrice/2;
    if(property.isCity()){
      let city = property as City;
      let citiesOfTheSameTier = this.getCitiesOfTheSameTier(city);
      this.setHousesBuyable(citiesOfTheSameTier, player);
    } 
    this.updatePropertiesTableRendering();

    
  }

  removeHouse(property: Property){
    let city = property as City;
    let player = city.player;
    city.nbHouses--;
    player.balance += city.housePrice/2;
    let citiesOfTheSameTier = this.getCitiesOfTheSameTier(city);
    this.setPropertiesMorgageable(citiesOfTheSameTier);
    this.setHousesBuyable(citiesOfTheSameTier, player);
    this.updatePropertiesTableRendering();


  }

  buyHouse(property: Property){
    let city = property as City;
    let player = city.player;
    player.balance -= city.housePrice;
    city.nbHouses++;
    let citiesOfTheSameTier = this.getCitiesOfTheSameTier(city);
    this.setHousesBuyable(citiesOfTheSameTier, player);
    citiesOfTheSameTier.forEach((city: City) => {
      city.isMortgageable = false;
    });

    this.updatePropertiesTableRendering();
    
  }

  generateRandomNumber(minNumber: number, maxNumber: number){
    var randomNumber = Math.floor(Math.random()*maxNumber) + minNumber;
    return randomNumber;
  }

  rollDice(player: Player){
    var property : Property;
    this.diceValue = this.generateRandomNumber(1, 6);
    
    if(player.nbTurnsInJail > 0){
      player.nbTurnsInJail = (this.diceValue == 6) ? 0 : player.nbTurnsInJail - 1;
    }
    else {
      for (let i = 0; i < this.diceValue; i++){
        this.movePlayer(player);
      }
      setTimeout(()=>{
        if(player.position == 22){
          this.movePlayerToJail(player);
          player.nbTurnsInJail = 3;
          this.openChanceDialog(player, "Go to Jail !");
        }
        if(player.position == 12 || player.position == 20)
          this.generateRandomChanceEvent(player);
        if(player.position == 2)
          player.balance -= 5000;
      }, 400);
    }
    property = this.properties.get(player.position);
    if(property != undefined && player.mustPayRent(property)){
      console.log(property.getCurrentRentPrice())
      player.balance -= property.getCurrentRentPrice();
      property.player.balance += property.getCurrentRentPrice();
    }
    if(player.name == "Human Player")
      this.canHumanEndTurn = true;    
  }

  displayGetFreeButton(){
    return this.player.nbTurnsInJail > 0 && this.player.isPlayerTurn && this.displayRollDiceButton() && this.player.balance >= 1000;
  }

  endTurn(player: Player){
    player.isPlayerTurn = false;
    if(player.name == "Human Player"){
      this.canHumanEndTurn = false;
      this.CPUPlayerPlay();
    }
  }
  CPUPlayerPlay() {
    //throw new Error('Method not implemented.');
    var position;
    var property;
    if(this.CPUPlayer.nbTurnsInJail > 3 && this.CPUPlayer.balance >= 1000){
      this.playerGetFree(this.CPUPlayer);
    } else {
      this.rollDice(this.CPUPlayer);
      position = this.CPUPlayer.position;
      property = this.properties.get(position);
    }
    if(property != undefined && this.CPUPlayer.canPlayerBuyProperty(property))
      this.buyProperty(this.CPUPlayer)
    this.CPUPlayer.isPlayerTurn = false;  
    this.player.isPlayerTurn = true;

  }

  movePlayerToJail(player: Player){
    player.position = 8;
    player.nbTurnsInJail = 3;
    this.boardComponent.renderMovePawn(player);
    
  }

  movePlayer(player: Player){
    if(player.position != 27){
      player.position ++;
      this.boardComponent.renderMovePawn(player);
    }
    else {
      player.position = 0;
      this.boardComponent.renderMovePawn(player);
      player.balance += 5000;
    }
  }
  generateRandomChanceEvent(player: Player) {
    var chanceEventNumber = this.generateRandomNumber(1, 5);
    //chanceEventNumber = 4;
    var chanceEventMessage;
    switch(chanceEventNumber) {
      case 1:
        chanceEventMessage = "Go to the next airport.";
        this.movePlayerToNextAirport(player);
        break;
      case 2:
        chanceEventMessage = "You spent $2000 during holidays.";
        player.balance -= 2000;
        break;
      case 3:
        chanceEventMessage = "You won $2500 at the lottery.";
        player.balance += 3000;
        break;
      case 4:
        this.playerPayHousesRepairments(player);
        chanceEventMessage = "House repairments ! Pay $500 per house";
        break;
      case 5:
        this.movePlayerToJail(player);
        chanceEventMessage = "Go to Jail !";
        break;
      default :
        break;
    }
    this.openChanceDialog(player, chanceEventMessage);

  }
  playerPayHousesRepairments(player: Player) {
    var numberPlayerHouses: number = player.getNumberOfHouses();
    player.balance -= (numberPlayerHouses * 500);
  }
  movePlayerToNextAirport(player: Player) {
    switch(player.position){
      case 12:
        player.position = 18;
        this.boardComponent.renderMovePawn(player);
        break;
      case 20:
        player.position = 25;
        this.boardComponent.renderMovePawn(player);
        break;
    }
    
    
  }

  mortgageProperty(property: Property){
    property.isMortgaged = true;
    property.isMortgageable = false;
    property.player.balance += property.propertyPrice/2;
    if (property.isCity()){
      let city = property as City;
      let citiesOfTheSameTier = this.getCitiesOfTheSameTier(city);
      citiesOfTheSameTier.forEach((city: City) => {
        city.isHouseBuyable = false;
        console.log(city)
      });
    }
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

  openChanceDialog(player: Player, chanceEventMessage: string): void {
    const dialogRef = this.dialog.open(ChanceDialogComponent, {
      width: '150px',
      height: '210px',
      data: {player: player, chanceCardText : chanceEventMessage}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  seeProperties(player: Player){
    const dialogRef = this.dialog.open(PropertiesDialogComponent, {
      width: '600px',
      height: '200px',
      data: {humanPlayer: this.player, CPUPlayer: player, boardComponent: this.boardComponent}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  playerGetFree(player) {
    player.nbTurnsInJail = 0;
    player.balance -= 1000;
    this.canHumanEndTurn = true;
  }

}
