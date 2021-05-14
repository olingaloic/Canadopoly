import { Property } from "./square";

export class Airport extends Property{

    constructor(id, name, propertyPrice, rentPrices){
        super(id, name, propertyPrice, rentPrices);
        this.name = name;
        this.propertyPrice = propertyPrice;
        this.isMortgageable = true;
        this.desc = "A";
        
    }

    getCurrentRentPrice(){
        if(this.isMortgaged) return 0;
        var nbAirports = this.player.nbAirports;
        return this.rentPrices[nbAirports];
    }
}