import { LightningElement, wire, track } from 'lwc';
import getEnemiesList from '@salesforce/apex/DataEnemiesController.getEnemiesList'
import getFriendsList from '@salesforce/apex/DataFriendsController.getFriendsList'
import getCharactersList from '@salesforce/apex/DataCharacterController.getCharactersList'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class Game_screen extends LightningElement { //* Component of the Game Screen

    //@ onLoad component
    connectedCallback() { //* when component loads, after 3 seconds is called the function to put the enemy in the screen randomly

        this.isLoading = true

        setTimeout(() => { //* wait to everything loads  
            this.modeCheck()
            this.isLoading = false
        },3000);

        if (this.actualCharacterSuperPowerPoints <= 0){ //* if super power is lower than zero
            this.isSuperPower = false
            this.actualCharacterSuperPowerPoints = 0
            
        }else{
            this.isSuperPower = true
        }

    }

    //@ message variables
    feedbackMessage; //* Feedback message about the battle

    //@ url variables
    urlParams; //* parameter of URL

    //@ enemy variables
    @track enemies; //* stores the enemies list
    totalEnemies; //* stores the total number of enemies
    actualEnemy; //* what is the current enemy displayed in the screen
    actualEnemyNumber; //* what is the current enemy INDEX displayed in the screen
    actualImgEnemy; //* stores the actual enemy imgs 
    actualEnemyName; //* stores the current enemy name
    actualEnemyDescription; //* stores the current enemy description
    actualEnemyDamageHealthPoints; //* stores the current enemy damage health points
    actualEnemyDifficulty; //* stores the current enemy difficulty
    actualEnemyHealth; //* stores the current enemy health
    enemyOrder = 0; //* stores what is the actual enemy in order

    //@ friend variables
    @track friends; //* stores the friends list
    totalFriends; //* stores the total number of friends
    actualFriend; //* what is the current friend displayed in the screen
    actualFriendNumber; //* what is the current friend INDEX displayed in the screen
    actualImgFriend; //* stores the actual friend imgs
    actualFriendName; //* stores the current friend name
    actualFriendClass; //* stores the current friend class
    actualFriendDescription; //* stores the current friend description
    actualFriendGiveAttackPoints; //* stores the current friend give attack points
    actualFriendGiveHealthPoints; //* stores the current friend give health points
    actualFriendGiveSuperPowerPoints; //* stores the current friend give super power points

    //@ character variables
    @track characters; //* stores the characters list
    totalCharacters; //* stores the total number of characters
    actualCharacter; //* what is the current Character displayed in the screen
    actualCharacterNumber; //* what is the current Character INDEX displayed in the screen
    actualCharacterHealthPoints; //* stores the character life
    actualCharacterAttackPoints; //* stores the character attack
    actualCharacterSuperPowerPoints; //* stores the character super power
    actualImgCharacter; //* stores the actual Character imgs
    actualCharacterName; //* stores the current Character name
    actualCharacterClass; //* stores the current Character class
    actualCharacterDescription; //* stores the current Character description

    //@ probability
    probabilitySuccessAttack; //* probability of success attack, if 1 = Astro Attack, if 2 = Enemy Attack
    probabilityAppearFriend; //* probability of friend pop up on screen

    //@ conditionals
    hasLost; //* if player lost
    hasWon; //* if player Won
    hasBack; //* if player clicked to back to main page
    hasReplay; //* if player clicked to replay the game
    isLoading; //* if some value exists or not
    isRandomMode; //* if the game mode is randomly
    isOrderMode; //* if the game mode is order mode
    @track isShowFriend = false; //* controls if the friend is appearing or not
    isAttackByCharacter; //* controls if the attack was successfully made by the character
    isAttackByEnemy; //* controls if the attack was successfully made by the enemy
    isSuperPower; //* controls if super power is available

    //@ data from ORG 
    @wire(getFriendsList) //* receiving the data from the DataFriendsController apex class using @wire
    wiredFriend({error,data}){ //* checking if the data is available

        if(data){
            this.friends = JSON.parse(JSON.stringify(data));
            this.totalFriends = this.friends.length;
            console.log(this.friends)
        }
        if(error){
            console.log(error);
        }
    }

    @wire(getEnemiesList) //* receiving the data from the DataEnemiesController apex class using @wire
    wiredEnemy({error,data}){ //* checking if the data is available   
        if(data){
            this.enemies = JSON.parse(JSON.stringify(data));
            this.totalEnemies = this.enemies.length;
            console.log(this.enemies)
        }
        if(error){
            console.log(error);
        }
    }

    @wire(getCharactersList) //* receiving the data from the DataCharactersController apex class using @wire
    wiredCharacter({error,data}){ //* checking if the data is available

        if(data){
            this.characters = JSON.parse(JSON.stringify(data));
            this.totalCharacters = this.characters.length;

        }
        if(error){
            console.log(error);
        }
    }

    //@ modal conditions
    @track isShowModal = true; //* controls if the lets start modal is open or not
    @track isShowModalRules = false; //* controls if the rules modal is open or not
    @track isShowModalCreateEnemy = false; //* controls if the create enemy modal is open or not
    @track isShowModalLeave = false //* controls if the leave game modal is open or not
    @track isShowModalEnemyDescription = false //* controls if the enemy description modal is open or not
    @track isShowModalAstroExplanation = false //* controls if the astro explanation modal is open or not
    @track isShowModalCreateCharacter = false; //* controls if the create character modal is open or not
    @track isShowModalConfig = false;  //* controls if the config modal is open or not
    @track isShowModalSelectCharacter = false; //* controls if the select character modal is open or not

    //@ methods
    onBattle(){ //* battle between Astro and Enemy 
        this.probabilitySuccessAttack = Math.floor(Math.random() * (2 - 1 + 1) + 1) //* 50% chance
        this.probabilityAppearFriend = Math.floor(Math.random() * (5 - 1 + 1) + 1) //* 20% chance
        
        if(this.actualCharacterAttackPoints == 0){ //* lost if attack gets 0
            this.hasLost = true
        }else{
            this.actualCharacterAttackPoints -=1;
        }
        
        console.log(this.enemyOrder);
        console.log(this.actualEnemyNumber);
        console.log(this.totalEnemies);

        if(this.probabilitySuccessAttack == 1){ //* success attack ( attack from character )
            this.actualEnemyHealth -=1;

            this.feedbackMessage = "You attacked " + this.actualEnemyName + "!";

            if(this.actualCharacterAttackPoints == 0){ //* lost if attack gets 0
                this.hasLost = true
            }

            if(this.actualEnemyHealth <= 0){

                this.feedbackMessage = "You won the battle between " + this.actualEnemyName + "!";
                
                if(this.actualCharacterAttackPoints == 0){ //* lost if attack gets 0
                    this.hasLost = true
                }

                this.actualCharacterAttackPoints += parseInt(this.actualEnemyDifficulty);
                this.enemyOrder = parseInt(this.enemyOrder + 1 );

                if(parseInt(this.actualEnemyNumber) == parseInt(this.totalEnemies -1) && this.actualEnemyHealth == 0 && this.isOrderMode == true){
                    this.hasWon = true
                }else{
                    this.modeCheck();
                }
                
            }
        }else{ //* fail attack ( attack from enemy )

            this.feedbackMessage = this.actualEnemyName + " attacked you!";
            
            this.actualCharacterHealthPoints = parseInt(this.actualCharacterHealthPoints) - 1;
            this.actualEnemyDamageHealthPoints -=1

            if (this.actualEnemyDamageHealthPoints < 0){ //* keeps the attack 0, don't let it goes negative
                this.actualEnemyDamageHealthPoints = 0
            }

            if(this.actualCharacterHealthPoints == 0){ //* lost if health gets 0
                this.hasLost = true
            }

            if(this.actualCharacterAttackPoints == 0){ //* lost if attack gets 0
                this.hasLost = true
            }
            
        }

        if(this.probabilityAppearFriend == 2){ //* friend modal appear if probability = 2
            this.isShowFriend = true
        }

    }

    useSuperPower(){ //* attack enemy with super power


        this.actualEnemyHealth = parseInt(this.actualEnemyHealth) - ( parseInt(this.actualCharacterSuperPowerPoints) + 2 * parseInt(this.actualEnemyDifficulty));

        if((parseInt(this.actualCharacterSuperPowerPoints) + 2 * parseInt(this.actualEnemyDifficulty)) > parseInt(this.actualEnemyHealth)){
            this.feedbackMessage = "You used a Super Power and killed " + this.actualEnemyName + "!";
        }else{
            this.feedbackMessage = "You used a Super Power and took " + parseInt(this.actualCharacterSuperPowerPoints) + 2 * parseInt(this.actualEnemyDifficulty) + " life from " + this.actualEnemyName + "!";
        }
        

        if (this.actualCharacterSuperPowerPoints <= 0){ //* if super power is lower than zero
            this.actualCharacterSuperPowerPoints = 0 //* keeps the super power 0, don't let it goes negative
            this.isSuperPower = false
        }else{
            this.isSuperPower = true
            this.actualCharacterSuperPowerPoints = parseInt(this.actualCharacterSuperPowerPoints) - 1;
            if(this.actualCharacterSuperPowerPoints <= 0){
                this.isSuperPower = false
            }
        }

        if(this.actualEnemyHealth <= 0){ //* if super power killed the enemy
            this.enemyOrder = parseInt(this.enemyOrder + 1 );

            if(parseInt(this.actualEnemyNumber) == parseInt(this.totalEnemies -1) && this.actualEnemyHealth <= 0 && this.isOrderMode == true){
                this.actualEnemyHealth = 0;
                this.hasWon = true
            }else{
                this.modeCheck();
            }
            
        }

        
    }

    modeCheck(){ //* choice of the game mode, Random or Order mode
        if(this.isRandomMode == true){

            this.changeEnemyRandomly();
            this.changeFriend();
            
        }else if(this.isOrderMode == true){

            this.changeEnemyByOrder();
            this.changeFriend();
            
        }
    }
    
    changeEnemyRandomly(){ //* changes the enemy on the screen randomly

        this.actualEnemy = this.enemies[parseInt(Math.random() * this.totalEnemies)];
        this.actualEnemyNumber = parseInt(Math.random() * this.totalEnemies);

        this.actualImgEnemy = this.actualEnemy.Enemy_Image__c.substring(this.actualEnemy.Enemy_Image__c.indexOf(">") + 1, this.actualEnemy.Enemy_Image__c.lastIndexOf("<"));
        this.actualEnemyName = this.actualEnemy.Name;
        this.actualEnemyDescription = this.actualEnemy.Enemy_Description__c;
        this.actualEnemyDamageHealthPoints = this.actualEnemy.Damage_HealthPoints__c;
        this.actualEnemyDifficulty = this.actualEnemy.Enemy_Difficulty__c;
        this.actualEnemyHealth = this.actualEnemy.HealthPoints__c;
        
        console.log(this.actualEnemy);
        console.log(this.actualImgEnemy);
        
    }

    changeEnemyByOrder(){ //* changes the enemy on the screen by order

        this.actualEnemy = this.enemies[parseInt(this.enemyOrder)];
        this.actualEnemyNumber = parseInt(this.enemyOrder);

        this.actualImgEnemy = this.actualEnemy.Enemy_Image__c.substring(this.actualEnemy.Enemy_Image__c.indexOf("https://"), this.actualEnemy.Enemy_Image__c.lastIndexOf("<"));
        this.actualEnemyName = this.actualEnemy.Name;
        this.actualEnemyDescription = this.actualEnemy.Enemy_Description__c;
        this.actualEnemyDamageHealthPoints = this.actualEnemy.Damage_HealthPoints__c;
        this.actualEnemyDifficulty = this.actualEnemy.Enemy_Difficulty__c;
        this.actualEnemyHealth = this.actualEnemy.HealthPoints__c;
            
        console.log(this.actualEnemy);
        console.log(this.actualImgEnemy);
        
    }


    changeFriend(){ //* changes the friend on the screen randomly

        this.actualFriend = this.friends[parseInt(Math.random() * this.totalFriends)];
        this.actualFriendNumber = parseInt(Math.random() * this.totalFriends);

        this.actualImgFriend = this.actualFriend.Friend_Image__c.substring(this.actualFriend.Friend_Image__c.indexOf("https://"), this.actualFriend.Friend_Image__c.lastIndexOf("<"));
        this.actualFriendName = this.actualFriend.Name;
        this.actualFriendClass = this.actualFriend.Friend_Class__c;
        this.actualFriendDescription = this.actualFriend.Friend_Description__c;
        this.actualFriendGiveAttackPoints = this.actualFriend.Give_AttackPoints__c;
        this.actualFriendGiveHealthPoints = this.actualFriend.Give_HealthPoints__c;
        this.actualFriendGiveSuperPowerPoints = this.actualFriend.Give_SuperPowerPoints__c;

        console.log(this.actualFriend);
        console.log(this.actualImgFriend);
    }

    handleSelectCharacter(event){ //* select the Id of the character of choice

        this.actualCharacterNumber = event.target.value; //* gets the character order value when clicks the button
        console.log(this.actualCharacterNumber)

        this.isShowModalSelectCharacter = false;
        this.changeCharacter(this.actualCharacterNumber);

        this.modeCheck();
        
    }

    changeCharacter(characterNumber){ //* changes the character on the screen

        this.actualCharacter = this.characters[characterNumber];

        this.actualImgCharacter = this.actualCharacter.Image__c;
        this.actualCharacterName = this.actualCharacter.Name;
        this.actualCharacterClass = this.actualCharacter.Class__c;
        this.actualCharacterDescription = this.actualCharacter.Description__c;
        this.actualCharacterAttackPoints = this.actualCharacter.Attack__c;
        this.actualCharacterHealthPoints = this.actualCharacter.Health__c;
        this.actualCharacterSuperPowerPoints = this.actualCharacter.Super_Power__c;

        if(this.actualCharacterSuperPowerPoints <= 0){
            this.isSuperPower = false
        }

        console.log(this.actualCharacter);
        console.log(this.actualImgCharacter);
    }

    acceptLoot(){ //* accept friend skills

        this.actualCharacterHealthPoints = parseInt(this.actualCharacterHealthPoints) + parseInt(this.actualFriendGiveHealthPoints); 
        this.actualCharacterAttackPoints = parseInt(this.actualCharacterAttackPoints) + parseInt(this.actualFriendGiveAttackPoints);
        this.actualCharacterSuperPowerPoints = parseInt(this.actualCharacterSuperPowerPoints) + parseInt(this.actualFriendGiveSuperPowerPoints);

        if(parseInt(this.actualFriendGiveSuperPowerPoints) > 0){
            this.isSuperPower = true
        }

        this.isShowFriend = false;

    }

    rejectLoot(){ //* reject friend skills
        this.isShowFriend = false;
    }

    startRandomMode(){ //* set game mode
        this.isRandomMode = true;
        this.isOrderMode = false;
        this.isShowModal = false;
        this.isShowModalSelectCharacter = true;
    }

    startOrderMode(){ //* set game mode
        this.isOrderMode = true;
        this.isRandomMode = false;
        this.isShowModal = false;
        this.isShowModalSelectCharacter = true;
    }


    //@ modal methods
    showModalBox() { //* hide the modal
        this.isShowModal = true;
    }  

    hideModalBox() { //* hide the modal
        this.isShowModal = false;
    }  

    showModalBoxRules() { //* show the rules modal
        this.isShowModalRules = true;
    }
    
    hideModalBoxRules() { //* hide the rules modal
        this.isShowModalRules = false;
    }  

    showModalCreateEnemy() { //* show the create enemy modal
        this.isShowModalCreateEnemy = true;
        this.isShowModalConfig = false;
    }
    
    hideModalCreateEnemy() { //* hide the create enemy modal
        this.isShowModalCreateEnemy = false;
    }  

    showModalLeave() { //* show the leave game modal
        this.isShowModalLeave = true;
    }
    
    hideModalLeave() { //* hide the leave game modal
        this.isShowModalLeave = false;
    }  

    showModalEnemyDescription() { //* show the enemy description modal
        this.isShowModalEnemyDescription = true;
    }
    
    hideModalEnemyDescription(){ //* hide the enemy description modal
        this.isShowModalEnemyDescription = false;
    } 

    showModalAstroExplanation() { //* show the astro description modal
        this.isShowModalAstroExplanation = true;
    }
    
    hideModalAstroExplanation(){ //* hide the astro description modal
        this.isShowModalAstroExplanation = false;
    } 

    showModalCreateCharacter() { //* show the create character modal
        this.isShowModalCreateCharacter = true;
        this.isShowModalConfig = false;
    }

    hideModalCreateCharacter() { //* hide the create character modal
        this.isShowModalCreateCharacter = false;
    }  

    showModalConfig(){ //* show the config modal
        this.isShowModalConfig = true;
    }

    showModalConfig(){ //* show the config modal
        this.isShowModalConfig = true;
    }

    hideModalConfig(){ //* hide the config modal
        this.isShowModalConfig = false;
    }

    //@ handle 
    handleLeave(){ //* event dispatched to parent to change to Start Game screen 
        const leave = new CustomEvent('leavetostartgame');
        this.dispatchEvent(leave);
    }

    handleBackToStartGameEvent(event){ //* the user inside the child component clicked to back to the Start Game screen
        this.hasBack = true;
        console.log('back game')
        this.urlParams = new URLSearchParams(window.location.search);
        this.urlParams.set('replayGame', 'false');
        window.location.search = this.urlParams;

        console.log(window.location.search)
        
    }

    handleReplayEvent(event){ //* the user inside the child component clicked to replay the game
        console.log("replay game")
        this.urlParams = new URLSearchParams(window.location.search);
        this.urlParams.set('replayGame', 'true');
        window.location.search = this.urlParams;

        console.log(window.location.search)
    }

    //@ create enemy successfully + ToastEvent
    handleSuccess(event) { //* when enemy is created successfully
        this.showToast()
    }

    showToast() { //* pop up on screen to show the success creation
        const event = new ShowToastEvent({
            title: 'Success!',
            message:'Enemy was created successfully',
            variant: 'success'
        });
        this.dispatchEvent(event);
        this.isShowModalCreateEnemy = false;
    }

    //@ create character successfully + ToastEvent
    handleSuccessCharacter(event) { //* when character is created successfully
        this.showToastCharacter()
    }

    showToastCharacter() { //* pop up on screen to show the success creation
        const event = new ShowToastEvent({
            title: 'Success!',
            message:'Character was created successfully',
            variant: 'success'
        });
        this.dispatchEvent(event);
        this.isShowModalCreateCharacter = false;
    }


}

