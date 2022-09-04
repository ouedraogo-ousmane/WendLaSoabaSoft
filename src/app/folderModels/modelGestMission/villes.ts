 interface Villes {
  id_pays              :number,
  id_ville             :number,
  nom_ville            :string,
  date_creation        :Date
}

export class Ville implements Villes{
  id_pays!: number;
  id_ville!: number;
  nom_ville!: string;
  date_creation!: Date;

}
