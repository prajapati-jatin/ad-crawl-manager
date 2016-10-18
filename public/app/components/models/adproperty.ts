export class ADProperty{
    NormalizedName: string = '';
    Description: string = '';
    constructor(
       public Id: string,
       public Name: string,
       public AvailableAsDefault: boolean       
    ){
         this.NormalizedName = this.Name.toLowerCase();
         if(this.AvailableAsDefault === undefined){
             this.AvailableAsDefault = false;
         }         
    }
}