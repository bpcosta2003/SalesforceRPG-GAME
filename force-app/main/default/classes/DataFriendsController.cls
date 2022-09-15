public with sharing class DataFriendsController { //* get the data from ORG about the Friends
    @AuraEnabled(cacheable=true)
    public static List<Friend__c> getFriendsList(){
        
        return [SELECT Id,Name,Friend_Class__c,Friend_Description__c,Friend_Image__c,Give_AttackPoints__c,Give_HealthPoints__c,Give_SuperPowerPoints__c	FROM Friend__c WITH SECURITY_ENFORCED];
        
    }

}
