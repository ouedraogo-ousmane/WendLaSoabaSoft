 interface Mouvement {
  id_mvt              :number,
  id_materiel         :number,
  qte_mvt             :number,
  date_mvt            :Date,
  prix_unit           :number,
  type_mvt            :string,

}

export class Mouvements implements Mouvement{
  id_mvt!: number;
  id_materiel!: number;
  qte_mvt!: number;
  date_mvt!: Date;
  prix_unit!: number;
  type_mvt!: string;

}
