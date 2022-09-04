interface Maintenance {
  id_maint             :number,
  id_exercice          :number,
  id_vehicule          :number,
  motif_maint          :string,
  cout_maint           :number,
  dateEntree           :Date,
  formData             : FormData
}

export class Maintenances implements Maintenance{
  id_maint!: number;
  id_exercice!: number;
  id_vehicule!: number;
  motif_maint!: string;
  cout_maint!: number;
  dateEntree!: Date;
  formData!   : FormData;


}
