 interface Vehicule {
  categorie            :number,
  id                   :number,
  poids_vide           :number,
  marque               :string,
  est_disponible       :boolean,
  couleur              :string,
  fonction             :string

}
export class Vehicules implements Vehicule{
  id!: number;
  categorie!: number;
  immat!: string;
  poids_vide!: number;
  marque!: string;
  est_disponible!: boolean;
  couleur!: string;
  fonction!: string;

}
