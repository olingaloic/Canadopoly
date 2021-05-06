import { City } from "./city";
import { Property } from "./square";

export class Player {
    id: number;
    name: string;
    balance: number;
    nbTurnsInJail: number;
    properties: Array<Property>;
    negotiationProperties: Array<Property>;
    cashOffer: number = 0;
    position: number;
    nbAirports: number;
    colour: string;
    isPlayerTurn : boolean;
    isHuman: boolean;
    constructor(name, colour) {
        this.name = name;
        this.colour = colour;
        this.balance = 500000;
        this.position = 0;
        this.nbAirports = 0;
        this.properties = new Array<Property>();
    }

    getNumberOfHouses(){
        var nbHouses: number = 0;
        this.properties.forEach((property: Property) => {
            if(property.isCity()){
                let city = property as City;
                nbHouses += city.nbHouses;
            }

        });
        return nbHouses;
    }

    canPlayerBuyProperty(property: Property){
        return property.propertyPrice <= this.balance && property.player == undefined;
    }

    mustPayRent(property: Property) {
        if(property != undefined && !property.isMortgaged && property.player != this && property.player != undefined)
            return true;
        return false;
    }

    getPropertiesSorted(){
        return this.properties.sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0)
    }

    getDealableProperties(){
        var dealableProperties: Array<Property> = new Array();
        this.getPropertiesSorted().forEach((property: Property) => {
            if(property.isCity()){
                let city = property as City;
                if(city.nbHouses == 0) dealableProperties.push(city); 
            }
            else {
                dealableProperties.push(property); 
            }
        });
        return dealableProperties;
    }

    getPropertyByName(name: String){
        return this.properties.find(property => property.name == name);
    }
    
    getNbPlayerPropertiesSameColour(property: Property){
        var nbPlayerPropertiesSameColour: number = 1;
        if(property.isCity()){
            this.properties.forEach((playerProperty: Property) => {
                if(playerProperty.isCity()){
                    let city = property as City;
                    let playerCity = playerProperty as City;
                    if(city.tier == playerCity.tier) nbPlayerPropertiesSameColour++;
                }
              });
        } else {
            return this.nbAirports;
        }
        return nbPlayerPropertiesSameColour;
    }

    removePlayerProperty(property: Property){
        var index = this.properties.indexOf(property);
        if (index >= 0) this.properties.splice(index, 1);
    }

    getDealableCities(){
        return this.getDealableProperties().filter(property => property.isCity() );
    }
    getDealableAirports(){
        return this.getDealableProperties().filter(property => !property.isCity());
    }
    getPropertiesEquivalentValue(humanPlayerDealProperties: Array<Property>, propertiesValue: number){
        var playerDealableProperties = this.getDealableProperties();
        var properties = new Array<Property>();
        
            for (let property of playerDealableProperties){
                if(humanPlayerDealProperties[0].isCity()){
                    //property which doesn't belong to the tier or not a airport if cpu wants an airport
                    if(property.isCity()){
                        let city = property as City;
                        let chosenCity = humanPlayerDealProperties[0] as City;
                        if(city.tier != chosenCity.tier) properties.push(city);
                    } else {
                        properties.push(property);
                        propertiesValue -= property.propertyPrice;
                    }
                } else {
                    if(property.isCity()){
                        properties.push(property);
                        propertiesValue -= property.propertyPrice;
                    }
                }
                
                if(propertiesValue < 0) break;
            }
            return properties;
    }

    getFirstPropertyMortgageable() {
        for(let property of this.properties){
            if(property.isMortgageable){
                return property;
            }
        }
        return undefined;
    }
    getFirstPropertyHouseRemovable() {
        for(let property of this.properties){
            if(property.isCity){
                let city = property as City;
                if(city.nbHouses > 0) return property;
            }
        }
        return undefined;
    }
    
    cantPlayerBuyHouse(chosenCity: City){
        let maxNbHouses = 5;
        return chosenCity.player != this || chosenCity.housePrice > this.balance || chosenCity.nbHouses == maxNbHouses;
    }

    hasCity(city: City) {
        return this == city.player;
    }
    buyHouse(city: City){
        this.balance -= city.housePrice;
        city.currentRentPrice = city.rentPrices[++city.nbHouses];
    }
    removeMortgage(property: Property){
        this.balance -= property.propertyPrice/2;
        property.isMortgaged = false;
        property.isMortgageable = true;
    }

    removeHouse(city: City){
        city.currentRentPrice = city.rentPrices[--city.nbHouses];
        this.balance += city.housePrice/2;
    }
    isOnGoToJailSquare(){
        let goToJailSquareNumber = 22;
        return this.position == goToJailSquareNumber;
    }
    isOnChanceSquare(){
        let firstChanceSquareNumber = 12;
        let secondChanceSquareNumber = 20;
        return this.position == firstChanceSquareNumber || this.position == secondChanceSquareNumber;
    }
    isOnLocalTaxSquare(){
        let localTaxSquareNumber = 2;
        return this.position == localTaxSquareNumber;
    }

    rentCashTransfer(property: Property){
        let owner: Player = property.player;
        this.balance -= property.getCurrentRentPrice();
        owner.balance += property.getCurrentRentPrice();
    }
    canCPUPlayerGetFree(){
        let getFreeJailFee = 1000;
        return this.nbTurnsInJail > 0 && this.balance >= getFreeJailFee;
    }
}