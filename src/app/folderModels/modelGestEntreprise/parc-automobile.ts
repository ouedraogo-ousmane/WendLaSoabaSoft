 interface ParcAutomobile {
  id_parc              :number,
  logo_parc            :string,
  ifu_parc             :string,
  rccm_parc            :string,
  adresse_parc         :string,

}

export class ParcAutomobiles implements ParcAutomobile{
  id_parc!: number;
  logo_parc!: string;
  ifu_parc!: string;
  rccm_parc!: string;
  adresse_parc!: string;

}
