import { Property } from "./square";

export class City extends Property {
    tier: string;
    housePrice: number;
    nbHouses: number;
    rentPrice: number;
    isHouseBuyable: boolean;

    constructor(id, name, tier, propertyPrice, housePrice, rentPrice){
        super(id, name, propertyPrice);
        this.tier = tier;
        this.propertyPrice = propertyPrice;
        this.housePrice = housePrice;
        this.rentPrice = rentPrice;
        this.desc = "C";
    }
}