 interface CategorieVehicule {
  id_categorie       :number,
  libelle_categorie  :string,
  date_creation      :Date
}

export class CategorieVehicules implements CategorieVehicule{
  id_categorie!: number;
  libelle_categorie!: string;
  date_creation!: Date;

}
