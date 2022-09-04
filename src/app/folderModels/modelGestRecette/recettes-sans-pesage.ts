 interface RecettesSansPesage {
  id_produit           :number,
  id_mission           :number,
  id_client            :number,
  quantite             :number,

}
export class RecetteSansPesage implements RecettesSansPesage{
  id_produit!: number;
  id_mission!: number;
  id_client!: number;
  quantite!: number;
}
