 interface InfosDepensesMission {
  id_depense           :number,
  id_mission           :number,
  montant              :number,
  ref_depense          :string,
  date_depense         :Date,
}

export class InfosDepenseMission implements InfosDepensesMission{
  id_depense!: number;
  id_mission!: number;
  montant!: number;
  ref_depense!: string;
  date_depense!: Date;
}
