 interface ClientEntreprise {
  id_client         :number,
  ifu_client        :string,
  rccm_client       :string,

}

export class ClientsEntreprise implements ClientEntreprise{
  id_client!: number;
  ifu_client!: string;
  rccm_client!: string;

}
