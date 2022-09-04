 interface AbscencesChauffeur {
  id_abs     :number,
  id_emp     :number,
  debut_abs  :Date,
  fin_abs    :Date,
  motif_abs  :string
}

export class AbscenceChauffeur implements AbscencesChauffeur{
  id_abs!: number ;
  id_emp!: number;
  debut_abs!: Date;
  fin_abs!: Date;
  motif_abs!: string;

}
