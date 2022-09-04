 interface Vehicule {
  id_vehicule          :number,
  id_categorie         :number,
  immat_car            :string,
  poids_car            :number,
  marque               :string,
  disponibilite_car    :boolean,
  couleur              :string,
  fonction            :string,

}
export class Vehicules implements Vehicule{
  id_vehicule!: number;
  id_categorie!: number;
  immat_car!: string;
  poids_car!: number;
  marque!: string;
  disponibilite_car!: boolean;
  couleur!: string;
  fonction!: string;

}
