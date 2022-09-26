

export interface IMission {
  id?:number,
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
  chauffeur:{id:number,nom:string, prenom:string, telephone:string},
  etat_mission:boolean,
  vehicule:{id:number,couleur:string, immat:string,marque:string,poids_vide:number},
  date_mission:Date,
  motif:string,
  depenses:{id?:number,intitule_depense__id?:number,intitule_depense__intitule:string, montant:number}[],
  produits:{client_concerne__nom:string, client_concerne__prenom:string ,
           produit__nom:string, produit__unite:string,qte_produit:number,
           client_concerne__id?:number, produit__id?:number,id?:number}[],
  trajet:{id:number, ville_arrivee:string,ville_depart:string}

}
