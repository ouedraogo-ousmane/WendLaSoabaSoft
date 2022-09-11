interface Maintenance {
  id                        :number,
  exerciceConcerne          :Number,
  vehiculeConcerne          :Number,
  motif                     :String,
  montant                   :Number,
  date_maintenance          :Date,
  reference                  :FormData
}

export class Maintenances implements Maintenance{
  id!: number;
  exerciceConcerne!: number;
  vehiculeConcerne!: number;
  motif!: string;
  montant!: number;
  date_maintenance! :Date;
  reference! : FormData;
  chauffeur : Chauffeur;


}

export interface Chauffeur{
  nom : string,
  prenom : string
}
