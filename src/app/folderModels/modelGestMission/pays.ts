 interface Pays {
  id_pays              :number,
  nom_pays             :string

}
 export class PaysTrajet implements Pays{
   id_pays!: number;
   nom_pays!: string;

 }
