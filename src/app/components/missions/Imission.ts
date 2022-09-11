

export interface IMission {
  exercice_conerne:number,
  vehicule_concerne:number,
  trajet_concerne:number,
  // liste_produits:{ produit: number, quantite: number, cout_unitaire: number, client: number}[],
  // liste_depenses: {depense: number, montant:number}[],
  date_mission:Date,
  motif:string,
  etat_mission:boolean;
}

export interface AcceuilMissionList{
  id:number
  chauffeur:{nom:string, prenom:string}[],
  etat_mission:boolean
}
