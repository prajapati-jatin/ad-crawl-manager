import { Injectable } from '@angular/core';

declare function showNotification(error, type);

@Injectable()
export class Logger{
    logs: any[] = [];    //captures logs for testing
    
    log(message: any){
        this.logs.push(message);
        console.log(message);
    }
    
    logError(error: any){
        this.logs.push(error);
        console.error(error);
    }

    showNotification(error: string, type: string){
        if(type === '' || type === undefined){
            type = 'error';
        }
        showNotification(error, type);
    }
}