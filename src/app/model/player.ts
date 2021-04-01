import { City } from "./city";
import { Property } from "./square";

export class Player {
    
    id: number;
    name: string;
    balance: number;
    nbTurnsInJail: number;
    properties: Array<Property>;
    position: number;
    nbAirports: number;
    colour: string;
    isPlayerTurn : boolean;
    constructor(name, colour) {
        this.name = name;
        this.colour = colour;
        this.balance = 50000;
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
}