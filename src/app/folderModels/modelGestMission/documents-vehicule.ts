 interface DocumentsVehicule {
  id_docVeh       :number,
  id_vehicule     :number,
  date_exp        :Date,
  libelle         :string,
  date_creation   :string
}

export class DocumentVehicule implements DocumentsVehicule{
  id_docVeh!: number;
  id_vehicule!: number;
  date_exp!: Date;
  libelle!: string;
  date_creation!: string;

}
