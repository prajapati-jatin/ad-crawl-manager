export class ADProperty{
    NormalizedName: string = '';
    Description: string = '';
    constructor(
       public Id: string,
       public Name: string       
    ){
         this.NormalizedName = this.Name.toLowerCase();
    }
}