import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

export class NotificationMessage{
    public notyType:string;
    public notyMessage:string;
    public notyData:any;

    constructor(type: string, message: string, data: any){
        this.notyType = type;
        this.notyMessage = message;
        this.notyData = data;
    }
}

@Injectable()
export class NotificationService{
    //Observable source of type any
    private notificationMessageSource = new Subject<NotificationMessage>();

    //Observable streams
    notify$ = this.notificationMessageSource.asObservable();

    //Service message commands
    sendNotification(noty: NotificationMessage){
        this.notificationMessageSource.next(noty);
    }
}