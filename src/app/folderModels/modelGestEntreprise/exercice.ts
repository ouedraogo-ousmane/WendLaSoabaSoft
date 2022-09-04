 interface Exercice {
  ID_EXERCICE          :number,
  IDEMP               :number,
  ANNEE               :string
  date_debut           :string,
  date_fin             :string,
  ETAT                 :boolean

}

export class Exercices implements Exercice{
  IDEMP!: number;
  ID_EXERCICE!: number;
  ANNEE!  :string;
  date_debut!: string;
  date_fin!: string;
  ETAT!: boolean;

}
