import { track, LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Start_game extends LightningElement { //* Component of the Start Game screen

    //@ url variables
    url_string; //* actual url
    url; //* stores the URL interface
    data; //* store the value of the parameter from URL
    urlParams; //* used to set the parameter to the URL

    //@ conditions
    gameScreen; //* controls which screen is appearing to the user. False = display the start screen | True = display the game screen
    
   
    //@ onLoad component
    connectedCallback() { //* when component loads, after 3 seconds is called the function to put the enemy in the screen randomly

        this.urlParams = new URLSearchParams(window.location.search); //* URLSearchParams interface defines utility methods to work with the query string of a URL
        this.urlParams.set('replayGame', 'false'); //* always start with replay = false
    

        this.url_string = window.location.href;
        this.url = new URL(this.url_string); //* The URL interface represents an object providing static methods used for creating object URLs.
        this.data = this.url.searchParams.get("replayGame"); //* get the value from URL
        console.log(this.data)

        if(this.data == 'true'){ //* if replay is True, go to the gameScreen
            this.gameScreen = true
        }else{ //* Or stay on startGame screen
            this.gameScreen = false
        }


    }


    
    //@ modal conditions
    @track isShowModal = false; //* controls if the rules modal is open or not
    @track isShowModalCreateCharacter = false; //* controls if the create character modal is open or not

    //@ modal methods
    showModalBox() { //* show the rule modal
        this.isShowModal = true;
    }

    hideModalBox() { //* hide the rule modal
        this.isShowModal = false;
    }  

    showModalCreateCharacter() { //* show the create character modal
        this.isShowModalCreateCharacter = true;
    }

    hideModalCreateCharacter() { //* hide the create character modal
        this.isShowModalCreateCharacter = false;
    }  

    //@ methods
    onStart(){ //* when the user clicks the start button, the gameScreen turns true, so we can display the game screen
        this.gameScreen=true;
    }

    //@ handle event coming from child
    handleLeaveToStartGameEvent(event){ //* the user inside the child component clicked to leave the game, so, go to Start Game screen
        console.log('leave game')
        this.urlParams = new URLSearchParams(window.location.search);
        this.urlParams.set('replayGame', 'false');
        window.location.search = this.urlParams;

        console.log(window.location.search)
    }

    //@ create character successfully + ToastEvent
    handleSuccess(event) { //* when character is created successfully
        this.showToast()
    }

    showToast() { //* pop up on screen to show the success creation
        const event = new ShowToastEvent({
            title: 'Success!',
            message:'Character was created successfully',
            variant: 'success'
        });
        this.dispatchEvent(event);
        this.isShowModalCreateCharacter = false;
    }


}