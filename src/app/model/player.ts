import { Property } from "./square";

export class Player {
    id: number;
    name: string;
    balance: number;
    isInJail: boolean;
    properties: Array<Property>;
    position: number;
    colour: string;
    constructor(name) {
        this.name = name;
        this.balance = 50000;
        this.position = 0;
        this.properties = new Array<Property>();
    }
}