 interface CoutTrajet {
  id_infostrajet       :number,
  cout_unitaire        :number,
  date_en_vigueur      :Date,

}

export class CoutTrajets implements CoutTrajet{
  id_infostrajet!: number;
  cout_unitaire!: number;
  date_en_vigueur!: Date;

}
