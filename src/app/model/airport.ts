import { Property } from "./square";

export class Airport extends Property{

    constructor(id, name, propertyPrice, rentPrices){
        super(id, name, propertyPrice, rentPrices);
        this.name = name;
        this.propertyPrice = propertyPrice;
        this.desc = "A";
    }
}