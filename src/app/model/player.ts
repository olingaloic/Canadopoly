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
    constructor(name, colour) {
        this.name = name;
        this.colour = colour;
        this.balance = 50000;
        if(name == "CPU Player") this.balance = 2000;
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
        if(!property.isMortgaged && property.player != this && property.player != undefined)
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
 

}