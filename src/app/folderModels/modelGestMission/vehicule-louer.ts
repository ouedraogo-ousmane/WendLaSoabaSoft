 interface VehiculeLouer {
  id_vehicule          :number ,
  debut_location       :Date,
  fin_location         :Date,
  cout_location        :number,
  locataire            :string,

}

export class VehiculesLouer implements VehiculeLouer{
  id_vehicule!: number;
  debut_location!: Date;
  fin_location!: Date;
  cout_location!: number;
  locataire!: string;
}
