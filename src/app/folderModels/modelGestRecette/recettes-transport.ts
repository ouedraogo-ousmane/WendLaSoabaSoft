 interface RecettesTransport {
  id_produit          :number,
  id_mission          :number,
  id_client           :number,
  quantite            :number,
  date_recette        :Date
}
export class RecetteTransport implements RecettesTransport{
  quantite!: number;
  id_produit!: number;
  id_mission!: number;
  id_client!: number;
  date_recette!:Date;
 
}
