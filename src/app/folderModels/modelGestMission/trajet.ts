 interface Trajet {
  id_trajet            :number,
  id_infostrajet       :number,
  id_ville_depart      :number,
  id_ville_arrivee      :number,
  distance             :number,
  type_trajet          :string

}

export class Trajets implements Trajet{
  id_ville_depart!: number;
  id_ville_arrivee!: number;
  id_trajet!: number;
  id_infostrajet!: number;
  distance!: number;
  type_trajet!: string;

}
