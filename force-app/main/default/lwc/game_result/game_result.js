import { api, LightningElement } from 'lwc';

export default class Game_result extends LightningElement { //* Component that retrieves a pop up to the user when he Win or Lose

    //@ conditions to pass as atributes in HTML to the parent Component
    @api hasLost; //* if player lost
    @api hasWon; //* if player won

    //@ modal conditions
    isOpen = true; //* back modal

    //@ handle 
    handleLeaveHome(){ //* event dispatched to parent to back to Start Game screen 
        const leaveHome = new CustomEvent('backtostartgame');
        this.dispatchEvent(leaveHome);
        this.isOpen = false
    }   

    handReplay(){ //* event dispatched to parent to replay the game
        const replay = new CustomEvent('replaygame');
        this.dispatchEvent(replay);
        this.isOpen = false
    } 



}