import { Property } from "./square";

export class City extends Property {
    tier: number;
    housePrice: number;
    nbHouses: number;
    rentPrice: number;
    isMortgaged: boolean;

    constructor(id, name, tier, propertyPrice, housePrice, rentPrice){
        super(id, name, propertyPrice);
        this.tier = tier;
        this.propertyPrice = propertyPrice;
        this.housePrice = housePrice;
        this.rentPrice = rentPrice;
        this.desc = "P";
    }
}