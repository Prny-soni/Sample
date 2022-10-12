public with sharing class ObjectData {
    
    @AuraEnabled
    public static List<labelWrapper> getObjects(){
        
        
        List<schema.SObjectType> st = Schema.getGlobalDescribe().Values();
        List<labelWrapper> wrapperList = new List<labelWrapper>();
        
        for(SObjectType sot: st){
            labelWrapper t = new labelWrapper();
            t.label = sot.getDescribe().getLabel();
            t.value = sot.getDescribe().getName();
            wrapperList.add(t);
            
        }
        //wrapperList.sort();
        return wrapperList;
      
    }

    public class labelWrapper{
        @auraEnabled
        public String label;
        @auraEnabled
        public String value;
    }
    
    
    @AuraEnabled
    public static List<labelWrapper> getAllFields(String objectName){
        
        List<labelWrapper> listField = new list<labelWrapper>();
        
		Map<String,Schema.SObjectType> gd = Schema.getGlobalDescribe(); 
		Schema.SObjectType sobjType = gd.get(objectName);
        Schema.DescribeSObjectResult r = sobjType.getDescribe();
        Map<String, Schema.SObjectField> MapofField = r.fields.getMap();
        
        for(String st : MapofField.keyset()){
            
            labelWrapper fw = new labelWrapper();
            fw.label = MapofField.get(st).getDescribe().getlabel();
            fw.value = MapofField.get(st).getDescribe().getName();
            listField.add(fw);
            
        }
       
     return listField;   
    }
    
    
      @AuraEnabled
      public static List<sObject> querySelector(String stringValue){
          System.debug(stringValue);
          return Database.query(stringValue);
          
        
      }
}