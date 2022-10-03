export interface Iprogrammer {
}


export interface Itrajets{
  id:number,
  intitule:string
}

export interface IchauffeursVehicule{id:number, chauff:{nom:string, prenom:string}, immat:string}
export interface Iproduits {id:number, nom:string, unite:string}
export interface Idepenses {id:number, intitule:string }
export interface Iclients{ id:number, nom:string, prenom:string}
//nouveau
export interface InfoPesee{id?:number, id_mission:number, premier_pese:number,deuxieme_pese:number}
