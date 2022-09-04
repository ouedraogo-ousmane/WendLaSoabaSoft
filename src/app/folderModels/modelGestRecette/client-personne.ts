 interface ClientPersonne {
  id_client          :number,
  prenom             :string

}
export class ClientsPersonne implements ClientPersonne{
  id_client!: number;
  prenom!: string;

}
