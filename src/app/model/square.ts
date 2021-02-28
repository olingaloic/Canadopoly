import { Player } from "./player";

export abstract class Square {
    id: number;
    name: string;
    desc: string;
    constructor(id, name){
        this.id = id;
        this.name = name;
    }
}

export abstract class Property extends Square{
    propertyPrice: number;
    mortgagePrice: number;
    player: Player;

    constructor(id, name, propertyPrice){
        super(id, name);
        this.propertyPrice = propertyPrice;
        this.mortgagePrice = propertyPrice/2;

    }
}