 interface Missions {
  id_mission           :number,
  id_trajet            :number,
  id_exercice          :number,
  id_motif             :number,
  id_emp               :number,
  date_program         :Date,
  date_mission         :Date,
  etat_mission         :boolean,

}

export class Mission implements Missions{
  id_mission!: number;
  id_trajet!: number;
  id_exercice!: number;
  id_motif!: number;
  id_emp!: number;
  date_program!: Date;
  date_mission!: Date;
  etat_mission!: boolean;

}
