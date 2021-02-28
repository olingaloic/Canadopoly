import { Property } from "./square";

export class Airport extends Property{

    constructor(id, name, propertyPrice){
        super(id, name, propertyPrice);
        this.name = name;
        this.propertyPrice = propertyPrice;
        this.desc = "A";
    }
}