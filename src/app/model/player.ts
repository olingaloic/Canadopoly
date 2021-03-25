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
}