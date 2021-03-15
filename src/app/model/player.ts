import { City } from "./city";
import { Property } from "./square";

export class Player {
    id: number;
    name: string;
    balance: number;
    isInJail: boolean;
    properties: Array<Property>;
    position: number;
    nbAirports: number;
    colour: string;
    constructor(name) {
        this.name = name;
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
}