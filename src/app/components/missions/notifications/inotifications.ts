export interface Inotifications {
  count: number,
  next: any,
  previous: any,
  results: IdocsVehicules[]

}

export interface IdocsVehicules{
  id:number,
  intitule:string,
  date_expiration:Date,
  nbreJoursRestant:number,
  nbreMoisRestant:number,
  vehicule:number,
  chauffeur:({id:number,nom:string, prenom:string, telephone:string})
}
