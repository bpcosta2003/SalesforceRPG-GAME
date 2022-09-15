public with sharing class DataEnemiesController { //* get the data from ORG about the Enemies
    @AuraEnabled(cacheable=true)
    public static List<Enemy__c> getEnemiesList(){

        return [SELECT Id,Name,Damage_HealthPoints__c,Enemy_Description__c,Enemy_Difficulty__c,Enemy_Image__c,HealthPoints__c FROM Enemy__c WITH SECURITY_ENFORCED];
                
    }
}
