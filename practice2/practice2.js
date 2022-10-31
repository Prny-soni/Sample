import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import First_NAME_FIELD from '@salesforce/schema/Contact.Name';
import ACCOUNTS from '@salesforce/schema/Contact.AccountId';


export default class RecordFormCreateExample extends LightningElement {
    // objectApiName is "Account" when this component is placed on an account record page
    @api objectApiName;
    @api recordId;
    name = First_NAME_FIELD;
    accountid = ACCOUNTS;

   

    handleSuccess(event) {
        const evt = new ShowToastEvent({
            title: 'Account created',
            message: 'Record ID: ' + event.detail.id,
            variant: 'success',
        });
        this.dispatchEvent(evt);
    }
}