import { api, LightningElement, track, wire } from 'lwc';
import getObjects from '@salesforce/apex/ObjectData.getObjects';
import getAllFields from '@salesforce/apex/ObjectData.getAllFields';
import querySelector from '@salesforce/apex/ObjectData.querySelector';

export default class ChallengeList extends LightningElement {
    value = 'Nothing';
    selectedValues ='';
    
    @api options;
    @api fieldOptions;
    @api queryString;
    @api queryData;
    @api columns;



    connectedCallback() {

        getObjects({})
        .then(objects => {
            this.options = objects;
        })
        .catch(error => {
            console.log('In connected call back error....');
           
        });

    }
    handleChange(event) {

        this.value = event.detail.value;
        getAllFields({
            objectName :event.detail.value 
        })
        .then(fields => {
            this.fieldOptions = fields;
        })
        .catch(error => {
            console.log('In connected call back error....');
           
        });
    }

    handleSelect(event){
       var st = event.detail.value;
       this.selectedValues = event.detail.value; 
       var query = 'SELECT ' + st + ' From ' + this.value ;
       this.queryString = query;


    }
    handleClick(event){

        querySelector({
            stringValue : this.queryString
        })
        .then(queryValues => {
            this.queryData = queryValues;
            console.log(this.queryData);
            var tab =[];
            for(var i=0;i<this.selectedValues.length;i++ ){
                var s = {
                    "label" : this.selectedValues[i] ,
                    'fieldName': this.selectedValues[i], 
                    'type': 'text' 
                };

                tab.push(s);
            }
            this.columns = tab ;
        })
        .catch(error => {
            console.log('In connected call back error....');
           
        });
    }

   
}