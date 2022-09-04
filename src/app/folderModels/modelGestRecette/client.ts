 interface IClient {
  id_client      :number,
  nom_client     :string,
  tel_client     :string ,
  adresse_client :string,
  date_creation  : Date

}
export class IClients implements IClient{
  id_client!: number;
  nom_client!: string;
  tel_client!: string;
  adresse_client!: string;
  date_creation!: Date;
}
