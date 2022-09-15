# Salesforce RPG 

Made with [Salesforce](https://www.salesforce.com/br/)

It's an RPG based game, Astro and their friends fight together to defeat difficulties about Salesforce subjects!
You are a Developer from Salesforce that needs to fight in behalf Salesforce! You will find some difficulties on your way ( subjects that you must know as a developer ), but don't worry, your super powerful friends are coming to help you!

## Project 🖱️

![image](https://user-images.githubusercontent.com/69023428/190438860-5767e50a-2c8b-4074-b3ac-2bb747babd9b.png)
![image](https://user-images.githubusercontent.com/69023428/190438960-550453dc-0963-4648-b03f-95aea4d85cf6.png)
![image](https://user-images.githubusercontent.com/69023428/190439206-f70b92e8-4ad9-4699-9be0-34018161b346.png)

## Technologies used 💻
<div style="display: inline_block"><br>
 <img align="center" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/salesforce/salesforce-original.svg" />
 <img align="center" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" />
 <img align="center" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg">
 <img align="center" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" />
 + LWC, SOQL & APEX
</div>

</br>

## Setup 🔧
- Have installed in your computer : VSCODE, JRE 8+ and [CLI](https://developer.salesforce.com/tools/sfdxcli?_ga=2.168212452.479681734.1662983880-957123945.1650901940) 
- Create an account in [Salesforce Trailblazer](https://trailblazer.me/trailblazerlogin?&locale=en_US#), so you can create your ORG 
- Create a Trailhead Playground [( HANDS-ON ORGS > CREATE PLAYGROUND )](https://trailblazer.me/trailblazerlogin?&locale=en_US#)
- Inside of your Playground, go to Users in Quick Find box, locate your name on the list of users, Click Reset Password(s) and OK, you'll receive an email, save your username and password to use later!
- Still in your Playground, create 3 custom objects ( SETUP > OBJECT MANAGER > CREATE > CUSTOM OBJECT ), look at the image below and copy in your org : 

 ![image](https://user-images.githubusercontent.com/69023428/190435113-69e7b76d-0b1d-4b13-822d-d4423d07f25f.png)

- In VSCODE press CTRL+SHIFT+P and type 'SFDX: Authorize an Org', press Enter twice to accept default configuration, you'll be redirected to a new Salesforce login window, Log in to your playground using your playground username and password that you reset, then click ALLOW
- In VSCODE, install the Salesforce Extension Pack extension
- In the Terminal clone the project with ```git clone https://github.com/bpcosta2003/SalesforceRPG-GAME.git```
- The last step is to deploy your code to your playground, using right button of your mouse Click SFDX: Deploy Source to Org for each component inside the LWC folder ( GAME_RESULT, GAME_SCREEN & START_GAME )


## Functionalities ⚙️
- 2 game modes ( Random and Order mode ) ✔️
- Create your own enemy and character ✔️
- Probability of success attack ✔️
- Probability of appearing friend ✔️
- Learn while you play! ✔️

⚠️ If you want to customize the project, and make it your own RPG, feel free to do it! All the code stuff is in the force-app/main/default/lwc folder!

## Salesforce DX Project: Next Steps

Now that you’ve created a Salesforce DX project, what’s next? Here are some documentation resources to get you started.

## How Do You Plan to Deploy Your Changes?

Do you want to deploy a set of changes, or create a self-contained application? Choose a [development model](https://developer.salesforce.com/tools/vscode/en/user-guide/development-models).

## Configure Your Salesforce DX Project

The `sfdx-project.json` file contains useful configuration information for your project. See [Salesforce DX Project Configuration](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_ws_config.htm) in the _Salesforce DX Developer Guide_ for details about this file.

## Read All About It

- [Salesforce Extensions Documentation](https://developer.salesforce.com/tools/vscode/)
- [Salesforce CLI Setup Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm)
- [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_intro.htm)
- [Salesforce CLI Command Reference](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference.htm)
