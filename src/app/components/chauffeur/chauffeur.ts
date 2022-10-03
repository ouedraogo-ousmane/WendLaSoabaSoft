interface Chauffeur{
    id           :number,
    vehicule     :number,
    salaire      :number,     
    nom          :string,
    prenom       :string,
    telephone       :string,
    vehiculeInfos   :{id:number,immat:string}
  
  }
  
  export class Chauffeurs implements Chauffeur{
    id!: number;
    vehicule!: number;
    salaire!: number;
    nom : string;
    prenom : string;
    telephone : string;
    vehiculeInfos! : {id:number,immat:string};
  }
  