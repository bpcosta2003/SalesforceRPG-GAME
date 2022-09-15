public with sharing class DataImgFriends {
    
    @AuraEnabled(cacheable=true)
    public static List<String> getImgFriendsList() {

        String[] imgsFriends = new List<String>();

        List<Friend__c> friend = [SELECT Id,Name,Friend_Class__c,Friend_Description__c,Friend_Image__c,Give_AttackPoints__c,Give_HealthPoints__c,Give_SuperPowerPoints__c FROM Friend__c WITH SECURITY_ENFORCED];
        
        for(Friend__c f: friend){
           imgsFriends.add(f.Friend_Image__c.substringBetween('<p>','</p>'));
        }
        
        return imgsFriends;

    }

}
