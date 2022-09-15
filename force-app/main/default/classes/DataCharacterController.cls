public with sharing class DataCharacterController { //* get the data from ORG about the Characters
    @AuraEnabled(cacheable=true)
    public static List<Character__c> getCharactersList(){

        return [SELECT Id,Name,Attack__c,Class__c,Description__c,Health__c,Image__c,Super_Power__c,Order_Number__c FROM Character__c WITH SECURITY_ENFORCED ORDER BY CreatedDate];
                
    }
}
