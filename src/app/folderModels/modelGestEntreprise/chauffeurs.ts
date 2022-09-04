 interface Chauffeur{
  id_emp       :number,
  id_vehicule  :number,
  salaire      :number,

}

export class Chauffeurs implements Chauffeur{
  id_emp!: number;
  id_vehicule!: number;
  salaire!: number;
}
