import { Player } from "./player";

export abstract class Square {
    id: number;
    name: string;
    constructor(id, name){
        this.id = id;
        this.name = name;
    }
}

export abstract class Property extends Square{
    propertyPrice: number;
    mortgageValue: number;
    isMortgaged: boolean;
    isMortgageable: boolean;
    rentPrices: Array<number>;
    player: Player;
    desc: string;

    constructor(id, name, propertyPrice, rentPrices){
        super(id, name);
        this.propertyPrice = propertyPrice;
        this.rentPrices = rentPrices;
        this.mortgageValue = propertyPrice/2;

    }

    isCity(){
        return this.desc == "C";
    }
}