import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Airport } from 'src/app/model/airport';
import { Player } from 'src/app/model/player';
import { City } from 'src/app/model/city';
import { Property } from 'src/app/model/square';
import { BoardComponent } from '../board/board.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent implements OnInit {

  @ViewChild(BoardComponent)
  private boardComponent: BoardComponent;

  player: Player;
  property1: City;
  properties: Map<number, Property>;



  ngOnInit(): void {
    this.properties = new Map();
    this.player = new Player("Test Player");
    this.properties.set(1, new City(1, "Charlottetown", "Tier 8", 1500, 500, 100));
    this.properties.set(3, new City(3, "St John's", "Tier 8", 1500, 500, 100));
    this.properties.set(4, new Airport(4, "Trudeau Airport", 5000));
    this.properties.set(5, new City(5, "Halifax", "Tier 7", 2000, 750, 200));
    this.properties.set(6, new City(6, "Fredericton", "Tier 7", 2000, 750, 200));
    this.properties.set(7, new City(7, "Moncton", "Tier 7", 2500, 1000, 200));
    this.properties.set(9, new City(9, "Hamilton", "Tier 6", 3000, 1500, 300));
    this.properties.set(10, new City(10, "London", "Tier 6", 3500, 2000, 300));
    this.properties.set(11, new Airport(11, "Pearson Airport", 5000));
    this.properties.set(13, new City(13, "Quebec", "Tier 5", 4000, 2500, 400));
    this.properties.set(15, new City(15, "Montreal", "Tier 5", 4500, 3000, 400));
    this.properties.set(16, new City(16, "Saskatoon", "Tier 4", 5000, 3500, 500));
    this.properties.set(17, new City(17, "Winnepeg", "Tier 4", 5500, 3500, 500));
    this.properties.set(18, new Airport(18, "Calgary Airport", 5000));
    this.properties.set(19, new City(19, "Calgary", "Tier 3", 6000, 4000, 600));
    this.properties.set(21, new City(21, "Edmonton", "Tier 3", 6500, 5000, 600));
    this.properties.set(23, new City(23, "Ottawa", "Tier 2", 7000, 6000, 700));
    this.properties.set(24, new City(24, "Toronto", "Tier 2", 7500, 6500, 700));
    this.properties.set(25, new Airport(25, "Vancouver Airport", 5000));
    this.properties.set(26, new City(26, "Victoria", "Tier 1", 9000, 7000, 1000));
    this.properties.set(27, new City(27, "Vancouver", "Tier 1", 10000, 7000, 1000));

  }

  buyProperty(player: Player){
    //console.log("Buy!");
    console.log(this.properties.get(this.player.position).player)
    if (this.properties.get(this.player.position).player == undefined){
      let property = this.properties.get(this.player.position);
      this.player.properties.push(property);
      property.player = this.player;
      this.player.balance -= this.properties.get(this.player.position).propertyPrice;
      this.boardComponent.renderBuyProperty(this.player.position);
      if (property.desc == "C"){
        let chosenCity = property as City;
        let citiesOfTheSameTier: Array<City>; 
        this.properties.forEach((property: Property, id: number) => {
          let city = property as City;
          if(city.tier == chosenCity.tier)
            citiesOfTheSameTier.push(chosenCity);
        });
        this.setCitiesBuyable(citiesOfTheSameTier);
      }
      
    } else {
      alert("THIS PROPERTY IS ALREADY TAKEN");
    }
    
  }
  humanPlayerBuyProperty(){
    this.buyProperty(this.player);
  }

  renderBuyPropertyButton(){
    if(this.properties.get(this.player.position) == undefined)
      return false;
    if(this.properties.get(this.player.position).player != undefined)
      return false;
    if(this.properties.get(this.player.position).propertyPrice > this.player.balance)
      return false;
    return true;
    
  }
  setCitiesBuyable(citiesOfTheSameTier: Array<City>){
    let areCitiesBuyable: boolean;
    let player = citiesOfTheSameTier[0].player as Player;
    areCitiesBuyable = true;
    citiesOfTheSameTier.forEach((city: City) => {
      if(player != city.player)
        areCitiesBuyable = false;
    });
    if(areCitiesBuyable){
      citiesOfTheSameTier.forEach((city: City) => {
        city.isHouseBuyable = true;
      });
    }
  }
  canPlayerBuyHouseCity(chosenCity: City, player: Player){
    var isBuyable = true; 
    this.properties.forEach((property: Property, id: number) => {
      //console.log(key, value);
      let city = property as City;
      if(city.tier == chosenCity.tier && city.player != player)
        return false;
    });
    return true;
  }

  buyHouse(city: City, player: Player){
    city.nbHouses++;
    city.rentPrice += city.housePrice;
    this.boardComponent.renderBuyHouse(city);

  }

  generateRandomNumber(){
    var randomNumber;
    randomNumber = Math.floor(Math.random()*6)+1;
    console.log("random number" + randomNumber);
    return randomNumber;
  }

  rollDice(){
    var randomNumber = this.generateRandomNumber();
    
    for (let i = 0; i < 1; i++){
      setTimeout(()=>{
        this.movePawn();
      }, 400);
    } 
    setTimeout(()=>{
      console.log("position " + this.player.position);
      if(this.player.position == 22){
        this.movePawnToJail();
        this.player.isInJail = true;
      }
    }, 400);

     
  }

  movePawnToJail(){
    /*
    this.player.position = 8;
    this.boardComponent.renderMovePawn(this.player.position);
    */
  }

  movePawn(){
    if(this.player.position != 27){
      this.player.position ++;
      this.boardComponent.renderMovePawn(this.player.position);
    }
    else {
      this.player.position = 0;
      this.boardComponent.renderMovePawn(this.player.position);
      this.player.balance += 200;
    }
  }

  mortgageProperty(property: Property){
    property.isMortgaged = true;
    //render mortgage ?
  }

}
