import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ADPropertiesService } from '../../services/adproperties.service';
import { Logger } from '../../services/logger.service';

declare var dialogPolyfill: any;

@Component({
    templateUrl: '/views/admin/ad-properties.html'
})
export class AdminADPropertiesComponent implements OnInit{
    constructor(private adpropertiesService: ADPropertiesService, private logger: Logger){

    }    

    properties = [];

    

    deleteADProperty(property){
        let component = this;
        let logger = this.logger;
        console.log('Delete property having id ' + property.Id);
        let propertyToDelete = property.Id;
        var dialog = document.querySelector('dialog');
        if(!dialog.showModal){
            dialogPolyfill.registerDialog(dialog);
        }
        $('dialog .mdl-dialog__title').html('Delete AD property?');
        $('dialog .mdl-dialog__content p').html('Are you sure you want to delete ' + property.Name + '?');
        dialog.showModal();

        $('dialog .close').click(function(){
            dialog.close();
        });

        $('dialog .confirm').click(function(){
            $('dialog .close, dialog .confirm').hide();
            $('dialog .mdl-spinner').removeClass('hidden').addClass('is-active');
            component.adpropertiesService.deleteadproperty(propertyToDelete).subscribe(resp => {
                console.log(resp);
                if(resp.success){
                    component.loadADProperties();
                    $('dialog .mdl-spinner').removeClass('is-active').addClass('hidden');
                    $('dialog .close, dialog .confirm').show();
                    dialog.close();                    
                    logger.showNotification('Property "' + property.Name + ' has been deleted.', 'success');
                }
                $('dialog .close, dialog .confirm').unbind('click');
                $('dialog .confirm').unbind('click');
            });            
        });
    }

    ngOnInit(){
        this.loadADProperties();
    }

    private loadADProperties(){
        this.adpropertiesService.listproperties().subscribe(res => {            
            if(res.success){
                this.properties = res.data[0];
            }
        });
    }
}