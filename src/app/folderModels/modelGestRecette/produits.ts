 interface Produits {
  id_produit           :number,
  id_infosproduit      : number,
  designation          :string,
  unite                :string,
  date_creation        :Date
}

export class Produit implements Produits{
  id_produit!: number;
  id_infosproduit!: number;
  designation!: string;
  unite!: string;
  date_creation!: Date;

}
