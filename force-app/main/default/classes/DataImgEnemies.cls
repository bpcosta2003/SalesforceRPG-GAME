public with sharing class DataImgEnemies {

    @AuraEnabled(cacheable=true)
    public static List<String> getImgEnemiesList() {

        String[] imgsEnemies = new List<String>();

        List<Enemy__c> enemy = [SELECT Id,Name,Damage_HealthPoints__c,Enemy_Description__c,Enemy_Difficulty__c,Enemy_Image__c,HealthPoints__c FROM Enemy__c WITH SECURITY_ENFORCED];

        for(Enemy__c e: enemy){
            imgsEnemies.add(e.Enemy_Image__c.substringBetween('<p>','</p>'));
        }
        
        return imgsEnemies;


    }
}
