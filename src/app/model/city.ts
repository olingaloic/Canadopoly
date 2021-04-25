import { Property } from "./square";

export class City extends Property {
    tier: string;
    housePrice: number;
    nbHouses: number;
    isHouseBuyable: boolean;
    currentRentPrice: number;

    constructor(id, name, tier, propertyPrice, housePrice, rentPrices){
        super(id, name, propertyPrice, rentPrices);
        this.tier = tier;
        this.propertyPrice = propertyPrice;
        this.housePrice = housePrice;
        this.currentRentPrice = this.rentPrices[0];
        this.nbHouses = 0;
        this.desc = "C";
    }
    getCurrentRentPrice(){
        return this.currentRentPrice;
    }
}