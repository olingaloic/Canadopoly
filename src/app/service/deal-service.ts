import { BoardComponent } from "../components/board/board.component";
import { Player } from "../model/player";
import { Property } from "../model/square";

export class DealService {
    private boardComponent: BoardComponent;

    constructor(boardComponent: BoardComponent){
        this.boardComponent = boardComponent;
    }

    doTransfer(humanPlayer: Player, CPUPlayer: Player){
            humanPlayer.negotiationProperties.forEach((property: Property) => {
                humanPlayer.removePlayerProperty(property);
                CPUPlayer.properties.push(property);
                property.player = CPUPlayer;
                this.boardComponent.renderBuyProperty(CPUPlayer, property.id);
              });
              CPUPlayer.negotiationProperties.forEach((property: Property) => {
                CPUPlayer.removePlayerProperty(property);
                humanPlayer.properties.push(property);
                property.player = humanPlayer;
                this.boardComponent.renderBuyProperty(humanPlayer, property.id);
              });
              humanPlayer.balance -= humanPlayer.cashOffer - CPUPlayer.cashOffer;
              CPUPlayer.balance -= CPUPlayer.cashOffer - humanPlayer.cashOffer;

            humanPlayer.negotiationProperties = null;
            CPUPlayer.negotiationProperties = null;
            humanPlayer.cashOffer = 0;
            CPUPlayer.cashOffer = 0;        
    }
}